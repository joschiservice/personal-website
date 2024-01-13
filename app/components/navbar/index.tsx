"use client"

import { Box, Stack, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { NavbarItem } from "@/app/components/navbar/NavbarItem";
import { MobileNavbar } from "./MobileNavbarMenu";

interface Props {
  items: [];
}

const NavbarBox = styled(Box)({
  backdropFilter: "saturate(180%) blur(16px)",
  background: 'rgba(33,33,33,0.6)',
  boxShadow: '0px 0px 30px 2px rgba(0,0,0,0.6)'
});

const ITEMS = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/#about-me' },
  { title: 'Experience', href: '/#experience' },
  { title: 'Projects', href: '/#projects' },
  { title: 'Imprint', href: '/imprint' }
]

export function Navbar() {
  const theme = useTheme();

  return (
    <Box position="fixed" display="flex" width="100vw" zIndex={100}>
      <NavbarBox minHeight={20} mx="auto" my={2} display="flex" sx={{
        justifyContent: 'space-between', minWidth: '90%', [theme.breakpoints.up('md')]: {
          minWidth: 800
        },
      }} borderRadius={6} py={0.7} px={2}>
        <Typography fontSize={22} fontWeight={800}>JH</Typography>
        <MobileNavbar items={ITEMS} />
        <DesktopNavbar />
      </NavbarBox>
    </Box>
  )
}

function DesktopNavbar() {
  const theme = useTheme();

  return (
    <Box sx={{
      display: "flex",
      justifyContent: 'space-between',
      width: "100%",
      [theme.breakpoints.down('md')]: {
        display: 'none'
      },
    }}>
      <Box />
      <Stack direction="row" alignItems="center" spacing={4}>
        {ITEMS.map((item, index) => <NavbarItem key={index} title={item.title} href={item.href} />)}
      </Stack>
      <Box />
    </Box>
  )
}