var SCFSD;
(function (SCFSD) {
    var OptionalSettings = (function () {
        function OptionalSettings() {
            var self = this;
            this.ShowShipCount = ko.observable(false);
            this.LogoPosition = ko.observable('None');
            this.LogoWidth = ko.observable(0);
            this.LogoHeight = ko.observable(0);
            this.ShipMarginRight = ko.observable(0);
            this.ShipMarginBottom = ko.observable(0);
            this.ShipColorOptions = ko.observableArray(ShipColorOptions.GetOptions());
            this.BackgroundColorOptions = ko.observableArray(BackgroundColor.GetOptions());
            this.FontColorOptions = ko.observableArray(FontColor.GetOptions());
            this.selectedBackgroundColor = ko.observable(self.BackgroundColorOptions()[0]);
            this.selectedFontColor = ko.observable(self.FontColorOptions()[0]);
            this.selectedShipColor = ko.observable(self.ShipColorOptions()[0]);
            this.ComputedStyles = ko.computed(function () {
                var array = [];
                array.push(".Ship{background-image:url('content/images/ship-" + self.selectedShipColor().Value + ".png');}");
                var shipMarginRight = self.ShipMarginRight();
                if (shipMarginRight % 1 === 0) {
                    array.push(".Ship{margin-right:" + self.ShipMarginRight() + "px;}");
                }
                var shipMarginBottom = self.ShipMarginBottom();
                if (shipMarginBottom % 1 === 0) {
                    array.push(".Ship{margin-bottom:" + self.ShipMarginBottom() + "px;}");
                }
                array.push("#ShipOutput{background-color:" + self.selectedBackgroundColor().Value + ";}");
                array.push("#ShipOutput{color:" + self.selectedFontColor().Value + ";}");
                return array.join('');
            });
        }
        return OptionalSettings;
    })();
    SCFSD.OptionalSettings = OptionalSettings;
    var Option = (function () {
        function Option(text, value) {
            this.Text = text;
            this.Value = value;
        }
        return Option;
    })();
    SCFSD.Option = Option;
    var ShipColorOptions = (function () {
        function ShipColorOptions() {
        }
        ShipColorOptions.GetOptions = function () {
            var array = new Array();
            array.push(new Option("Black", "black"));
            array.push(new Option("Blue", "blue"));
            array.push(new Option("Green", "green"));
            array.push(new Option("Gray", "gray"));
            array.push(new Option("Crimson", "crimson"));
            array.push(new Option("Orange", "orange"));
            array.push(new Option("Purple", "purple"));
            array.push(new Option("Red", "red"));
            array.push(new Option("Yellow", "yellow"));
            array.push(new Option("White", "white"));
            return array;
        };
        return ShipColorOptions;
    })();
    SCFSD.ShipColorOptions = ShipColorOptions;
    var BackgroundColor = (function () {
        function BackgroundColor() {
        }
        BackgroundColor.GetOptions = function () {
            var array = new Array();
            array.push(new Option("Gray", "gray"));
            array.push(new Option("Black", "black"));
            array.push(new Option("Blue", "blue"));
            array.push(new Option("Green", "green"));
            array.push(new Option("Lime Green", "limegreen"));
            array.push(new Option("Orange", "orange"));
            array.push(new Option("Purple", "purple"));
            array.push(new Option("Red", "red"));
            array.push(new Option("Yellow", "yellow"));
            array.push(new Option("White", "white"));
            array.push(new Option("Transparent", "transparent"));
            return array;
        };
        return BackgroundColor;
    })();
    SCFSD.BackgroundColor = BackgroundColor;
    var FontColor = (function () {
        function FontColor() {
        }
        FontColor.GetOptions = function () {
            var array = new Array();
            array.push(new Option("Black", "black"));
            array.push(new Option("Blue", "blue"));
            array.push(new Option("Gray", "gray"));
            array.push(new Option("Green", "green"));
            array.push(new Option("Lime Green", "limegreen"));
            array.push(new Option("Orange", "orange"));
            array.push(new Option("Purple", "purple"));
            array.push(new Option("Red", "red"));
            array.push(new Option("Yellow", "yellow"));
            array.push(new Option("White", "white"));
            array.push(new Option("Transparent", "transparent"));
            return array;
        };
        return FontColor;
    })();
    SCFSD.FontColor = FontColor;
})(SCFSD || (SCFSD = {}));
