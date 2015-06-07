/// <reference path="../../TypeDefs/Knockout.d.ts"/>
var SCFSD;
(function (SCFSD) {
    var Ship = (function () {
        function Ship(data) {
            var self = this;
            var shipMapping = {
                'copy': ['shipName', 'shipClassName', 'displayText'],
                'shipCount': {
                    'create': function (options) {
                        return ko.observable(options.data);
                    }
                },
                'shipsOutput': {
                    'create': function (options) {
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
        return Ship;
    })();
    SCFSD.Ship = Ship;
})(SCFSD || (SCFSD = {}));
