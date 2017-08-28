/// <reference path="../../TypeDefs/knockout.postbox.d.ts"/>
module SCFSD {
    export class Ship {
        shipName: string;
        className: string;
        shipCount: KnockoutObservable<number>;
        shipOutput: KnockoutComputed<ShipFragment[]>;
        isSpaceFaring: boolean;
        width: KnockoutObservable<number>;
        height: KnockoutObservable<number>;
        area: KnockoutComputed<number>;
        constructor(shipName: string, isSpaceFaring?: boolean, className?: string) {
            this.shipName = shipName;
            this.width = ko.observable(0);
            this.height = ko.observable(0);
            if (!className) {
                this.className = shipName;
            } else {
                this.className = className;
            }
            this.isSpaceFaring = isSpaceFaring;
            this.shipCount = ko.observable<number>().extend({ notify: 'always', rateLimit: 1 });
            this.shipOutput = ko.computed(() => {
                var fragments = new Array<ShipFragment>();
                for (var i = 0; i < this.shipCount(); i++) {
                    fragments.push(new ShipFragment(this.shipName, this.className));
                }
                return fragments;
            }).extend({ notify: 'always' });

            this.shipCount.subscribe((newValue) => {
                ko.postbox.publish("SaveShips", this);
            });

            this.area = ko.computed(() => {
                return this.height() * this.width();
            });
        }
    }

    export class ShipFragment {
        shipName: string;
        className: string;
        constructor(shipName: string, className: string) {
            this.shipName = shipName;
            this.className = className;
        }
    }
}