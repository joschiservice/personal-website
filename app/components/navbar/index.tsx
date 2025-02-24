"use client"

import { Box, Stack, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { NavbarItem } from "@/app/components/navbar/NavbarItem";
import { MobileNavbar, MobileNavbarButton } from "./MobileNavbarMenu";
import Link from "next/link";
import { lightBlue } from "@mui/material/colors";
import { useState } from "react";

interface Props {
  items: [];
}

const ITEMS = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/#about-me' },
  { title: 'Experience', href: '/#experience' },
  { title: 'Projects', href: '/#projects' },
  { title: 'Imprint', href: '/imprint' }
];

export function Navbar() {
  const theme = useTheme();
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);

  return (
    (<Box
      sx={{
        position: "fixed",
        display: "flex",
        width: "100vw",
        zIndex: 100
      }}>
      <NavbarBox minHeight={20} mx="auto" my={2} display="flex" sx={{
        justifyContent: 'space-between', minWidth: '90%', [theme.breakpoints.up('md')]: {
          minWidth: 800
        },
      }} borderRadius={6} py={0.7} px={2}>
        <NavbarTitle href="/">JH</NavbarTitle>
        <MobileNavbarButton isOpen={isMobileNavbarOpen} setIsOpen={setIsMobileNavbarOpen} />
        <DesktopNavbar />
      </NavbarBox>
      <MobileNavbar items={ITEMS} isOpen={isMobileNavbarOpen} setIsOpen={setIsMobileNavbarOpen} />
    </Box>)
  );
}

function DesktopNavbar() {
  const theme = useTheme();

  return (
    (<Box sx={{
      display: "flex",
      justifyContent: 'space-between',
      width: "100%",
      [theme.breakpoints.down('md')]: {
        display: 'none'
      },
    }}>
      <Box />
      <Stack direction="row" spacing={4} sx={{
        alignItems: "center"
      }}>
        {ITEMS.map((item, index) => <NavbarItem key={index} title={item.title} href={item.href} />)}
      </Stack>
      <Box />
    </Box>)
  );
}

const NavbarBox = styled(Box)({
  backdropFilter: "saturate(180%) blur(16px)",
  background: 'rgba(33,33,33,0.6)',
  boxShadow: '0px 0px 24px 0px rgba(0,0,0,0.4)'
});

const NavbarTitle = styled(Link)({
  fontSize: 22,
  fontWeight: 700,
  color: "white",
  textDecoration: "none",
  transition: "color .3s ease-in-out",
  '&:hover': {
    color: lightBlue[400],
  },
});