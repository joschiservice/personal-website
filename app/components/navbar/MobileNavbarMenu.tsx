import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack, styled, useTheme } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { NavbarItem } from './NavbarItem';

interface Props extends MobileNavBtnProps {
    items: { title: string; href: string; }[];
}

const MenuPopup = styled(Box)({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',

    backdropFilter: "saturate(180%) blur(16px)",
    background: 'rgba(33,33,33,0.6)',

    transition: 'ease-in-out',
    transitionProperty: 'opacity',
    transitionDuration: '250ms',
});

interface MobileNavBtnProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function MobileNavbarButton({ isOpen, setIsOpen }: MobileNavBtnProps) {
    const theme = useTheme();

    function toggleNavbar() {
        setIsOpen(!isOpen);

        // Prevent body scroll, when menu is open
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
        document.body.style.position = isOpen ? 'absolute' : 'fixed';
    }

    return (
        <Box sx={{
            height: '100%', display: 'none', alignItems: 'center',
            [theme.breakpoints.down('md')]: {
                display: 'flex'
            },
        }}>
            <MenuIcon onClick={toggleNavbar} />
        </Box>
    )
}

export function MobileNavbar({ items, isOpen, setIsOpen }: Props) {
    function toggleNavbar() {
        setIsOpen(!isOpen);

        // Prevent body scroll, when menu is open
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
        document.body.style.position = isOpen ? 'absolute' : 'fixed';
    }

    return (
        (<MenuPopup sx={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }} p={4}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'end'
                }}>
                <CloseIcon onClick={toggleNavbar} />
            </Box>
            <Stack spacing={2} sx={{
                mt: 4
            }}>
                {items.map((item, index) => <NavbarItem key={index} title={item.title} href={item.href} isMobile={true} onClick={toggleNavbar} />)}
            </Stack>
        </MenuPopup>)
    );
}