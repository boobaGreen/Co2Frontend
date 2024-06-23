type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

import { useState } from "react";
import { cn } from "../assets/utils/utils";

export default function Button({ className, ...props }: ButtonProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pending, setPending] = useState(true);
  return (
    <button
      className={cn("bg-blue-500 py-2 px-4 rounded text-white ", className, {
        "bg-yellow-700": pending,
      })}
      {...props}
    >
      Button
    </button>
  );
}

// manca ref e children per complete reuseble button component
