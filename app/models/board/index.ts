import type { BoardBox } from '~/models/board/box';
import { createErrorClass } from '~/utils';
import { PointOps } from '~/models/point';

export type Board = {
  boxes: BoardBox[];
};

const newBoard = (): Board => ({
  boxes: [],
});

const setBoardBoxes =
  (boxes: BoardBox[]) =>
    (self: Board): Board => {
      if (
        boxes.some((b) =>
          b.allowedNext.some(
            (an) => !boxes.some((b1) => PointOps.equals(an)(b1.position)),
          ),
        )
      ) {
        throw BoardConstructError.create('NEXT_POINT_NOT_DECLARED');
      }

      return {
        ...self,
        boxes,
      };
    };

const BoardConstructError = createErrorClass('BoardConstructError', [
  'NEXT_POINT_NOT_DECLARED',
]);

export const BoardOps = {
  new: newBoard,
  setBoxes: setBoardBoxes,
  ConstructError: BoardConstructError,
};
