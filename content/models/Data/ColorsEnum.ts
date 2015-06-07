module SCFSD {
    export enum ShipColors{
        Black,
        Blue,
        Green,
        Gray,
        Crimson,
        Orange,
        Purple,
        Red, 
        Yellow,
        White
    }

    export enum PosterColors {
        Gray,
        Black,
        Blue,
        Green,
        LimeGreen,
        Orange,
        Purple,
        Red,
        Yellow,
        White,
        transparent
    }

    export class Colors {
        displayName:string = '';
        underlyingColor:string = '';
        constructor() {
            
        }
    }
}