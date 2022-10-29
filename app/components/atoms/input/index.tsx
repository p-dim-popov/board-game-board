import React from 'react';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'>;

export const Input: React.FC<Props> = (props) => (
  <input
    className="focus:shadow-outline block w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 leading-normal focus:outline-none"
    type="email"
    placeholder="jane@example.com"
    {...props}
  />
);
