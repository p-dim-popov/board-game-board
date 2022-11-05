import { atom } from 'recoil';
import type { Board } from '~/models/board';
import { BoardOps } from '~/models/board';
import { applyArgs, pipe } from 'ts-functional-pipe';
import { BoardBoxOps } from '~/models/board/box';
import { PointOps } from '~/models/point';
import { PlayerOps } from '~/models/player';

export const boardState = atom<Board>({
  default: applyArgs().to(
    pipe(
      BoardOps.new,
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
      BoardOps.setPlayers(
        applyArgs([PlayerOps, PointOps] as const).to(([p, po]) => [
          applyArgs(p.new()).to(p.move(po.new(1, -2))),
          applyArgs(p.new()).to(p.move(po.new(-1, -1))),
          applyArgs(p.new()).to(p.move(po.new(0, -1))),
          applyArgs(p.new()).to(p.move(po.new(0, -1))),
        ]),
      ),
    ),
  ),
  key: 'board',
});
