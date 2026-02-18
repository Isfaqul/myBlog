import type { HeadingProps } from "../types";

export default function Heading({
  level,
  size: mobileSize = "text-2xl",
  desktopSize = "sm:text-3xl",
  className,
  children,
  ...props
}: HeadingProps) {
  const baseClassses = "heading" + " " + mobileSize + " " + desktopSize;
  const Tag = `h${level}` as const;

  return (
    <Tag className={`${baseClassses} ${className ?? ""}`} {...props}>
      {children}
    </Tag>
  );
}
