/// <reference types="vite-plugin-svgr/client" />

declare const __API__: string

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T

type OptionalRecord<K extends PropertyKey, T> = {
  [P in K]?: T;
}
