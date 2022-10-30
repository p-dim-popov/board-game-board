import { BoardOps } from '~/models/board/index';
import { applyArgs } from 'ts-functional-pipe';
import { BoardPointOps } from '~/models/board/point';
import { PointOps } from '~/models/point';

describe('Board Operations', () => {
  describe(BoardOps.new.name, () => {
    it('should create a board with no positions', () => {
      const board = BoardOps.new();

      expect(board.positions).toEqual([]);
    });
  });

  describe(BoardOps.setPositions.name, () => {
    const [one, two, three] = [
      PointOps.new(0, 0),
      PointOps.new(1, 0),
      PointOps.new(2, 0),
    ];

    it('should set positions', () => {
      const board = applyArgs(BoardOps.new()).to(
        BoardOps.setPositions([
          BoardPointOps.new(one, [two]),
          BoardPointOps.new(two, [three]),
          BoardPointOps.new(three, [one]),
        ]),
      );

      expect(board.positions).toEqual([
        { ...one, id: PointOps.serialize(one), allowedNext: [two] },
        { ...two, id: PointOps.serialize(two), allowedNext: [three] },
        { ...three, id: PointOps.serialize(three), allowedNext: [one] },
      ]);
    });

    it('should throw error when next position does not exist', () => {
      const failingConstruct = () =>
        applyArgs(BoardOps.new()).to(
          BoardOps.setPositions([
            BoardPointOps.new(one, [two]),
            BoardPointOps.new(two, [three]),
          ]),
        );

      expect(failingConstruct).toThrow();
    });
  });
});
