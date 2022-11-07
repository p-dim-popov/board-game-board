import type { FunctionComponent } from 'react';
import { PlayerComponent } from '~/components/features/player';
import type { Point } from '~/models/point';
import { useRecoilValue } from 'recoil';
import { boardBoxState, playersOnPointState } from '~/recoil';
import { sliceSelector } from '~/recoil/utils';
import classNames from 'classnames';

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
    <div
      className={classNames(
        'flex h-full w-full flex-col border',
        boxId && 'bg-blue-500',
      )}
    >
      <div className="h-2/3 w-full" />
      <div className="flex h-1/3 w-full">{boxId && players.toArray()}</div>
    </div>
  );
};
