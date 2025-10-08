import React, { useEffect, useRef } from "react";
import { MathfieldElement } from "mathlive";

interface MathFieldProps {
  value: string;
  onChange?: (latex: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  displayMode?: boolean;
  className?: string;
}

export const MathField: React.FC<MathFieldProps> = ({
  value,
  onChange,
  placeholder,
  readOnly = false,
  displayMode = false,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mathFieldRef = useRef<MathfieldElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!mathFieldRef.current) {
      const mf = new MathfieldElement();
      mf.value = value;
      mf.readOnly = readOnly;
      mf.smartMode = false;
      mf.classList.add(...className.split(" "));
      mf.mathModeSpace = "\\:";
      if (displayMode) {
        mf.style.pointerEvents = "none";
        mf.style.background = "transparent";
        mf.style.border = "none";
      }

      if (placeholder) mf.placeholder = placeholder;

      mf.addEventListener("input", () => {
        onChange?.(mf.getValue("latex"));
      });

      containerRef.current.appendChild(mf);
      mathFieldRef.current = mf;
    }

    mathFieldRef.current.value = value;
    mathFieldRef.current.readOnly = readOnly;
  }, [value, readOnly, displayMode, onChange, placeholder]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minHeight: "2.2rem" }}
    />
  );
};
