import type { MainContentWrapperProps } from "../types";

export default function MainContentWrapper({ children, className }: MainContentWrapperProps) {
  const baseClasses = `max-w-160 mx-auto`;

  return <div className={`${baseClasses} ${className ?? ""}`}>{children}</div>;
}
