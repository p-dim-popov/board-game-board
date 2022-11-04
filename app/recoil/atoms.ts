import { atom } from 'recoil';
import type { Board } from '~/models/board';
import { BoardOps } from '~/models/board';

export const boardState = atom<Board>({
  default: BoardOps.new(),
  key: 'board',
});
