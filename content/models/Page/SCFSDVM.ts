/// <reference path="../../TypeDefs/knockout.d.ts"/>
/// <reference path="../../TypeDefs/SCFSD.d.ts"/>
/// <reference path="../../TypeDefs/html2canvas.d.ts"/>
var Canvas2Image = Canvas2Image || {};
module SCFSD {
    export class PageVM {
        Ships: KnockoutObservableArray<Ship>;
        HasAnyShips: KnockoutComputed<boolean>;
        OptionalSettings: OptionalSettings;
        ShipTimeout: number;
        ImageString: string;
        IsDownloadReady: KnockoutObservable<boolean>;
        constructor() {
            var self = this;
            this.ShipTimeout = 0;
            this.Ships = ko.observableArray([]);
            this.init();
            this.HasAnyShips = ko.computed(() => {
                return ko.utils.arrayFilter(self.Ships(), (elem: Ship) => {
                    return elem.shipCount() > 0;
                }).length > 0;
            });
            this.IsDownloadReady = ko.observable<boolean>(false);
            ko.postbox.subscribe("RedrawShips", function (newValue: Ship) {
                self.RedrawShips();
                self.SaveToLocalStorage(newValue);
            });

            this.OptionalSettings = new OptionalSettings();
            this.ImageString = "";
        }

        SaveToLocalStorage(ship: Ship) {
            var localStorageKey = ship.className + "ShipNumber";
            localStorage[localStorageKey] = ship.shipCount();
        }

        RedrawShips() {
            var self = this;
            if ($(".nav li.active a").attr('href') === '#panelSetup') {
                if (self.ShipTimeout) {
                    clearTimeout(self.ShipTimeout);
                }
                self.IsDownloadReady(false);
                self.ShipTimeout = setTimeout(() => {
                    var elem = $('#ShipOutput')[0];
                    html2canvas(elem, {
                        background: self.OptionalSettings.selectedBackgroundColor().Value,
                        onrendered: (canvas) => {
                            if (!(canvas.height === 0 || canvas.width === 0)) {
                                var strData = $(Canvas2Image.convertToImage(canvas)).attr('src');
                                self.ImageString = strData;
                                self.IsDownloadReady(true);
                            }
                        }
                    });
                }, 400);
            }
        }

        init() {
            var self = this;
            this.Ships(SCFSD.Static.loadShips());
            this.checkLocalStorage();

        }

        LaunchThing() {
            var self = this;
            if ($(".nav li.active a").attr('href') != '#panelSetup') {
                $("a[href='#panelSetup']").tab('show');
                self.IsDownloadReady(false);
                self.RedrawShips();
            } else {
                setTimeout(function() {
                    var w = window.open();
                    $(w.document.body).html("<img src='" + self.ImageString + "' />");
                });
            }
        }

        checkLocalStorage() {
            for (var ship in this.Ships()) {
                var shipName = this.Ships()[ship].className + "ShipNumber";
                if (localStorage[shipName]) {
                    this.Ships()[ship].shipCount(localStorage[shipName]);
                }
            }
        }
    }


}