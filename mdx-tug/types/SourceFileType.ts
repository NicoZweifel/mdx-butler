export enum SOURCE_FILE_TYPE {
  LOCAL,
  REMOTE,
}

export type SourceFileType =
  | { type: SOURCE_FILE_TYPE.LOCAL; name: string }
  | {
      type: SOURCE_FILE_TYPE.REMOTE;
      name: string;
      value: string;
    };
