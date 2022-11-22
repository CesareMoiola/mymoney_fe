import { overlay } from 'color-blend';
import { hexToRgba, rgbaToHex } from 'hex-and-rgba/esm';

const meltColors = (color1, color2) => {
    let c1 = hexToRgba(color1);
    let c2 = hexToRgba(color2);
    let melt = overlay(
        { "r": c1[0], "g": c1[1], "b": c1[2], "a": c1[3], },
        { "r": c2[0], "g": c2[1], "b": c2[2], "a": c2[3], }
    );
    return rgbaToHex(melt.r, melt.g, melt.b, melt.a);
};

export {meltColors};