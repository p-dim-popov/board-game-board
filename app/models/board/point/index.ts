import type { Point } from '~/models/point';
import { PointOps } from '~/models/point';

export type BoardPoint = Point & {
  id: string
  allowedNext?: Point[]
};

export const BoardPointOps = {
  new: (point: Point, allowedNext?: Point[]): BoardPoint => ({
    ...point,
    id: PointOps.serialize(point),
    allowedNext,
  }),
};
