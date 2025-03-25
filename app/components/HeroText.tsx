import React from "react";

interface Props {
  children: React.ReactNode;
}

export function HeroText({ children }: Props) {
  return (
    <h1 className="text-[4rem] font-bold leading-[5rem] mb-4 ">
      {children}
    </h1>
  );
}