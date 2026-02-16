import { type MainProps } from "../types";
import MainContentWrapper from "./MainContentWrapper";

export default function Main({ children, className }: MainProps) {
  const baseClasses = `bg-tGray-500 flex-1 pt-14`;

  return (
    <main className={`${baseClasses} ${className ?? ""}`}>
      <MainContentWrapper>{children}</MainContentWrapper>
    </main>
  );
}
