import type { FunctionComponent } from 'react';
import type { BoardBox } from '~/models/board/box';
import { PointOps } from '~/models/point';
import type { Player } from '~/models/player';

type Props = {
  box: BoardBox | undefined;
  player: Player | undefined;
};

export const BoardBoxComponent: FunctionComponent<Props> = ({
  box,
  player,
}) => (
  <div className="h-20 w-20 border bg-blue-500">
    {box && PointOps.serialize(box.position)}
    {player && <div className="bg-gray-50">{player.id}</div>}
  </div>
);
