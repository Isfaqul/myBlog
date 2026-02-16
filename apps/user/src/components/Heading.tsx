import type { HeadingProps } from "../types";

export default function Heading({ level, size = "text-3xl", className, children, ...props }: HeadingProps) {
  const baseClassses = "heading" + " " + size;
  const Tag = `h${level}` as const;

  return (
    <Tag className={`${baseClassses} ${className ?? ""}`} {...props}>
      {children}
    </Tag>
  );
}
