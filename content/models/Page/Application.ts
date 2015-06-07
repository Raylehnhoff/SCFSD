/// <reference path="../Data/Ship.ts"/>
/// <reference path="../Data/Config.ts"/>
/// <reference path="../../TypeDefs/Knockout.d.ts"/>
/// <reference path="../../TypeDefs/knockout.mapping.d.ts"/>
/// <reference path="../../TypeDefs/jquery.d.ts"/>
module SCFSD {
    export class Application {
        ships: Array<KnockoutObservable<Ship>>;
        config: Config;
        constructor() {
            this.ships = new Array<KnockoutObservable<Ship>>();
            this.config = new Config();
        }

        init() {
            var self = this;
            this.ships = new Array<KnockoutObservable<Ship>>();
            this.ships.push(
                ko.observable(new Ship("M50")),
                ko.observable(new Ship("Mustang")),
                ko.observable(new Ship("Aurora")),
                ko.observable(new Ship("Avenger")),
                ko.observable(new Ship("Gladiator")),
                ko.observable(new Ship("Hornet")),
                ko.observable(new Ship("300 Series", "300 Series", "s300Series")),
                ko.observable(new Ship("Herald")),
                ko.observable(new Ship("Gladius")),
                ko.observable(new Ship("Xi'an Scout", "Xi'an Scout", "XianScout")),
                ko.observable(new Ship("Scythe")),
                ko.observable(new Ship("Cutlass")),
                ko.observable(new Ship("Freelancer")),
                ko.observable(new Ship("Redeemer")),
                ko.observable(new Ship("Constellation")),
                ko.observable(new Ship("Retaliator")),
                ko.observable(new Ship("Caterpillar")),
                ko.observable(new Ship("Merchantman")),
                ko.observable(new Ship("Starfarer")),
                ko.observable(new Ship("Reclaimer")),
                ko.observable(new Ship("Idris")),
                ko.observable(new Ship("Carrack")),
                ko.observable(new Ship("Javelin"))
                );

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
        }

        generateOutput() {
            var self = this;
            // Save this bad boy
            self.saveShips();
            this.getShipsFromLocalStorage();
        }

        private saveShips() {
            var self = this;
            localStorage.setItem('Ships', ko.mapping.toJSON(self.ships));
        }

        private getShipsFromLocalStorage() {
            var self = this;
            self.ships = ko.mapping.fromJSON(localStorage.getItem('Ships'), mapping)();
        }

        clearShips() {
            var self = this;
            var clearedShips = [];
            for (var i = 0; i < self.ships.length; i++) {
                var _ship:any = self.ships[i];
                _ship.shipCount(0);
                clearedShips.push(_ship);
            }
            self.ships = clearedShips;
            self.saveShips();
        }
    }
}