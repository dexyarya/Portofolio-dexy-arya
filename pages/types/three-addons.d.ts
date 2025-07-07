// pages/types/three-addons.d.ts

declare module 'three/examples/jsm/loaders/FontLoader' {
  import { Loader, LoadingManager } from 'three';

  export interface Glyph {
    ha: number;
    x_min: number;
    x_max: number;
    o: string;
  }

  export interface FontData {
    glyphs: Record<string, Glyph>;
    familyName: string;
    ascender: number;
    descender: number;
    underlinePosition: number;
    underlineThickness: number;
    boundingBox: {
      yMin: number;
      xMin: number;
      yMax: number;
      xMax: number;
    };
    resolution: number;
    original_font_information: Record<string, unknown>;
    cssFontWeight: string;
    cssFontStyle: string;
  }

  export class Font {
    constructor(data: FontData);
    data: FontData;
  }

  export class FontLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (font: Font) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (event: ErrorEvent | Error) => void
    ): void;
  }
}
