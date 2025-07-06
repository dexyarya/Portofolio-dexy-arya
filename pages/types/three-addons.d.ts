declare module 'three/examples/jsm/loaders/FontLoader' {
  import { Loader } from 'three';
  import { Font } from 'three/examples/jsm/loaders/FontLoader';

  export class FontLoader extends Loader {
    load(
      url: string,
      onLoad: (font: Font) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent | Error) => void
    ): void;
  }

  export interface FontData {
    glyphs: any;
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
    original_font_information: any;
    cssFontWeight: string;
    cssFontStyle: string;
  }

  export class Font {
    constructor(data: FontData);
    data: FontData;
  }
}
