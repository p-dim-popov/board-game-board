import type { FunctionComponent } from 'react';
import type { PlayerId } from '~/models/player';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { playerState } from '~/recoil';
import OutsideClickHandler from 'react-outside-click-handler';
import { sliceSelector } from '~/recoil/utils';
import classNames from 'classnames';

type Props = {
  playerId: PlayerId;
};

const FEAT_OUTSIDE_CLICK_DESELECT = false;

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

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape' && isSelected) {
        unselectPlayer();
      }
    };

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [isSelected, unselectPlayer]);

  return (
    <OutsideClickHandler
      disabled={!FEAT_OUTSIDE_CLICK_DESELECT || !isSelected}
      onOutsideClick={unselectPlayer}
    >
      <button
        type="button"
        onClick={togglePlayerSelected}
        className={classNames(
          'h-10 w-10 rounded rounded-full border',
          isSelected ? 'bg-green-300' : 'bg-gray-100',
        )}
      >
        {playerId}
      </button>
    </OutsideClickHandler>
  );
};
