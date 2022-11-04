import { DefaultValue, selector, selectorFamily } from 'recoil';
import type { Player } from '~/models/player';
import { boardState } from '~/recoil/atoms';
import { BoardOps } from '~/models/board';
import { applyArgs, pipe } from 'ts-functional-pipe';
import { PlayerOps } from '~/models/player';
import { withoutFalsyValues } from '~/utils';

export const playersState = selector<Player[]>({
  key: 'players',
  get: (opts) => opts.get(boardState).players,
  set: (opts, newValue) => {
    const value =
      newValue instanceof DefaultValue ? BoardOps.new().players : newValue;

    opts.set(
      boardState,
      applyArgs(boardState).to(pipe(opts.get, BoardOps.setPlayers(value))),
    );
  },
});

export const playerState = selectorFamily<Player | undefined, string>({
  key: 'player',
  get: (id) => (opts) => opts.get(playersState).find((p) => p.id === id),
  set: (id) => (opts, newValue) => {
    const players = ((): Player[] => {
      const currentPlayers = opts.get(playersState);

      if (newValue instanceof DefaultValue) {
        return withoutFalsyValues(
          currentPlayers.map((p) => {
            if (p.id !== id) {
              return p;
            }

            const maybePlayer = opts.get(playerState(id));
            if (!maybePlayer) {
              return maybePlayer;
            }

            return PlayerOps.reset(maybePlayer);
          }),
        );
      }

      if (typeof newValue === 'undefined') {
        return currentPlayers.filter((p) => p.id !== id);
      }

      return currentPlayers.map((p) => (p.id === id ? newValue : p));
    })();

    opts.set(playersState, players);
  },
});
