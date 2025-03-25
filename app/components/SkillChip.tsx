"use client"

import { useEffect, useState } from "react";

interface Props {
  skill: string;
  variant: "work" | "certificate" | "project"
}

export function SkillChip({ skill, variant }: Props) {
  // Colors for work is default
  const [bgColor, setBgColor] = useState("bg-[rgba(0,255,196,0.17)]");
  const [textColor, setTextColor] = useState("text-[rgb(113,255,213)]");

  useEffect(() => {
    switch (variant) {
      case "certificate":
        setBgColor("bg-[rgba(0,149,255,0.17)]");
        setTextColor("text-[rgb(0,208,255)]");
        break;

      case "project":
        setBgColor("bg-[rgba(202,56,243,0.17)]");
        setTextColor("text-[rgb(225,133,255)]");
        break;
    }
  }, [variant]);

  return (
    <div className={`rounded-[22px] px-[10px] py-[2px] ${bgColor}`}>
      <p className={`text-[14px] leading-[1.8] px-1 ${textColor}`}>{skill}</p>
    </div>
  )
}