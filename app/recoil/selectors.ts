import { DefaultValue, selector, selectorFamily } from 'recoil';
import type { Player, PlayerId } from '~/models/player';
import { PlayerOps } from '~/models/player';
import { boardState } from '~/recoil/atoms';
import { sliceSelector } from '~/recoil/utils';
import type { BoardBox, BoardBoxId } from '~/models/board/box';
import type { Point } from '~/models/point';
import { PointOps } from '~/models/point';
import Lazy from 'lazy.js';
import Sequence = LazyJS.Sequence;

export const playersState = selector({
  key: 'players',
  get: (opts): Sequence<Player> =>
    Lazy(opts.get(sliceSelector([boardState, 'players']))),
  set: (opts, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }

    opts.set(sliceSelector([boardState, 'players']), newValue.toArray());
  },
});

export const playersOnPointState = selectorFamily({
  key: 'playersOnPoint',
  get: (point: Point) => (opts) =>
    opts.get(playersState).filter((p) => PointOps.equals(p.position)(point)),
});

export const playerState = selectorFamily<Player | undefined, PlayerId>({
  key: 'player',
  get: (id) => (opts) =>
    opts
      .get(playersState)
      .filter((p) => p.id === id)
      .first(),
  set: (id) => (opts, newValue) => {
    const players = ((): Sequence<Player> => {
      const currentPlayers = opts.get(playersState);

      if (newValue instanceof DefaultValue) {
        return currentPlayers
          .map((p) => {
            if (p.id !== id) {
              return p;
            }

            const maybePlayer = opts.get(playerState(id));
            if (!maybePlayer) {
              return maybePlayer;
            }

            return PlayerOps.reset(maybePlayer);
          })
          .filter(Boolean) as Sequence<Player>;
      }

      if (typeof newValue === 'undefined') {
        return currentPlayers.filter((p) => p.id !== id);
      }

      return currentPlayers.map((p) => {
        if (p.id === id) {
          return newValue;
        }

        if (newValue.isSelected) {
          return { ...p, isSelected: false };
        }

        return p;
      });
    })();

    opts.set(playersState, players);
  },
});

export const boardBoxState = selectorFamily<
BoardBox | undefined,
BoardBoxId | Point
>({
  key: 'boardBox',
  get: (param) => (opts) => {
    const boxes = opts.get(sliceSelector([boardState, 'boxes']));

    if (typeof param === 'string') {
      return boxes.find((b) => b.id === param);
    }

    return boxes.find((b) => PointOps.equals(param)(b.position));
  },
});

export const isBoardBoxNextState = selectorFamily({
  key: 'isBoardBoxNext',
  get: (param: BoardBoxId | Point) => (opts) => {
    const boardBox = opts.get(boardBoxState(param));
    if (!boardBox) return false;

    return Lazy(opts.get(sliceSelector([boardState, 'boxes'])))
      .filter((b) => b.allowedNext.some(PointOps.equals(boardBox.position)))
      .some((b) =>
        opts.get(playersOnPointState(b.position)).some((p) => p.isSelected),
      );
  },
});
