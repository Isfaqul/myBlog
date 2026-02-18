import type { ComponentPropsWithoutRef } from "react";
import Markdown from "react-markdown";
import Heading from "./Heading";
import { MdFormatQuote } from "react-icons/md";

// CustomComponents
const P = ({ children, ...props }: ComponentPropsWithoutRef<"p">) => {
  return (
    <p className="text-tGray-100 font-body text-xl font-light leading-8 py-3" {...props}>
      {children}
    </p>
  );
};

const H1 = ({ children, ...props }: ComponentPropsWithoutRef<"h1">) => {
  return (
    <Heading level={1} size="text-3xl" {...props}>
      {children}
    </Heading>
  );
};

const H2 = ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => {
  return (
    <Heading level={2} size="text-2xl" className="mt-8" {...props}>
      {children}
    </Heading>
  );
};

const H3 = ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => {
  return (
    <Heading level={3} size="text-xl" className="mt-8" {...props}>
      {children}
    </Heading>
  );
};

const H4 = ({ children, ...props }: ComponentPropsWithoutRef<"h4">) => {
  return (
    <Heading level={4} size="text-lg" className="mt-8" {...props}>
      {children}
    </Heading>
  );
};

const A = ({ children, href, ...props }: ComponentPropsWithoutRef<"a">) => {
  return (
    <a
      href={href}
      target="_blank"
      className="text-blue-500 transition-all ease-out duration-100 hover:text-blue-400 hover:underline underline-offset-4 active:text-blue-600"
      {...props}
    >
      {children}
    </a>
  );
};

const Em = ({ children, ...props }: ComponentPropsWithoutRef<"em">) => {
  return (
    <em className="italic" {...props}>
      {children}
    </em>
  );
};

const Bold = ({ children, ...props }: ComponentPropsWithoutRef<"strong">) => {
  return (
    <strong className="font-semibold" {...props}>
      {children}
    </strong>
  );
};

const Block = ({ children, ...props }: ComponentPropsWithoutRef<"blockquote">) => {
  return (
    <div className="bg-tGray-400 border border-tGray-300 pl-2 pr-4 py-2 rounded-lg my-4 flex gap-3">
      <MdFormatQuote className="text-tGray-200/70 text-4xl" />
      <blockquote className="italic" {...props}>
        {children}
      </blockquote>
    </div>
  );
};

const UL = ({ children, ...props }: ComponentPropsWithoutRef<"ul">) => {
  return (
    <ul className="text-tGray-100 font-body space-y-2 list-disc" {...props}>
      {children}
    </ul>
  );
};

const OL = ({ children, ...props }: ComponentPropsWithoutRef<"ol">) => {
  return (
    <ol className="text-tGray-100 font-body space-y-2 list-decimal" {...props}>
      {children}
    </ol>
  );
};

const LI = ({ children, ...props }: ComponentPropsWithoutRef<"li">) => {
  return (
    <li className="list-inside" {...props}>
      {children}
    </li>
  );
};

const Code = ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
  return (
    <div className="bg-tGray-400 border border-tGray-300 rounded-lg my-4 px-5 py-4">
      <div className="flex gap-2 mb-5">
        <div className="size-3 bg-[#ff595b] rounded-full"></div>
        <div className="size-3 bg-[#febc3c] rounded-full"></div>
        <div className="size-3 bg-[#0fcb42] rounded-full"></div>
      </div>
      <code className="text-blue-400 leading-8 font-code whitespace-pre-wrap" {...props}>
        {children}
      </code>
    </div>
  );
};

function MarkDown({ children }: { children: string }) {
  return (
    <Markdown
      components={{
        p: P,
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        a: A,
        ul: UL,
        ol: OL,
        li: LI,
        code: Code,
        em: Em,
        strong: Bold,
        blockquote: Block,
      }}
    >
      {children}
    </Markdown>
  );
}

export default MarkDown;
