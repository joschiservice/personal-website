import {Box, Container, Grid, Typography} from "@mui/material";

interface Tool {
  name: string;
}

const TOOLS: Tool[] = [

];

export function ToolsSection() {
  return (
    <Box py={8}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" mb={4} fontWeight={500}>
          Tools
        </Typography>

        <Grid container spacing={3} columns={8}>
        </Grid>
      </Container>
    </Box>
  )
}

function ToolItem({ item }: { item: Tool }) {
  return (
    <>
      terst
    </>
  )
}