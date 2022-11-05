export type Point = {
  x: number;
  y: number;
};

export type MaybePoint = Point | undefined | null;

export const PointOps = {
  new: (x: number, y: number) => ({ x, y }),
  equals: (left: MaybePoint) => (right: MaybePoint) =>
    left === right ||
    (!!(left && right) && left.x === right.x && left.y === right.y),
  serialize: (self: Point) => `${self.x},${self.y}` as const,
  parse: (serialized: string): Point => {
    const [x, y] = serialized.split(',').map(Number);

    return { x, y };
  },
  fromTuple: (numbers: [number, number]): Point => PointOps.new(...numbers),
  fromTuples: (numbers: [number, number][]): Point[] =>
    numbers.map(PointOps.fromTuple),
};
