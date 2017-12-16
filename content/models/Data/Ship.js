/// <reference path="../../TypeDefs/knockout.postbox.d.ts"/>
var SCFSD;
(function (SCFSD) {
    var Ship = /** @class */ (function () {
        function Ship(shipName, isSpaceFaring, className) {
            var _this = this;
            this.shipName = shipName;
            this.width = ko.observable(0);
            this.height = ko.observable(0);
            if (!className) {
                this.className = shipName;
            }
            else {
                this.className = className;
            }
            this.isSpaceFaring = isSpaceFaring;
            this.shipCount = ko.observable().extend({ notify: 'always', rateLimit: 1 });
            this.shipOutput = ko.computed(function () {
                var fragments = new Array();
                for (var i = 0; i < _this.shipCount(); i++) {
                    fragments.push(new ShipFragment(_this.shipName, _this.className));
                }
                return fragments;
            }).extend({ notify: 'always' });
            this.shipCount.subscribe(function (newValue) {
                ko.postbox.publish("SaveShips", _this);
            });
            this.area = ko.computed(function () {
                return _this.height() * _this.width();
            });
        }
        return Ship;
    }());
    SCFSD.Ship = Ship;
    var ShipFragment = /** @class */ (function () {
        function ShipFragment(shipName, className) {
            this.shipName = shipName;
            this.className = className;
        }
        return ShipFragment;
    }());
    SCFSD.ShipFragment = ShipFragment;
})(SCFSD || (SCFSD = {}));
//# sourceMappingURL=Ship.js.map