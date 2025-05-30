export const camelToSnake = (str: string): string => str.replace(/([A-Z])/g, '_$1').toLowerCase();

export const camelToSnakeObject = <T>(input: any): T => {
  if (input === null || typeof input !== 'object') {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map((item) => camelToSnakeObject(item)) as any;
  }

  return Object.entries(input).reduce(
    (acc, [key, value]) => {
      const snakeKey = camelToSnake(key);
      (acc as any)[snakeKey] = camelToSnakeObject(value);
      return acc;
    },
    {} as Record<string, any>,
  ) as T;
};
