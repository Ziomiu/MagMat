import React from "react";
import { cn } from "../../libs/utils.ts";

function Input({
  className,
  type,
  label,
  value,
  ...props
}: React.ComponentProps<"input"> & { label?: string }) {
  return (
    <div>
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <input
        type={type}
        value={value}
        className={cn(
          "selection:bg-primary selection:text-primary-foreground flex h-9 w-full border-input min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-all outline-none ",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",

          className,
        )}
        {...props}
      />
    </div>
  );
}

export default Input;
