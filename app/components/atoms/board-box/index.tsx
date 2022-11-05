import type { FunctionComponent } from 'react';
import { PlayerComponent } from '~/components/atoms/player';
import type { Point } from '~/models/point';
import { PointOps } from '~/models/point';
import { useRecoilValue } from 'recoil';
import { boardBoxState, playersState } from '~/recoil';
import { sliceSelector } from '~/recoil/utils';

type Props = {
  currentPoint: Point;
};

export const BoardBoxComponent: FunctionComponent<Props> = ({
  currentPoint,
}) => {
  const boxId = useRecoilValue(
    sliceSelector([boardBoxState(currentPoint), 'id']),
  );
  const players = useRecoilValue(playersState);
  const playerIds = players
    .where((p) => PointOps.equals(currentPoint)(p?.position))
    .select((p) => p.id);

  return (
    <div className="h-20 w-20 border bg-blue-500">
      {boxId &&
        playerIds
          .select((pid) => <PlayerComponent key={pid} playerId={pid} />)
          .toArray()}
    </div>
  );
};
