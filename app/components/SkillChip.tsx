"use client"

import {Box, styled, Typography} from "@mui/material";
import {useEffect, useState} from "react";

const StyledChip = styled(Box)({
  borderRadius: "22px",
  padding: "2px 10px"
});

interface Props {
  skill: string;
  variant: "work" | "certificate" | "project"
}

export function SkillChip({ skill, variant }: Props) {
  // Colors for work is default
  const [bgColor, setBgColor] = useState("rgba(0,255,196,0.17)");
  const [textColor, setTextColor] = useState("rgb(113,255,213)");

  useEffect(() => {
    switch (variant) {
      case "certificate":
        setBgColor("rgba(0,149,255,0.17)");
        setTextColor("rgb(0,208,255)");
        break;

      case "project":
        setBgColor("rgba(202,56,243,0.17)");
        setTextColor("rgb(225,133,255)");
        break;
    }
  }, [variant]);

  return (
    <StyledChip style={{backgroundColor: bgColor}}>
      <Typography fontSize={14} color={textColor}>{skill}</Typography>
    </StyledChip>
  )
}