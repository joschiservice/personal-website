import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack, styled, useTheme } from '@mui/material';
import { useState } from 'react';
import { NavbarItem } from './NavbarItem';

interface Props {
    items: { title: string; href: string; }[]
}

const MenuPopup = styled(Box)({
    position: 'fixed',
    top: 0,
    right: 0,
    width: '100vw',
    height: '100vh',

    backdropFilter: "saturate(180%) blur(16px)",
    background: 'rgba(33,33,33,0.6)',

    transition: 'ease-in-out',
    transitionProperty: 'opacity',
    transitionDuration: '250ms',
});

export function MobileNavbar({ items }: Props) {
    const theme = useTheme();

    const [isOpen, setIsOpen] = useState(false);

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

            <MenuPopup sx={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }} p={4}>
                <Box display='flex' justifyContent='end'>
                    <CloseIcon onClick={toggleNavbar} />
                </Box>
                <Stack spacing={2} mt={4}>
                    {items.map((item, index) => <NavbarItem key={index} title={item.title} href={item.href} isMobile={true} onClick={toggleNavbar} />)}
                </Stack>
            </MenuPopup>
        </Box>
    )
}