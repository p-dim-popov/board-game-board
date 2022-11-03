import type { FunctionComponent } from 'react';
import { useMemo, useState } from 'react';
import { BoardBoxComponent } from '~/components/atoms/board-box';
import { BoardOps } from '~/models/board';
import { PointOps } from '~/models/point';
import { applyArgs } from 'ts-functional-pipe';
import { BoardBoxOps } from '~/models/board/box';
import { range } from 'lodash';
import { PlayerOps } from '~/models/player';

export const BoardComponent: FunctionComponent = () => {
  const [board] = useState(() =>
    applyArgs(BoardOps.new()).to(
      BoardOps.setBoxes(
        applyArgs([BoardBoxOps, PointOps] as const).to(([bb, p]) => [
          bb.new(p.new(-1, -2), [p.new(-1, -1)]),
          bb.new(p.new(-1, -1), [p.new(-1, -2)]),
          bb.new(p.new(-1, 0), [p.new(-1, -1)]),
          bb.new(p.new(0, -2), [p.new(-1, -1)]),
          bb.new(p.new(1, -2), [p.new(-1, -1)]),
          bb.new(p.new(2, -2), [p.new(-1, -1)]),
        ]),
      ),
    ),
  );
  const dimensions = useMemo(() => BoardOps.getDimensions(board), [board]);
  const [players] = useState(() =>
    applyArgs([PlayerOps, PointOps] as const).to(([p, po]) => [
      applyArgs(p.new()).to(p.move(po.new(1, -2))),
      applyArgs(p.new()).to(p.move(po.new(-1, -1))),
      applyArgs(p.new()).to(p.move(po.new(0, -1))),
    ]),
  );

  return (
    <div className="flex flex-row">
      {range(dimensions.left.x, dimensions.right.x + 1).map((x) => (
        <div key={x} className="flex flex-col-reverse">
          {range(dimensions.left.y, dimensions.right.y + 1).map((y) => {
            const currentPoint = PointOps.new(x, y);
            console.log(currentPoint);
            const box = board.boxes.find((b) =>
              PointOps.equals(currentPoint)(b.position),
            );
            return (
              <BoardBoxComponent
                key={`${PointOps.serialize(currentPoint)}_${box?.id}`}
                box={box}
                player={players.find((p) =>
                  PointOps.equals(currentPoint)(p.position),
                )}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
