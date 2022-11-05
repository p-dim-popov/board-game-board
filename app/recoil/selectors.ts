import { DefaultValue, selector, selectorFamily } from 'recoil';
import type { Player, PlayerId } from '~/models/player';
import { boardState } from '~/recoil/atoms';
import { PlayerOps } from '~/models/player';
import { sliceSelector } from '~/recoil/utils';
import type { BoardBox, BoardBoxId } from '~/models/board/box';
import type { Point } from '~/models/point';
import { PointOps } from '~/models/point';
import { List } from 'linqts-camelcase';

export const playersState = selector({
  key: 'players',
  get: (opts) => new List(opts.get(sliceSelector([boardState, 'players']))),
  set: (opts, newValue) =>
    newValue instanceof DefaultValue ||
    opts.set(sliceSelector([boardState, 'players']), newValue.toArray()),
});

export const playerState = selectorFamily<Player | undefined, PlayerId>({
  key: 'player',
  get: (id) => (opts) =>
    opts.get(playersState).firstOrDefault((p) => p?.id === id),
  set: (id) => (opts, newValue) => {
    const players = ((): List<Player> => {
      const currentPlayers = opts.get(playersState);

      if (newValue instanceof DefaultValue) {
        return currentPlayers
          .select((p) => {
            if (p.id !== id) {
              return p;
            }

            const maybePlayer = opts.get(playerState(id));
            if (!maybePlayer) {
              return maybePlayer;
            }

            return PlayerOps.reset(maybePlayer);
          })
          .where(Boolean) as List<Player>;
      }

      if (typeof newValue === 'undefined') {
        return currentPlayers.where((p) => p?.id !== id);
      }

      return currentPlayers.select((p) => (p.id === id ? newValue : p));
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
    if (typeof param === 'string') {
      return opts
        .get(sliceSelector([boardState, 'boxes']))
        .find((b) => b.id === param);
    }

    return opts
      .get(sliceSelector([boardState, 'boxes']))
      .find((b) => PointOps.equals(param)(b.position));
  },
});
