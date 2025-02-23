import {Box, Container, Grid2, Stack, Typography} from "@mui/material";
import Image from "next/image";

interface Tool {
  name: string;
  hideText?: boolean;
}

const TOOLS: Tool[] = [
  {
    name: "XCode",
  },
  {
    name: "VisualStudio"
  },
  {
    name: "WebStorm"
  },
  {
    name: "ChatGPT"
  },
  {
    name: "GitHub Copilot"
  },
  {
    name: "Material UI"
  },
  {
    name: "Next.js",
    hideText: true
  },
  {
    name: "React.js"
  },
  {
    name: "Sentry"
  },
  {
    name: "GitHub"
  },
  {
    name: "Vercel",
    hideText: true
  }
];

export function ToolsSection() {
  return (
    (<Box sx={{
      py: 8
    }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 4,
            fontWeight: 500
          }}>
          Tools, Frameworks & Services
        </Typography>

        <Grid2 container spacing={{ xs: 2, md: 4 }} columns={{ xs: 2, md: 4 }}>
          {TOOLS.map((tool, pos) => <ToolItem key={pos} item={tool}/>)}
        </Grid2>
      </Container>
    </Box>)
  );
}

function ToolItem({ item }: { item: Tool }) {
  return (
    (<Grid2 size={1}>
      <Stack direction="row" spacing={2} sx={{
        alignItems: "center"
      }}>
        <Image width={item.hideText ? 130 : 50} height={50} src={"/img/tools/" + item.name + ".png"} alt={item.name} style={{objectFit: "contain"}} />
        {!item.hideText && <Typography
          sx={{
            fontSize: 18,
            fontWeight: 500
          }}>{item.name}</Typography>}
      </Stack>
    </Grid2>)
  );
}