export const snakeToCamel = (str: string) =>
  str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const snakeToCamelObject = <T>(input: any): T => {
  if (input === null || typeof input !== 'object') {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map((item) => snakeToCamelObject(item)) as any;
  }

  return Object.entries(input).reduce(
    (acc, [key, value]) => {
      const camelKey = snakeToCamel(key);
      (acc as any)[camelKey] = snakeToCamelObject(value);
      return acc;
    },
    {} as Record<string, any>,
  ) as T;
};
