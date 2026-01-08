import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-lg border px-3 py-1 text-base transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      style={{
        backgroundColor: 'var(--input-bg)',
        borderColor: isFocused ? 'var(--input-focus-border)' : 'var(--input-border)',
        boxShadow: isFocused ? 'var(--input-focus-shadow)' : 'var(--input-shadow)',
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
}

export { Input };
