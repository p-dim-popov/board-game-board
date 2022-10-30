import type { BoardPosition } from '~/models/board/point';
import { createErrorClass } from '~/utils';
import { PointOps } from '~/models/point';

export type Board = {
  positions: BoardPosition[];
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
        throw BoardConstructError.create('NEXT_POINT_NOT_DECLARED');
      }

      return {
        ...self,
        positions,
      };
    };

const BoardConstructError = createErrorClass('BoardConstructError', [
  'NEXT_POINT_NOT_DECLARED',
]);

export const BoardOps = {
  new: newBoard,
  setPositions: setBoardPositions,
  ConstructError: BoardConstructError,
};
