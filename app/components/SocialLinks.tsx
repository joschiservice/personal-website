import { Stack, SvgIcon, styled } from "@mui/material";
import Link from "next/link";
import { grey, lightBlue } from "@mui/material/colors";

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

type SocialLink = { icon: any; href: string; };

export function SocialLinks() {
    return (
        <Stack direction="row" spacing={1}>
            <SocialLink href={process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN} icon={LinkedInIcon} />
            <SocialLink href={process.env.NEXT_PUBLIC_SOCIAL_GITHUB} icon={GitHubIcon} />
            <SocialLink href={process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM} icon={InstagramIcon} />
        </Stack>
    )
}

const StyledLink = styled(Link)({
    display: 'flex',
    color: grey[400],
    textDecoration: "none",
    transition: "color .3s ease-in-out",
    '&:hover': {
      color: lightBlue[400],
    }
  });

interface SocialLinkProps {
    href: string | undefined;
    icon: typeof SvgIcon;
}

function SocialLink({ href, icon }: SocialLinkProps) {
    const SpecificIcon = icon;

    if (href === undefined) return;

    return (
        <StyledLink href={href}><SpecificIcon sx={{fontSize: 28}} /></StyledLink>
    )
}