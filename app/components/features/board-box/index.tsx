import type { FunctionComponent } from 'react';
import { PlayerComponent } from '~/components/features/player';
import type { Point } from '~/models/point';
import { useRecoilValue } from 'recoil';
import { boardBoxState, playersOnPointState } from '~/recoil';
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
  const players = useRecoilValue(playersOnPointState(currentPoint)).map((p) => (
    <PlayerComponent key={p.id} playerId={p.id} />
  ));

  return (
    <div className="h-20 w-20 border bg-blue-500">
      {boxId && players.toArray()}
    </div>
  );
};
