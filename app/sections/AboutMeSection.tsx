import {Box, Container, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {TextLink} from "@/app/components/TextLink";

export function AboutMeSection() {
  return (
    <Box py={8} id="about-me" style={{background: 'linear-gradient(180deg, rgba(18,18,18,1) 0%, rgba(8,34,43,1) 50%, rgba(18,18,18,1) 100%)'}}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" mb={3} fontWeight={500}>
          About Me
        </Typography>
        <Typography color={grey[400]}>
          Back in the days when I was 15 years old and still went to school, I was already very passionate about software engineering. As one of my favorite tools for creating virtual trucking companies with others for the game Euro Truck Simulator 2 decided to shut down its operations,
          I decided to build a replacement application for everyone who still wants to continue using such a tool.
          <br/><br/>
          Currently, I am primarily working on full-stack web, iOS and C# WPF applications. In my free time, I sometimes work on small casual projects, but primarily on <TextLink href="https://www.nextgendrive.net/products/sparky" text="Sparky" />, a companion mobile app for Kia & Hyundai drivers.
          <br/><br/>
          When I&apos;m not at the computer, I&apos;m usually checking out electric vehicle events, working on my own electric vehicle (a <TextLink text="Kia e-Soul SK3" href="https://www.nextgendrive.net/products/ng-one"/>, hanging out with friends, or playing around in virtual reality.
        </Typography>
      </Container>
    </Box>
  )
}