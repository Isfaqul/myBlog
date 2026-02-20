import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { type MainProps } from "../types";
import MainContentWrapper from "./MainContentWrapper";
import type { ComponentPropsWithoutRef } from "react";

export default function Footer({ className }: MainProps) {
  const baseClasses = `bg-tGray-500 py-14 px-3 mt-auto`;

  return (
    <footer className={`${baseClasses} ${className ?? ""}`}>
      <MainContentWrapper>
        <div className="flex flex-wrap font-body gap-4 items-center justify-between">
          <FooterLinkText href="https://www.google.com" target="_blank">
            Contact
          </FooterLinkText>
          <div className="flex gap-4 justify-center">
            <FooterLinkIcon href="https://www.github.com" target="_blank">
              <FaGithub className="text-tGray-200" />
            </FooterLinkIcon>
            <FooterLinkIcon href="https://www.x.com" target="_blank">
              <FaTwitter className="text-tGray-200" />
            </FooterLinkIcon>
            <FooterLinkIcon href="https://www.instagram.com" target="_blank">
              <FaInstagram className="text-tGray-200" />
            </FooterLinkIcon>
          </div>
          <FooterLinkText href="https://www.google.com" target="_blank">
            Privacy
          </FooterLinkText>
        </div>
      </MainContentWrapper>
    </footer>
  );
}

function FooterLinkText({ children, href, target }: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      href={href}
      target={target}
      className="text-tGray-200 transition-all ease-out underline-offset-2 hover:underline"
    >
      {children}
    </a>
  );
}

function FooterLinkIcon({ children, href, target }: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      href={href}
      target={target}
      className="border border-tGray-300 bg-tGray-300 p-1.5 rounded-md transition-all ease-out hover:border-tGray-200/70"
    >
      {children}
    </a>
  );
}
