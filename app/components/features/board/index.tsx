import type { FunctionComponent } from 'react';
import { useMemo } from 'react';
import { BoardBoxComponent } from '~/components/features/board-box';
import { BoardOps } from '~/models/board';
import { PointOps } from '~/models/point';
import { range } from 'lodash';
import { useRecoilValue } from 'recoil';
import { boardState } from '~/recoil';

export const BoardComponent: FunctionComponent = () => {
  const board = useRecoilValue(boardState);
  const dimensions = useMemo(() => BoardOps.getDimensions(board), [board]);

  return (
    <div className="flex h-full w-full flex-row">
      {range(dimensions.left.x, dimensions.right.x + 1).map((x) => (
        <div key={x} className="flex h-full w-full flex-col-reverse">
          {range(dimensions.left.y, dimensions.right.y + 1).map((y) => {
            const currentPoint = PointOps.new(x, y);

            return (
              <BoardBoxComponent
                key={`${PointOps.serialize(currentPoint)}`}
                currentPoint={currentPoint}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
