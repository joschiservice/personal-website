"use client"

import { blue, grey } from "@mui/material/colors";
import { HeroText } from "@/app/components/HeroText";
import { ColorGlowTransitionAnimation } from "@/app/animations/ColorGlowTransitionAnimation";
import { Box, Container, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CSSProperties } from "react";
import { ContactButton } from "@/app/components/buttons/ContactButton";
import { DownloadCvButton } from "@/app/components/buttons/DownloadCvButton";
import { ScrollDownButton } from "@/app/components/buttons/ScrollDownButton";
import { SocialLinks } from "../components/SocialLinks";

export function HomePageHeroSection() {
  const theme = useTheme();

  return (
    (<Container id="root" maxWidth="lg">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center"
        }}>
        <Box>
          <HeroText>
            Hi<span style={{ color: grey[500] }}>,</span><br />I am <ColorGlowTransitionAnimation fromColor="white" toColor={blue[500]} toColorGlow={blue[700]}>Joschua Haß</ColorGlowTransitionAnimation>
          </HeroText>
          <Typography
            variant="heroSubText"
            sx={{
              maxWidth: 560,
              marginBottom: 4,

              [theme.breakpoints.down('sm')]: {
                marginBottom: 2
              }
            }}>
            Full-stack developer specializing in the development of web and desktop applications with 4 years of experience (3 years in a professional setting).
          </Typography>
          <Stack direction="row" spacing={2} sx={{
            marginBottom: 4
            }}>
            <ContactButton />
            <DownloadCvButton />
          </Stack>

          <SocialLinks />

          <ScrollDownButton scrollToId="about-me" />
        </Box>
      </Box>
    </Container>)
  );
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    heroSubText: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    heroSubText?: CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    heroSubText: true;
  }
}