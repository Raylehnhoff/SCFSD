module SCFSD {
    export class OptionalSettings {
        ShowShipCount: KnockoutObservable<boolean>;
        ShipMarginRight: KnockoutObservable<number>;
        ShipMarginBottom: KnockoutObservable<number>;
        ShipColorOptions: KnockoutObservableArray<string>;
        selectedShipColor: KnockoutObservable<string>;
        selectedBackgroundColor: KnockoutObservable<string>;
        selectedFontColor: KnockoutObservable<string>;
        TransparentBackgroundColor: KnockoutObservable<boolean>;
        ComputedStyles:KnockoutComputed<string>;
        constructor() {
            var self = this;
            this.ShowShipCount = ko.observable<boolean>(false);
            this.ShipMarginRight = ko.observable<number>(0);
            this.ShipMarginBottom = ko.observable<number>(10);
            this.TransparentBackgroundColor = ko.observable<boolean>(false);
            this.selectedBackgroundColor = ko.observable('#EEEEEE');
            this.selectedFontColor = ko.observable('#000000');
            this.selectedShipColor = ko.observable('#000000').extend({notify:'always'});
            this.selectedShipColor.subscribe((newVal) => {
                ko.postbox.publish("ForceRedraw", newVal);
            });
            
            this.ComputedStyles = ko.computed(() => {
                var array = [];
                var shipMarginRight = self.ShipMarginRight();
                if (shipMarginRight % 1 === 0) {
                    array.push(".Ship{margin-right:" + self.ShipMarginRight() + "px !important;}");
                }
                var shipMarginBottom = self.ShipMarginBottom();
                if (shipMarginBottom % 1 === 0) {
                    array.push(".Ship{margin-bottom:" + self.ShipMarginBottom() + "px !important;}");
                } else {
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
    }

    export class Option {
        Text: string;
        Value:string;
        constructor(text: string, value: string) {
            this.Text = text;
            this.Value = value;
        }
    }
}