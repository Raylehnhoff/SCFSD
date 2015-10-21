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
            ko.postbox.subscribe("SaveShips", function (newValue) {
                if (newValue) {
                    self.SaveToLocalStorage(newValue);
                }
            });
            this.OptionalSettings = new SCFSD.OptionalSettings();
            this.Canvas = ko.observable();
        }
        PageVM.prototype.SaveToLocalStorage = function (ship) {
            var localStorageKey = ship.className + "ShipNumber";
            localStorage[localStorageKey] = ship.shipCount();
        };
        PageVM.prototype.RedrawShips = function (saveAfterRedraw) {
            var self = this;
            if ($(".nav li.active a").attr('href') === '#panelSetup') {
                if (self.ShipTimeout) {
                    clearTimeout(self.ShipTimeout);
                }
                self.IsDownloadReady(false);
                self.ShipTimeout = setTimeout(function () {
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
        };
        PageVM.prototype.SaveImage = function () {
            var self = this;
            if (navigator.msSaveBlob) {
                var BlobBuilder = window.MSBlobBuilder;
                navigator.saveBlob = navigator.msSaveBlob;
                var imgBlob = self.Canvas().msToBlob();
                if (BlobBuilder && navigator.saveBlob) {
                    var showSave = function (data, name, mimetype) {
                        var builder = new BlobBuilder();
                        builder.append(data);
                        var blob = builder.getBlob(mimetype || "application/octet-stream");
                        if (!name)
                            name = "fleet.png";
                        navigator.saveBlob(blob, name);
                    };
                    showSave(imgBlob, 'fleet.png', "image/png");
                }
            }
            else {
                if ($('#export-image-container').length == 0)
                    $('body').append('<a id="export-image-container" download="fleet.png">');
                var img = self.Canvas().toDataURL("image/png");
                $('#export-image-container').attr('href', img);
                $('#export-image-container')[0].click();
                $('#export-image-container').remove();
            }
        };
        PageVM.prototype.SaveImageClick = function () {
            var self = this;
            if ($(".nav li.active a").attr('href') != '#panelSetup') {
                $("a[href='#panelSetup']").tab('show');
            }
            self.RedrawShips(true);
        };
        PageVM.prototype.convertImagesToSVG = function () {
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
                }
                else {
                    $img.replaceWith($(cache).clone());
                }
            });
        };
        PageVM.prototype.init = function () {
            var self = this;
            this.Ships(SCFSD.Static.loadShips());
            this.checkLocalStorage();
        };
        PageVM.prototype.checkLocalStorage = function () {
            for (var ship in this.Ships()) {
                var shipName = this.Ships()[ship].className + "ShipNumber";
                if (localStorage[shipName]) {
                    this.Ships()[ship].shipCount(localStorage[shipName]);
                }
            }
        };
        PageVM.SVGCache = {};
        return PageVM;
    })();
    SCFSD.PageVM = PageVM;
})(SCFSD || (SCFSD = {}));
