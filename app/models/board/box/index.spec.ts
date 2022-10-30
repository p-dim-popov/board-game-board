import { BoardBoxOps } from '~/models/board/box';
import { PointOps } from '~/models/point';
import { applyArgs } from 'ts-functional-pipe';

describe('Board Point Operations', () => {
  const point = PointOps.new(1, 2);

  describe(BoardBoxOps.new.name, () => {
    it('should create a board box from box', () => {
      const boardPoint = BoardBoxOps.new(point, [{ ...point, x: point.x + 1 }]);

      expect(boardPoint.position.x).toEqual(point.x);
      expect(boardPoint.position.y).toEqual(point.y);
      expect(boardPoint.id).toEqual(PointOps.serialize(point));
    });

    it('should build board box with allowed next points id array', () => {
      const allowedNext = [PointOps.new(2, 3), PointOps.new(3, 4)];
      const boardPoint = BoardBoxOps.new(PointOps.new(1, 2), allowedNext);

      expect(boardPoint.allowedNext).toEqual(allowedNext);
    });

    it('should throw when no next points are supplied', () => {
      const badConstruct = () => BoardBoxOps.new(point, []);

      expect(badConstruct).toThrow();
    });

    it('should throw when no only next box is the same box', () => {
      const badConstruct = () => BoardBoxOps.new(point, [point]);

      expect(badConstruct).toThrow();
    });
  });

  describe(BoardBoxOps.canNavigateToPoint.name, () => {
    it('should return true if destination box is in allowed next', () => {
      const nextPoint = { ...point, x: point.x + 1 };
      const isNextPoint = applyArgs(BoardBoxOps).to((bp) =>
        applyArgs(bp.new(point, [nextPoint])).to(
          bp.canNavigateToPoint(nextPoint),
        ),
      );

      expect(isNextPoint).toEqual(true);
    });

    it('should return false if destination box is not in allowed next', () => {
      const nextPoint = { ...point, x: point.x + 1 };
      const isNextPoint = applyArgs(BoardBoxOps).to((bp) =>
        applyArgs(bp.new(point, [{ ...nextPoint, x: nextPoint.x + 1 }])).to(
          bp.canNavigateToPoint(nextPoint),
        ),
      );

      expect(isNextPoint).toEqual(false);
    });
  });
});
