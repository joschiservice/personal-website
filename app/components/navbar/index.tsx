"use client"

import {Box, Stack, styled, Typography} from "@mui/material";
import {NavbarItem} from "@/app/components/navbar/NavbarItem";

interface Props {

}

const NavbarBox = styled(Box)({
  backdropFilter: "saturate(180%) blur(16px)",
  background: 'rgba(33,33,33,0.6)',
  boxShadow: '0px 0px 30px 2px rgba(0,0,0,0.6)'
});

export function Navbar({}: Props) {
  return (
    <Box position="fixed" display="flex"  width="100vw" zIndex={100}>
      <NavbarBox minWidth={800} minHeight={20} mx="auto" my={2} display="flex" sx={{ justifyContent: 'space-between' }} borderRadius={6} py={0.7} px={2}>
        <Typography fontSize={22} fontWeight={800}>JH</Typography>
        <Stack direction="row" alignItems="center" spacing={4}>
          <NavbarItem title="Home" href="/" />
          <NavbarItem title="About" href="/#about-me" />
          <NavbarItem title="Experience" href="/#experience" />
          <NavbarItem title="Projects" href="/#projects" />
          <NavbarItem title="Imprint" href="/imprint" />
        </Stack>
        <Box />
      </NavbarBox>
    </Box>
  )
}