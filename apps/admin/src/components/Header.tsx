import type { HeaderProps } from "../types";
import MainContentWrapper from "./MainContentWrapper";

export default function Header({ children, className, ...props }: HeaderProps) {
  const baseClasses = `bg-tGray-400 font-body border-b border-b-tGray-300`;
  return (
    <header className={`${baseClasses} ${className ?? ""}`} {...props}>
      <MainContentWrapper>{children}</MainContentWrapper>
    </header>
  );
}
