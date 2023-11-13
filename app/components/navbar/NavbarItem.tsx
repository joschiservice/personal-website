"use client"

import {styled, Typography} from "@mui/material";
import Link from "next/link";
import {lightBlue} from "@mui/material/colors";

interface Props {
  title: string;
  href: string;
}

const StyledLink = styled(Link)({
  color: "white",
  textDecoration: "none",
  transition: "color .3s ease-in-out",
  '&:hover': {
    color: lightBlue[400],
  },
});

export function NavbarItem({title, href}: Props) {
  return (
    <StyledLink href={href}>
      <Typography>{title}</Typography>
    </StyledLink>
  )
}