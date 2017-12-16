var SCFSD;
(function (SCFSD) {
    var OptionalSettings = /** @class */ (function () {
        function OptionalSettings() {
            var self = this;
            this.ShowShipCount = ko.observable(false);
            this.ShipMarginRight = ko.observable(0);
            this.ShipMarginBottom = ko.observable(10);
            this.TransparentBackgroundColor = ko.observable(false);
            this.selectedBackgroundColor = ko.observable('#EEEEEE');
            this.selectedFontColor = ko.observable('#000000');
            this.selectedShipColor = ko.observable('#000000').extend({ notify: 'always' });
            this.selectedShipColor.subscribe(function (newVal) {
                ko.postbox.publish("ForceRedraw", newVal);
            });
            this.ComputedStyles = ko.computed(function () {
                var array = [];
                var shipMarginRight = self.ShipMarginRight();
                if (shipMarginRight % 1 === 0) {
                    array.push(".Ship{margin-right:" + self.ShipMarginRight() + "px !important;}");
                }
                var shipMarginBottom = self.ShipMarginBottom();
                if (shipMarginBottom % 1 === 0) {
                    array.push(".Ship{margin-bottom:" + self.ShipMarginBottom() + "px !important;}");
                }
                else {
                    array.push(".Ship{margin-bottom:10px;}");
                }
                if (self.TransparentBackgroundColor()) {
                    array.push("#ShipOutput{background-color:transparent !important;}");
                }
                else {
                    array.push("#ShipOutput{background-color:" + self.selectedBackgroundColor() + " !important;}");
                }
                array.push("#ShipOutput{color:" + self.selectedFontColor() + " !important;}");
                ko.postbox.publish("RedrawShips", null);
                return array.join('');
            });
        }
        return OptionalSettings;
    }());
    SCFSD.OptionalSettings = OptionalSettings;
    var Option = /** @class */ (function () {
        function Option(text, value) {
            this.Text = text;
            this.Value = value;
        }
        return Option;
    }());
    SCFSD.Option = Option;
})(SCFSD || (SCFSD = {}));
//# sourceMappingURL=OptionalSettings.js.map