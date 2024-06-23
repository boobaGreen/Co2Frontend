type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className }: ButtonProps) {
  return (
    <button className={`bg-blue-500 text-white py-2 px-4 rounded ${className}`}>
      Button
    </button>
  );
}
