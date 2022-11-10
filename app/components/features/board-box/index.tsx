import type { FunctionComponent } from 'react';
import { PlayerComponent } from '~/components/features/player';
import type { Point } from '~/models/point';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  boardBoxState,
  isBoardBoxNextState,
  playersOnPointState,
  playersState,
} from '~/recoil';
import classNames from 'classnames';
import type { Player } from '~/models/player';
import { memo, useCallback } from 'react';
import type { BoardBox } from '~/models/board/box';
import { PlayerOps } from '~/models/player';
import Sequence = LazyJS.Sequence;

type Props = {
  currentPoint: Point;
};

export const BoardBoxComponent: FunctionComponent<Props> = ({
  currentPoint,
}) => {
  const box = useRecoilValue(boardBoxState(currentPoint));
  const players = useRecoilValue(playersOnPointState(currentPoint));

  return (
    <div
      className={classNames(
        'flex h-full w-full flex-col border',
        box && 'bg-blue-500',
      )}
    >
      {box ? <ActiveBoardBox box={box} players={players} /> : <div />}
    </div>
  );
};

const ActiveBoardBox: FunctionComponent<{
  box: BoardBox;
  players: Sequence<Player>;
}> = ({ box, players }) => {
  const amINext = useRecoilValue(isBoardBoxNextState(box.position));
  const setPlayers = useSetRecoilState(playersState);

  const moveSelectedPlayer = useCallback(() => {
    if (amINext) {
      setPlayers((p) =>
        p.map((pp) => (pp.isSelected ? PlayerOps.move(box.position)(pp) : pp)),
      );
    }
  }, [amINext, box.position, setPlayers]);

  return (
    <div
      tabIndex={+amINext - 1}
      role="button"
      onClick={moveSelectedPlayer}
      onKeyPress={moveSelectedPlayer}
      className={classNames(
        'h-full w-full',
        amINext && 'border-2 border-green-500',
        !amINext && 'cursor-default',
      )}
    >
      <div className="h-2/3 w-full" />
      <div className="flex h-1/3 w-full">
        <DisplayPlayers players={players} />
      </div>
    </div>
  );
};

const DisplayPlayers = memo<{ players: Sequence<Player> }>(({ players }) => (
  <>
    {players
      .map((p) => <PlayerComponent key={p.id} playerId={p.id} />)
      .toArray()}
  </>
));
