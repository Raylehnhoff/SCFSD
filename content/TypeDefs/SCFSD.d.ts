/// <reference path="../models/Data/OptionalSettings.ts"/>
/// <reference path="../models/Data/Ship.ts"/>
declare module SCFSD {
    interface SCFSDStatic {
        loadShips(): Array<SCFSD.Ship>;
    }

    var Static:SCFSDStatic;
}