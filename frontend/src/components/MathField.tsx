import React, { useEffect, useRef } from "react";
import { MathfieldElement } from "mathlive";

interface MathFieldProps {
  value: string;
  onChange?: (latex: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  displayMode?: boolean;
}

export const MathField: React.FC<MathFieldProps> = ({
  value,
  onChange,
  placeholder,
  readOnly = false,
  className = "",
  displayMode = false,
}) => {
  const ref = useRef<MathfieldElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const field = ref.current;

    field.value = value ?? "";
    field.readOnly = readOnly;
    field.smartMode = !displayMode;
    if (displayMode) {
      field.style.pointerEvents = "none";
      field.style.background = "transparent";
      field.style.border = "none";
    }

    const handleInput = () => {
      if (!onChange) return;
      onChange(field.getValue("latex"));
    };
    field.addEventListener("input", handleInput);
    return () => field.removeEventListener("input", handleInput);
  }, [value, onChange, readOnly, displayMode]);

  return (
    <math-field
      ref={ref as any}
      readOnly={readOnly}
      placeholder={placeholder}
      class={className}
      style={{
        minHeight: "2.2rem",
        display: "block",
      }}
    ></math-field>
  );
};
