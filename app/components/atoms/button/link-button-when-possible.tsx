import * as React from "react";
import { Button, LinkButton } from "./";
import type { ComponentProps } from "react";
import { memo } from "react";

type Props = Omit<ComponentProps<typeof LinkButton>, "href"> & { href?: string } & ComponentProps<typeof Button>

export const LinkButtonWhenPossible: React.FC<Props> = memo((props) => {
  if (props.href) {
    return <LinkButton {...props} href={props.href}>{props.children}</LinkButton>;
  }

  return <Button {...props}>{props.children}</Button>;
});
