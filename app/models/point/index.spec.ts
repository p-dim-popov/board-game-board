import type { MaybePoint } from '~/models/point/index';
import { PointOps } from '~/models/point/index';

describe('Point', () => {
  const sample = PointOps.new(1, 2);

  describe(PointOps.new.name, () => {
    it('should create point', () => {
      const point = PointOps.new(1, 2);

      expect(point).toEqual({ x: 1, y: 2 });
    });
  });

  describe(PointOps.equals.name, () => {
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

  describe(PointOps.serialize.name, () => {
    it('should join x and y by comma', () => {
      const result = PointOps.serialize(sample);

      expect(result).toEqual('1,2');
    });
  });

  describe(PointOps.parse.name, () => {
    it('should work as expected', () => {
      const result = PointOps.parse('1,2');

      expect(result).toEqual(PointOps.new(1, 2));
    });
  });
});
