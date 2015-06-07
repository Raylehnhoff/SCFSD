/// <reference path="../../TypeDefs/Knockout.d.ts"/>
module SCFSD {
    export class Ship {
        shipName: string;
        shipClassName: string;
        shipCount: KnockoutObservable<number>;
        displayText: string;
        shipsOutput: KnockoutComputed<any>;
        constructor(data) {
            var self = this;
            var shipMapping = {
                'copy': ['shipName', 'shipClassName', 'displayText'],
                'shipCount': {
                    'create': function(options) {
                        return ko.observable(options.data);
                    }
                },
                'shipsOutput': {
                    'create': function(options) {
                        var arr = [];
                        for (var i = 0; i < self.shipCount(); i++) {
                            arr.push(this);
                        }
                        return arr;
                    }
                }
            };

            ko.mapping.fromJSON(data, shipMapping, this);

        }
    }
}