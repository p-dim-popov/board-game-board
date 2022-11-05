import type { Point } from '~/models/point';
import { PointOps } from '~/models/point';
import { createErrorClass } from '~/utils';

export type BoardBoxId = `${number},${number}`;
export type BoardBox = {
  id: BoardBoxId;
  position: Point;
  allowedNext: Point[];
};

const newBoardBox = (point: Point, allowedNext: Point[]): BoardBox => {
  if (!allowedNext.length) {
    throw BoardBoxConstructError.create('NO_NEXT_POINTS');
  }

  if (allowedNext.some(PointOps.equals(point))) {
    throw BoardBoxConstructError.create('CURRENT_EXISTS_AS_NEXT');
  }

  return {
    id: PointOps.serialize(point),
    position: point,
    allowedNext,
  };
};

const canBoardBoxNavigateToPoint =
  (destination: Point) =>
    (self: BoardBox): boolean =>
      self.allowedNext.some(PointOps.equals(destination));

const BoardBoxConstructError = createErrorClass('BoardBoxConstructError', [
  'NO_NEXT_POINTS',
  'CURRENT_EXISTS_AS_NEXT',
]);

export const BoardBoxOps = {
  new: newBoardBox,
  canNavigateToPoint: canBoardBoxNavigateToPoint,
  ConstructError: BoardBoxConstructError,
};
