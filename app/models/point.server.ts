export interface Point {
  x: number;
  y: number;
}

export type MaybePoint = Point | undefined | null

export const PointOps = {
  equals: (left: MaybePoint) => (right: MaybePoint) => left === right || !!(left && right) && (left.x === right.x && left.y === right.y)
};
