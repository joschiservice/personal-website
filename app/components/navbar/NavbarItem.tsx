"use client"

import {styled, Typography} from "@mui/material";
import Link from "next/link";
import {lightBlue} from "@mui/material/colors";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Link as ScrollLink } from 'react-scroll';

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

const StyledScrollLink = styled(ScrollLink)({
  color: "white",
  textDecoration: "none",
  transition: "color .3s ease-in-out",

  // ScrollLink is not a href, so we need to apply these styles
  cursor: 'pointer',
  userSelect: 'none',

  '&:hover': {
    color: lightBlue[400],
  },
});

export function NavbarItem({title, href}: Props) {
  const currentPathName = usePathname();

  const [currentLinkType, setCurrentLinkType] = useState(0); // 0 = default href link, 1 = smooth scroll link
  const [targetElement, setTargetElement] = useState('');

  useEffect(() => {
    const [pathName, elementName] = href.split('#');

    // Is current page?
    if (pathName == currentPathName && elementName != undefined) {
      setTargetElement(elementName);
      setCurrentLinkType(1);
    } else {
      setCurrentLinkType(0);
    }
  }, [currentPathName, href]);

  return (
    currentLinkType == 1 ? (
      <StyledScrollLink to={targetElement} smooth={true}>
        <Typography>{title}</Typography>
      </StyledScrollLink>
    ) : (
      <StyledLink href={href}>
      <Typography>{title}</Typography>
    </StyledLink>
    )
  )
}