import type { MetaFunction } from "@remix-run/node";
import type { ChangeEvent } from "react";
import * as React from "react";
import { useCallback, useState } from "react";
import { Input } from "~/components/atoms";
import { LinkButtonWhenPossible } from "~/components/atoms";

export const meta: MetaFunction = () => {
  return {
    title: "Join Game"
  };
};

export default function Join() {
  const [roomId, setRoomId] = useState<string>();

  const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setRoomId(event.target.value), []);

  return (
    <div className="flex min-h-full flex-col justify-center items-center text-center">
      <div>
        Enter room name:
        <Input onChange={onInputChange} />
        <div className="flex flex-col max-w-xl items-center">
          Join as
          <div className="flex flex-col space-y-4">
            <LinkButtonWhenPossible href={roomId ? `/room/${roomId}` : undefined}>Host</LinkButtonWhenPossible>
            <div>or</div>
            <LinkButtonWhenPossible>Participant companion</LinkButtonWhenPossible>
          </div>
        </div>
      </div>
    </div>
  );
}

