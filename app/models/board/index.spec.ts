import { BoardOps } from '~/models/board/index';
import { applyArgs } from 'ts-functional-pipe';
import { BoardBoxOps } from '~/models/board/box';
import { PointOps } from '~/models/point';

describe('Board Operations', () => {
  describe(BoardOps.new.name, () => {
    it('should create a board with no boxes', () => {
      const board = BoardOps.new();

      expect(board.boxes).toEqual([]);
    });
  });

  describe(BoardOps.setBoxes.name, () => {
    const [one, two, three] = [
      PointOps.new(0, 0),
      PointOps.new(1, 0),
      PointOps.new(2, 0),
    ];

    it('should set boxes', () => {
      const board = applyArgs(BoardOps.new()).to(
        BoardOps.setBoxes([
          BoardBoxOps.new(one, [two]),
          BoardBoxOps.new(two, [three]),
          BoardBoxOps.new(three, [one]),
        ]),
      );

      expect(board.boxes).toEqual([
        { ...one, id: PointOps.serialize(one), allowedNext: [two] },
        { ...two, id: PointOps.serialize(two), allowedNext: [three] },
        { ...three, id: PointOps.serialize(three), allowedNext: [one] },
      ]);
    });

    it('should throw error when next box does not exist', () => {
      const failingConstruct = () =>
        applyArgs(BoardOps.new()).to(
          BoardOps.setBoxes([
            BoardBoxOps.new(one, [two]),
            BoardBoxOps.new(two, [three]),
          ]),
        );

      expect(failingConstruct).toThrow();
    });
  });
});
