import { withoutFalsyValues } from '~/utils/withoutFalsyValues/index';

describe(withoutFalsyValues.name, () => {
  it.each([
    [
      [1, 2, 0, 3],
      [1, 2, 3],
    ],
    [
      [1, undefined, 3],
      [1, 3],
    ],
    [[1, undefined, null], [1]],
    [[1, undefined, null], [1]],
    [
      [1, false, 'str'],
      [1, 'str'],
    ],
    [
      ['', 123, 'str'],
      [123, 'str'],
    ],
  ])(
    'should remove falsy values, %s, %s',
    (array: unknown[], expectedResult: unknown[]) => {
      const result = withoutFalsyValues(array);

      expect(result).toEqual(expectedResult);
    },
  );
});
