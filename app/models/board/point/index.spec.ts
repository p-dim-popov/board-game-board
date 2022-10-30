import { BoardPointOps } from '~/models/board/point';
import { PointOps } from '~/models/point';

describe('Board Point Operations', () => {
  describe(BoardPointOps.new.name, () => {
    it('should create a board point from point', () => {
      const point = PointOps.new(1, 2);
      const boardPoint = BoardPointOps.new(point);

      expect(boardPoint.x).toEqual(point.x);
      expect(boardPoint.y).toEqual(point.y);
      expect(boardPoint.id).toEqual(PointOps.serialize(point));
    });

    it('should build board point with allowed next points id array', () => {
      const allowedNext = [PointOps.new(2, 3), PointOps.new(3, 4)];
      const boardPoint = BoardPointOps.new(PointOps.new(1, 2), allowedNext);

      expect(boardPoint.allowedNext).toEqual(allowedNext);
    });
  });
});
