import type { Point } from '~/models/point';
import { applyArgs, pipe } from 'ts-functional-pipe';
import { PointOps } from '~/models/point';
import { PlayerOps } from './index';

describe('Player Operations', () => {
  describe(PlayerOps.new.name, () => {
    it('should create new player', () => {
      const player = PlayerOps.new();

      expect(player.id).toEqual(expect.any(String));
      expect(player.position).toStrictEqual({ x: 0, y: 0 });
      expect(player.isSelected).toEqual(false);
    });

    it('should create new players with different ids', () => {
      const player1 = PlayerOps.new();
      const player2 = PlayerOps.new();

      expect(player1.id).not.toEqual(player2.id);
    });
  });

  describe(PlayerOps.move.name, () => {
    it('should change player position with received one', () => {
      const player = PlayerOps.new();
      const newPosition: Point = {
        ...player.position,
        x: player.position.x + 1,
      };
      const newPlayer = PlayerOps.move(newPosition)(player);

      expect(newPlayer.position).toEqual(newPosition);
    });
  });

  describe(PlayerOps.reset.name, () => {
    it('should create a new player with the old id', () => {
      const player = PlayerOps.new();
      const result = applyArgs(PlayerOps).to((p) =>
        applyArgs(player).to(pipe(p.move(PointOps.new(1, 2)), p.reset)),
      );

      expect(result).toStrictEqual({
        id: player.id,
        position: PointOps.new(0, 0),
        isSelected: false,
      });
    });
  });
});
