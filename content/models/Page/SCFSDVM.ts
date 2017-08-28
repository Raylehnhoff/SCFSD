/// <reference path="../../TypeDefs/knockout.d.ts"/>
/// <reference path="../../TypeDefs/SCFSD.d.ts"/>
/// <reference path="../../TypeDefs/html2canvas.d.ts"/>
/// <reference path="../../thirdparty/linq/linq.d.ts"/>
var Canvas2Image = Canvas2Image || {};
module SCFSD {
    export class PageVM {
        Ships: KnockoutObservableArray<Ship>;
        SpacefaringShips: KnockoutComputed<Array<Ship>>;
        NonSpacefaringShips: KnockoutComputed<Array<Ship>>;
        HasAnyShips: KnockoutComputed<boolean>;
        OptionalSettings: OptionalSettings;
        ShipTimeout: any;
        Canvas: KnockoutObservable<any>;
        IsDownloadReady: KnockoutObservable<boolean>;
        static SVGCache = {};

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
            ko.postbox.subscribe("SaveShips", (newValue?: Ship) => {
                if (newValue) {
                    if (newValue.shipCount() > 2000) {
                        if (confirm("It's very possible that you have entered a value that may cause your browser to freeze. Would you like us to reset this value to 0?")) {
                            newValue.shipCount(0);
                        }
                    }
                    self.SaveToLocalStorage(newValue);
                }
            });

            ko.postbox.subscribe("ForceRedraw", (newVal) => {
                console.log("ForceRedraw Called");
                self.RedrawShips(false);
                $("#ShipOutput path").attr('style', 'fill:' + newVal);
            });

            this.OptionalSettings = new OptionalSettings();
            this.Canvas = ko.observable<any>();
            this.SpacefaringShips = ko.computed(() => {
                return Enumerable.From(self.Ships()).Where((p) => p.isSpaceFaring).OrderBy((p)=>p.area()).ToArray();
            });

            this.NonSpacefaringShips = ko.computed(() => {
                return Enumerable.From(self.Ships()).Where((p) => !p.isSpaceFaring).OrderBy((p)=>p.area()).ToArray();
            });
        }

        Reset() {
            var self = this;
            for (var i = 0; i < self.Ships().length; i++) {
                var ship = self.Ships()[i];
                ship.shipCount(null);
                self.SaveToLocalStorage(ship);
            }
        }

        SaveToLocalStorage(ship: Ship) {
            var localStorageKey = ship.className + "ShipNumber";
            localStorage[localStorageKey] = ship.shipCount();
        }

        RedrawShips(saveAfterRedraw?: boolean) {
            var self = this;
            if ($(".nav li.active a").attr('href') === '#panelSetup') {
                if (self.ShipTimeout) {
                    clearTimeout(self.ShipTimeout);
                }
                self.IsDownloadReady(false);

                self.ShipTimeout = setTimeout(() => {
                    self.IsDownloadReady(false);
                    self.convertImagesToSVG();
                    var elem = $('#ShipOutput')[0];
                    html2canvas(elem, {
                        useCORS: true
                    }).then(function (canvas) {
                        self.Canvas(canvas);
                        self.IsDownloadReady(true);
                        if (saveAfterRedraw) {
                            self.SaveImage();
                        }
                    });
                }, 400);
            }
        }

        SaveImage() {
            var self = this;
            if ($('#export-image-container').length == 0)
                $('body').append('<a id="export-image-container" download="fleet.png">');
            var img = self.Canvas().toDataURL("image/png");

            $('#export-image-container').attr('href', img);
            $('#export-image-container')[0].click();
            $('#export-image-container').remove();
        }

        SaveImageClick() {
            var self = this;
            if ($(".nav li.active a").attr('href') != '#panelSetup') {
                $("a[href='#panelSetup']").tab('show');
            }
            self.RedrawShips(true);
        }

        convertImagesToSVG() {
            $('img.svg').each(function () {
                var $img = $(this);
                var imgClass = $img.attr('class');
                var imgURL = $img.attr('src');
                var cache = SCFSD.PageVM.SVGCache[imgURL];
                if (!cache) {
                    $.get(imgURL, function (data) {
                        // Get the SVG tag, ignore the rest
                        var $svg = $(data).find('svg');

                        // Add replaced image's classes to the new SVG
                        if (typeof imgClass !== 'undefined') {
                            $svg = $svg.attr('class', imgClass + ' replaced-svg');
                        }

                        // Remove any invalid XML tags as per http://validator.w3.org
                        $svg = $svg.removeAttr('xmlns:a');
                        SCFSD.PageVM.SVGCache[imgURL] = $svg;
                        // Replace image with new SVG
                        $img.replaceWith($svg);
                    }, 'xml');
                } else {
                    $img.replaceWith($(cache).clone());
                }
            });
        }

        init() {
            var self = this;
            ko.utils.arrayForEach(SCFSD.Static.loadShips(),
                (ship: Ship) => {
                    $.get(`assets/ships/${ship.className}.svg`,
                        (data) => {
                            var $svg = $($(data).find("svg"));
                            ship.width(Math.floor($svg[0].width.baseVal.value));
                            ship.height(Math.floor($svg[0].height.baseVal.value));
                            self.Ships.push(ship);
                        });
                });
            this.checkLocalStorage();
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