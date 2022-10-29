import type { Point, MaybePoint } from '~/models/point.server';
import { PointOps } from '~/models/point.server';

describe('Point', () => {
  const sample: Point = { x: 1, y: 2 };

  it.each([
    [sample, sample, true],
    [sample, { ...sample }, true],
    [{ x: 1, y: 2 }, { x: 1, y: 0 }, false],
    [null, { x: 1, y: 2 }, false],
    [{ x: 1, y: 2 }, null, false],
    [null, null, true],
  ])(
    'should compare correctly - (%j), (%j)',
    (point1: MaybePoint, point2: MaybePoint, areEqual: boolean) => {
      expect(PointOps.equals(point1)(point2)).toEqual(areEqual);
    },
  );
});
