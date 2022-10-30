import { BoardPointOps } from '~/models/board/point';
import { PointOps } from '~/models/point';
import { applyArgs } from 'ts-functional-pipe';

describe('Board Point Operations', () => {
  const point = PointOps.new(1, 2);

  describe(BoardPointOps.new.name, () => {
    it('should create a board point from point', () => {
      const boardPoint = BoardPointOps.new(point, [
        { ...point, x: point.x + 1 },
      ]);

      expect(boardPoint.x).toEqual(point.x);
      expect(boardPoint.y).toEqual(point.y);
      expect(boardPoint.id).toEqual(PointOps.serialize(point));
    });

    it('should build board point with allowed next points id array', () => {
      const allowedNext = [PointOps.new(2, 3), PointOps.new(3, 4)];
      const boardPoint = BoardPointOps.new(PointOps.new(1, 2), allowedNext);

      expect(boardPoint.allowedNext).toEqual(allowedNext);
    });

    it('should throw when no next points are supplied', () => {
      const badConstruct = () => BoardPointOps.new(point, []);

      expect(badConstruct).toThrow();
    });

    it('should throw when no only next point is the same point', () => {
      const badConstruct = () => BoardPointOps.new(point, [point]);

      expect(badConstruct).toThrow();
    });
  });

  describe(BoardPointOps.canNavigateToPoint.name, () => {
    it('should return true if destination point is in allowed next', () => {
      const nextPoint = { ...point, x: point.x + 1 };
      const isNextPoint = applyArgs(BoardPointOps).to((bp) =>
        applyArgs(bp.new(point, [nextPoint])).to(
          bp.canNavigateToPoint(nextPoint),
        ),
      );

      expect(isNextPoint).toEqual(true);
    });

    it('should return false if destination point is not in allowed next', () => {
      const nextPoint = { ...point, x: point.x + 1 };
      const isNextPoint = applyArgs(BoardPointOps).to((bp) =>
        applyArgs(bp.new(point, [{ ...nextPoint, x: nextPoint.x + 1 }])).to(
          bp.canNavigateToPoint(nextPoint),
        ),
      );

      expect(isNextPoint).toEqual(false);
    });
  });
});
