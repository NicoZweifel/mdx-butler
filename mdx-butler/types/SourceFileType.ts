import { SOURCE_FILE_TYPE } from './SOURCE_FILE_TYPE.js';

export type SourceFileType =
  | { type: SOURCE_FILE_TYPE.LOCAL; name: string }
  | {
      type: SOURCE_FILE_TYPE.REMOTE;
      name: string;
      value: string;
    };
