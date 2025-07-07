declare module 'three/examples/jsm/loaders/FontLoader' {
  import { Loader } from 'three';

  export interface FontData {
    glyphs: Record<string, unknown>;
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
    load(
      url: string,
      onLoad: (font: Font) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (event: ErrorEvent | Error) => void
    ): void;
  }
}
