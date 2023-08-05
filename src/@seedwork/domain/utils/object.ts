
export function deepFreeze<T>(obj: T): Readonly<T> {
  const propsName: string[] = Object.getOwnPropertyNames(obj);

  propsName.forEach((name: string): void => {
    const value: any = obj[name as keyof T];

    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  });

  return Object.freeze(obj);
}
