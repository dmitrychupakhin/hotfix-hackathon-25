type FieldErrors<T> = {
  [K in keyof T]?: string;
}

export type { FieldErrors }
