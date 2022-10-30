import type { Point } from '~/models/point';
import { PointOps } from '~/models/point';
import { createMirrorMap } from '~/utils';

export type BoardPosition = Point & {
  id: string
  allowedNext: Point[]
};

const newBoardPoint = (point: Point, allowedNext: Point[]): BoardPosition => {
  if (!allowedNext.length) {
    throw new BoardPointOps.ConstructError('NO_NEXT_POINTS');
  }

  if (allowedNext.some(PointOps.equals(point))) {
    throw new BoardPointOps.ConstructError('CURRENT_EXISTS_AS_NEXT');
  }

  return {
    ...point,
    id: PointOps.serialize(point),
    allowedNext,
  };
};

class BoardPointConstructError extends Error {
  static Type = createMirrorMap(['NO_NEXT_POINTS', 'CURRENT_EXISTS_AS_NEXT']);

  constructor(public type: keyof typeof BoardPointOps.ConstructError.Type) {
    super(type);
  }
}

export const BoardPointOps = {
  new: newBoardPoint,
  ConstructError: BoardPointConstructError,
};
