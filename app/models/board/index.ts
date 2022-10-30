import type { BoardPosition } from '~/models/board/point';
import { createMirrorMap } from '~/utils';
import { PointOps } from '~/models/point';

export type Board = {
  positions: BoardPosition[]
};

const newBoard = (): Board => ({
  positions: [],
});

const setBoardPositions =
  (positions: BoardPosition[]) =>
    (self: Board): Board => {
      if (
        positions.some((p) =>
          p.allowedNext.some((an) => !positions.some(PointOps.equals(an))),
        )
      ) {
        throw new BoardConstructError('NEXT_POINT_NOT_DECLARED');
      }

      return {
        ...self,
        positions,
      };
    };

class BoardConstructError extends Error {
  static Type = createMirrorMap(['NEXT_POINT_NOT_DECLARED']);

  constructor(public type: keyof typeof BoardConstructError.Type) {
    super(type);
  }
}

export const BoardOps = {
  new: newBoard,
  setPositions: setBoardPositions,
  ConstructError: BoardConstructError,
};
