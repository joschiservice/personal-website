import {Typography} from "@mui/material";
import {CSSProperties} from "react";

interface Props {
  children: any;
}

export function HeroText({ children }: Props) {
  return (
    <Typography variant="hero" mb={2}>
      { children }
    </Typography>
  )
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    hero: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    hero?: CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    hero: true;
  }
}