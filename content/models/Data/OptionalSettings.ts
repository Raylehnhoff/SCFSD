module SCFSD {
    export class OptionalSettings {
        ShowShipCount: KnockoutObservable<boolean>;
        LogoPosition: KnockoutObservable<string>;
        LogoWidth: KnockoutObservable<number>;
        LogoHeight: KnockoutObservable<number>;
        ShipMarginRight: KnockoutObservable<number>;
        ShipMarginBottom: KnockoutObservable<number>;
        ShipColorOptions: KnockoutObservableArray<Option>;
        selectedShipColor: KnockoutObservable<Option>;
        BackgroundColorOptions: KnockoutObservableArray<Option>;
        selectedBackgroundColor: KnockoutObservable<Option>;
        FontColorOptions: KnockoutObservableArray<Option>;
        selectedFontColor: KnockoutObservable<Option>;
        ComputedStyles:KnockoutComputed<string>;
        constructor() {
            var self = this;
            this.ShowShipCount = ko.observable<boolean>(false);
            this.LogoPosition = ko.observable<string>('None');
            this.LogoWidth = ko.observable<number>(0);
            this.LogoHeight = ko.observable<number>(0);
            this.ShipMarginRight = ko.observable<number>(0);
            this.ShipMarginBottom = ko.observable<number>(0);
            this.ShipColorOptions = ko.observableArray<Option>(ShipColorOptions.GetOptions());
            this.BackgroundColorOptions = ko.observableArray<Option>(BackgroundColor.GetOptions());
            this.FontColorOptions = ko.observableArray<Option>(FontColor.GetOptions());
            this.selectedBackgroundColor = ko.observable(self.BackgroundColorOptions()[0]);
            this.selectedFontColor = ko.observable(self.FontColorOptions()[0]);
            this.selectedShipColor = ko.observable(self.ShipColorOptions()[0]);
            this.ComputedStyles = ko.computed(() => {
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
    }

    export class Option {
        Text: string;
        Value:string;
        constructor(text: string, value: string) {
            this.Text = text;
            this.Value = value;
        }
    }

    export class ShipColorOptions {
        static GetOptions(): Array<Option> {
            var array = new Array<Option>();
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
        }
    }

    export class BackgroundColor {
        static GetOptions(): Array<Option> {
            var array = new Array<Option>();
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
        }
    }

    export class FontColor {
        static GetOptions(): Array<Option> {
            var array = new Array<Option>();
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
        }
    }
}