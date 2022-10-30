type MirrorRecord<T extends string> = { [Key in T]: Key };

export const createMirrorMap = <T extends string>(
  keys: readonly T[],
): MirrorRecord<T> =>
    keys.reduce((acc, cur) => ({ ...acc, [cur]: cur }), {} as MirrorRecord<T>);
