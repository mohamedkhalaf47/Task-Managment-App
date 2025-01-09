"use client";
import React from "react";

interface Props {
  icon?: React.ReactNode;
  name?: string;
  background?: string;
  padding?: string;
  borderRad?: string;
  fw?: string;
  fs?: string;
  click?: () => void;
  type?: "submit" | "button" | "reset" | undefined;
  border?: string;
  color?: string;
}
const Button = ({
  icon,
  name,
  background,
  padding,
  borderRad,
  fw,
  fs,
  click,
  type,
  border,
  color,
}: Props) => {
  return (
    <button
      className="relative flex items-center text-[#b2becd] z-[5] cursor-pointer duration-500 ease-in-out hover:text-[#f8f8f8] gap-4"
      style={{
        background: background,
        padding: padding || "0.5rem 1rem",
        borderRadius: borderRad || "0.5rem",
        fontWeight: fw || "500",
        fontSize: fs,
        border: border || "none",
        color: color || "#f8f8f8",
      }}
      onClick={click}
    >
        {icon && icon}
        {name}
    </button>
  );
};

export default Button