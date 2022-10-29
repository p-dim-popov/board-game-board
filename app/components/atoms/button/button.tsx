import type { ButtonHTMLAttributes, ReactNode } from 'react';
import React, { memo } from 'react';
import { primaryButtonClassnames } from '~/components/atoms/button/common';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
};

export const Button: React.FC<Props> = memo(({ children, ...rest }) => (
  <button type="button" className={primaryButtonClassnames} {...rest}>
    {children}
  </button>
));
