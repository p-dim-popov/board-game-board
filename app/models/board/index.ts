import type { BoardBox } from '~/models/board/box';
import { createErrorClass } from '~/utils';
import type { Point } from '~/models/point';
import { PointOps } from '~/models/point';
import { List } from 'linqts-camelcase';
import type { Player } from '~/models/player';

export type Board = {
  boxes: BoardBox[];
  players: Player[];
};

type BoardDimension = {
  left: Point;
  right: Point;
};

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
  new: (): Board => ({
    boxes: [],
    players: [],
  }),
  setBoxes: setBoardBoxes,
  getDimensions: (self: Board): BoardDimension => {
    const enumerable = new List(self.boxes);
    const selfCriteria = <T>(x: T) => x;

    const {
      0: smallestX,
      length: xLength,
      [xLength - 1]: biggestX,
    } = enumerable
      .select((x) => x.position.x)
      .orderBy(selfCriteria)
      .toArray();

    const {
      0: smallestY,
      length: yLength,
      [yLength - 1]: biggestY,
    } = enumerable
      .select((x) => x.position.y)
      .orderBy(selfCriteria)
      .toArray();

    return {
      left: PointOps.new(smallestX, smallestY),
      right: PointOps.new(biggestX, biggestY),
    };
  },
  ConstructError: BoardConstructError,
  setPlayers: (players: Player[]) => (board: Board) => ({ ...board, players }),
};
