/// <reference path="../../TypeDefs/knockout.d.ts"/>
/// <reference path="../../TypeDefs/SCFSD.d.ts"/>
/// <reference path="../../TypeDefs/html2canvas.d.ts"/>
var Canvas2Image = Canvas2Image || {};
var SCFSD;
(function (SCFSD) {
    var PageVM = (function () {
        function PageVM() {
            var self = this;
            this.ShipTimeout = 0;
            this.Ships = ko.observableArray([]);
            this.init();
            this.HasAnyShips = ko.computed(function () {
                return ko.utils.arrayFilter(self.Ships(), function (elem) {
                    return elem.shipCount() > 0;
                }).length > 0;
            });
            this.IsDownloadReady = ko.observable(false);
            ko.postbox.subscribe("RedrawShips", function (newValue) {
                self.RedrawShips();
                self.SaveToLocalStorage(newValue);
            });
            this.OptionalSettings = new SCFSD.OptionalSettings();
            this.ImageString = "";
        }
        PageVM.prototype.SaveToLocalStorage = function (ship) {
            var localStorageKey = ship.className + "ShipNumber";
            localStorage[localStorageKey] = ship.shipCount();
        };
        PageVM.prototype.RedrawShips = function () {
            var self = this;
            if ($(".nav li.active a").attr('href') === '#panelSetup') {
                if (self.ShipTimeout) {
                    clearTimeout(self.ShipTimeout);
                }
                self.IsDownloadReady(false);
                self.ShipTimeout = setTimeout(function () {
                    var elem = $('#ShipOutput')[0];
                    html2canvas(elem, {
                        background: self.OptionalSettings.selectedBackgroundColor().Value,
                        onrendered: function (canvas) {
                            if (!(canvas.height === 0 || canvas.width === 0)) {
                                var strData = $(Canvas2Image.convertToImage(canvas)).attr('src');
                                self.ImageString = strData;
                                self.IsDownloadReady(true);
                            }
                        }
                    });
                }, 400);
            }
        };
        PageVM.prototype.init = function () {
            var self = this;
            this.Ships(SCFSD.Static.loadShips());
            this.checkLocalStorage();
        };
        PageVM.prototype.LaunchThing = function () {
            var self = this;
            if ($(".nav li.active a").attr('href') != '#panelSetup') {
                $("a[href='#panelSetup']").tab('show');
                self.IsDownloadReady(false);
                self.RedrawShips();
            }
            else {
                setTimeout(function () {
                    var w = window.open();
                    $(w.document.body).html("<img src='" + self.ImageString + "' />");
                });
            }
        };
        PageVM.prototype.checkLocalStorage = function () {
            for (var ship in this.Ships()) {
                var shipName = this.Ships()[ship].className + "ShipNumber";
                if (localStorage[shipName]) {
                    this.Ships()[ship].shipCount(localStorage[shipName]);
                }
            }
        };
        return PageVM;
    })();
    SCFSD.PageVM = PageVM;
})(SCFSD || (SCFSD = {}));
