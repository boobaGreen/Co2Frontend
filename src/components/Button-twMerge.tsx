type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

import { twMerge } from "tailwind-merge";

export default function Button({ className }: ButtonProps) {
  return (
    <button
      className={twMerge("bg-blue-500 text-white py-2 px-4 rounded", className)}
    >
      Button
    </button>
  );
}
