import { BoardOps } from '~/models/board/index';
import { applyArgs, pipe } from 'ts-functional-pipe';
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
        { position: one, id: PointOps.serialize(one), allowedNext: [two] },
        { position: two, id: PointOps.serialize(two), allowedNext: [three] },
        { position: three, id: PointOps.serialize(three), allowedNext: [one] },
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

  describe(BoardOps.getDimensions.name, () => {
    it.each([
      [
        [
          [1, 2],
          [1, 3],
          [0, 3],
          [0, 4],
        ] as [number, number][],
        { left: PointOps.new(0, 2), right: PointOps.new(1, 4) },
      ],
      [
        [
          [-1, 2],
          [-1, 3],
          [0, 3],
          [0, 4],
        ] as [number, number][],
        { left: PointOps.new(-1, 2), right: PointOps.new(0, 4) },
      ],
    ])(
      'should calculate board dimensions based on max points (%j, %j)',
      (
        tuples: [number, number][],
        expectedResult: ReturnType<typeof BoardOps.getDimensions>,
      ) => {
        const [one, two, three, four] = PointOps.fromTuples(tuples);
        const result = applyArgs().to(
          pipe(
            BoardOps.new,
            BoardOps.setBoxes([
              BoardBoxOps.new(one, [two]),
              BoardBoxOps.new(two, [three]),
              BoardBoxOps.new(three, [four]),
              BoardBoxOps.new(four, [three]),
            ]),
            BoardOps.getDimensions,
          ),
        );

        expect(result).toEqual(expectedResult);
      },
    );
  });
});
