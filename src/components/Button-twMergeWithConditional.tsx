type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Button({ className }: ButtonProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pending, _] = useState(true);
  return (
    <button
      className={twMerge(
        "bg-blue-500 text-white py-2 px-4 rounded",
        className,
        pending && "bg-green-700"
      )}
    >
      Button
    </button>
  );
}
