type FalsyValue = false | 0 | '' | null | undefined;

export const withoutFalsyValues = <T>(
  array: T[],
): Array<Exclude<T, FalsyValue>> =>
    array.filter(Boolean) as Array<Exclude<T, FalsyValue>>;
