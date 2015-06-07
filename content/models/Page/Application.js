/// <reference path="../Data/Ship.ts"/>
/// <reference path="../Data/Config.ts"/>
/// <reference path="../../TypeDefs/Knockout.d.ts"/>
/// <reference path="../../TypeDefs/knockout.mapping.d.ts"/>
/// <reference path="../../TypeDefs/jquery.d.ts"/>
var SCFSD;
(function (SCFSD) {
    var Application = (function () {
        function Application() {
            this.ships = new Array();
            this.config = new SCFSD.Config();
        }
        Application.prototype.init = function () {
            var self = this;
            this.ships = new Array();
            this.ships.push(ko.observable(new SCFSD.Ship("M50")), ko.observable(new SCFSD.Ship("Mustang")), ko.observable(new SCFSD.Ship("Aurora")), ko.observable(new SCFSD.Ship("Avenger")), ko.observable(new SCFSD.Ship("Gladiator")), ko.observable(new SCFSD.Ship("Hornet")), ko.observable(new SCFSD.Ship("300 Series", "300 Series", "s300Series")), ko.observable(new SCFSD.Ship("Herald")), ko.observable(new SCFSD.Ship("Gladius")), ko.observable(new SCFSD.Ship("Xi'an Scout", "Xi'an Scout", "XianScout")), ko.observable(new SCFSD.Ship("Scythe")), ko.observable(new SCFSD.Ship("Cutlass")), ko.observable(new SCFSD.Ship("Freelancer")), ko.observable(new SCFSD.Ship("Redeemer")), ko.observable(new SCFSD.Ship("Constellation")), ko.observable(new SCFSD.Ship("Retaliator")), ko.observable(new SCFSD.Ship("Caterpillar")), ko.observable(new SCFSD.Ship("Merchantman")), ko.observable(new SCFSD.Ship("Starfarer")), ko.observable(new SCFSD.Ship("Reclaimer")), ko.observable(new SCFSD.Ship("Idris")), ko.observable(new SCFSD.Ship("Carrack")), ko.observable(new SCFSD.Ship("Javelin")));

            // Either they have an older version of tool in localstorage, or they've never stored anything there
            if (localStorage["version"] != self.config.currentVersion) {
                // TODO: handle a migration from the old ships to the new ones
                localStorage.setItem('version', self.config.currentVersion);
            } else {
                if (JSON.parse(localStorage.getItem('Ships')).length > 0) {
                    //Pretty ugly way to read in the Ships array, but whatevs
                    this.getShipsFromLocalStorage();
                }
            }
        };

        Application.prototype.generateOutput = function () {
            var self = this;

            // Save this bad boy
            self.saveShips();
            this.getShipsFromLocalStorage();
        };

        Application.prototype.saveShips = function () {
            var self = this;
            localStorage.setItem('Ships', ko.mapping.toJSON(self.ships));
        };

        Application.prototype.getShipsFromLocalStorage = function () {
            var self = this;
            self.ships = ko.mapping.fromJSON(localStorage.getItem('Ships'), mapping)();
        };

        Application.prototype.clearShips = function () {
            var self = this;
            var clearedShips = [];
            for (var i = 0; i < self.ships.length; i++) {
                var _ship = self.ships[i];
                _ship.shipCount(0);
                clearedShips.push(_ship);
            }
            self.ships = clearedShips;
            self.saveShips();
        };
        return Application;
    })();
    SCFSD.Application = Application;
})(SCFSD || (SCFSD = {}));
