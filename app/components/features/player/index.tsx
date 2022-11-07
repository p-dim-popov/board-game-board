import type { FunctionComponent } from 'react';
import type { PlayerId } from '~/models/player';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { playerState } from '~/recoil';
import OutsideClickHandler from 'react-outside-click-handler';
import { sliceSelector } from '~/recoil/utils';
import classNames from 'classnames';

type Props = {
  playerId: PlayerId;
};

export const PlayerComponent: FunctionComponent<Props> = ({ playerId }) => {
  const [isSelected, setIsSelected] = useRecoilState(
    sliceSelector([playerState(playerId), 'isSelected']),
  );

  const togglePlayerSelected = useCallback(
    () => setIsSelected((prev) => (typeof prev !== 'undefined' ? !prev : prev)),
    [setIsSelected],
  );

  const unselectPlayer = useCallback(
    () => setIsSelected(false),
    [setIsSelected],
  );

  return (
    <OutsideClickHandler disabled={!isSelected} onOutsideClick={unselectPlayer}>
      <button
        type="button"
        onClick={togglePlayerSelected}
        className={classNames(
          'h-10 w-10 rounded rounded-full border',
          isSelected ? 'bg-green-300' : 'bg-gray-100',
        )}
      >
        {playerId}
        {isSelected?.toString()}
      </button>
    </OutsideClickHandler>
  );
};
