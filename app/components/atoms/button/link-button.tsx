import type { AnchorHTMLAttributes, ReactNode } from 'react';
import React, { memo } from 'react';
import { Link } from '@remix-run/react';
import { primaryButtonClassnames } from 'app/components/atoms/button/common';
import cn from 'classnames';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: ReactNode
  external?: boolean
};

export const LinkButton: React.FC<Props> = memo(
  ({ children, external, ...rest }) => {
    const Component = external ? 'a' : Link;

    return (
      <Component
        {...rest}
        to={rest.href}
        className={cn(primaryButtonClassnames, 'text-center')}
      >
        {children}
      </Component>
    );
  },
);
