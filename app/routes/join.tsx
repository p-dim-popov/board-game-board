import type { MetaFunction } from '@remix-run/node';
import type { ChangeEvent } from 'react';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { Input, LinkButtonWhenPossible } from '~/components/atoms';

export const meta: MetaFunction = () => ({
  title: 'Join Game',
});

export default function Join() {
  const [roomId, setRoomId] = useState<string>();

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setRoomId(event.target.value),
    [],
  );

  return (
    <div className="flex min-h-full flex-col items-center justify-center text-center">
      <div>
        Enter room name:
        <Input onChange={onInputChange} />
        <div className="flex max-w-xl flex-col items-center">
          Join as
          <div className="flex flex-col space-y-4">
            <LinkButtonWhenPossible
              href={roomId ? `/room/${roomId}` : undefined}
            >
              Host
            </LinkButtonWhenPossible>
            <div>or</div>
            <LinkButtonWhenPossible>
              Participant companion
            </LinkButtonWhenPossible>
          </div>
        </div>
      </div>
    </div>
  );
}
