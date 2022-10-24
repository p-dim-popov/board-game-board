import React from "react";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">

export const Input: React.FC<Props> = (props) => {
  return (
    <input
      className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
      type="email"
      placeholder="jane@example.com"
      {...props}
    />
  );
};
