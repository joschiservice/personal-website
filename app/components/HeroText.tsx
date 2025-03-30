import React from "react";

interface Props {
  children: React.ReactNode;
}

export function HeroText({ children }: Props) {
  return (
    <h1 className="text-3xl md:text-4xl lg:text-[4rem] font-bold leading-tight lg:leading-[5rem] mb-4
      [text-shadow:0_0_15px_rgba(255,255,255,0.3)]">
      {children}
    </h1>
  );
}