"use client"

import Link from "next/link";
import {styled} from "@mui/material";
import {lightBlue} from "@mui/material/colors";

interface Props {
  href?: string;
  children: any;
}

const StyledLink = styled(Link)({
  color: "white",
  textDecoration: "none",
  transition: "color .3s ease-in-out",
  '&:hover': {
    color: lightBlue[400],
  },
});

export function OptionalLink({href, children}: Props) {
  if (href) {
    return <StyledLink href={href}>{children}</StyledLink>;
  }

  return children;
}