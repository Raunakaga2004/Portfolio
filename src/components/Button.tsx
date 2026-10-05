import type { CSSProperties, ReactNode } from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  download?: string;
  target?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  variant?: "outline" | "filled";
  // dark mode colors
  color?: string;
  hoverColor?: string;
  // light mode colors
  lightModeColor?: string;
  lightModeHoverColor?: string;
}

// colors are CSS values; theme switching lives in globals.css (.btn)
export default function Button({
  label,
  onClick,
  href,
  download,
  target,
  type = "button",
  disabled,
  className = "",
  icon,
  variant = "outline",
  color = "var(--color-fortext)",
  hoverColor = "var(--color-secondary)",
  lightModeColor = color,
  lightModeHoverColor = hoverColor,
}: ButtonProps) {
  const style = {
    "--btn-dark": color,
    "--btn-dark-hover": hoverColor,
    "--btn-light": lightModeColor,
    "--btn-light-hover": lightModeHoverColor,
  } as CSSProperties;
  const cls = `btn btn-${variant} inline-flex items-center justify-center gap-1 ${className.includes("rounded") ? "" : "rounded-md"} ${className}`;
  const content = <>{icon}{label}</>;

  if (href && !disabled) {
    return <a href={href} download={download} target={target} onClick={onClick} className={cls} style={style}>{content}</a>;
  }
  return <button type={type} onClick={onClick} disabled={disabled} className={cls} style={style}>{content}</button>;
}
