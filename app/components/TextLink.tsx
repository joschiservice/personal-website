"use client"

import Link from "next/link";
import {styled} from "@mui/material";
import {blue, lightBlue} from "@mui/material/colors";

interface Props {
  text: string;
  href: string;
}

const TextLinkButtonLink = styled(Link)({
  color: "white",
  textDecoration: "none",
  transition: "color .3s ease-in-out",
  '&:hover': {
    color: lightBlue[400],
  },
});

export function TextLink({ text, href }: Props) {
  return (
    <TextLinkButtonLink href={href}>
      {text}
    </TextLinkButtonLink>
  )
}