import Color from "./Color";

export default interface Pokemon {
    id: number;
    name: string;
    artwork: string;
    color: Color;
};
