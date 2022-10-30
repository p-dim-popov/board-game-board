import type { Point } from '~/models/point';
import { PointOps } from '~/models/point';
import { createErrorClass } from '~/utils';

export type BoardPosition = Point & {
  id: string;
  allowedNext: Point[];
};

const newBoardPoint = (point: Point, allowedNext: Point[]): BoardPosition => {
  if (!allowedNext.length) {
    throw BoardPointConstructError.create('NO_NEXT_POINTS');
  }

  if (allowedNext.some(PointOps.equals(point))) {
    throw BoardPointConstructError.create('CURRENT_EXISTS_AS_NEXT');
  }

  return {
    ...point,
    id: PointOps.serialize(point),
    allowedNext,
  };
};

const BoardPointConstructError = createErrorClass('BoardPointConstructError', [
  'NO_NEXT_POINTS',
  'CURRENT_EXISTS_AS_NEXT',
]);

export const BoardPointOps = {
  new: newBoardPoint,
  ConstructError: BoardPointConstructError,
};
