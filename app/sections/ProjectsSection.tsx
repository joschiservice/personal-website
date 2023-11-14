import {Box, Container, Grid, Stack, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {OptionalLink} from "@/app/components/OptionalLink";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import {SkillChip} from "@/app/components/SkillChip";
import {getFormattedTimeSpan} from "@/app/lib/date";

interface Project {
  title: string;
  type: string;
  start: Date;
  end?: Date;
  skills: string[];
  link: string;
  description: string;
}

const PROJECTS: Project[] = [
  {
    title: "Sparky - Cloud Vehicle Management Platform for Kia & Hyundai EVs",
    type: "Software Development",
    start: new Date(2022, 10),
    skills: [
      "SwiftUI",
      "XCode",
      "Next.js",
      "Vercel"
    ],
    link: 'https://www.nextgendrive.net/products/sparky',
    description: "I, as a Kia e-Soul owner, found myself frustrated with the limited features in the official KiaConnect app. So I decided to start making my own native iOS app with various enhancements like support for the Siri voice assistant, home screen widgets, live activities, dark mode, enhanced drive data and support for more than 2 climate control schedules. The API was built using Next.js and was deployed on Vercel. The native iOS app was built using SwiftUI."
  },
  {
    title: "NG001 - My improved Kia e-Soul",
    type: "Software & Hardware Development",
    start: new Date(2023, 7),
    skills: [
      "Arduino",
      "C++",
      "CAD",
      "Electronics"
    ],
    link: 'https://www.nextgendrive.net/products/ng-one',
    description: "Besides building a new mobile companion app for my car, I started enhancing the overall in-car experience by installing a completely custom ambient lighting system with a seamless & smart integration. The ambient light system should be visible at sunny days, but shouldn't distract the driver at nights and in dark tunnels, therefore I integrated a Arduino microcontroller to adjust the lights based on the data from the vehicle."
  },
  {
    title: "ArcticWolf - Reviving old Fortnite builds & live-data logging",
    type: "Game Modification Development",
    start: new Date(2021, 11),
    end: new Date(2022, 5),
    skills: [
      "C++",
      "UnrealEngine",
      "C#"
    ],
    link: 'https://github.com/joschiservice/ArcticWolf',
    description: "When I was still an active Fortnite player, I wanted to dive into old versions/chapters of the game again. At that time, it was impossible, because that was not intended by the game developer. Therefore, I took an already existing mod and modified it to make it work for a specific build of the game and built a logger for live data about in-game events to detect interesting changes."
  }
]

export function ProjectsSection() {
  return (
    <Box py={8}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" mb={4} fontWeight={500}>
          Projects
        </Typography>

        <Grid container spacing={3} columns={8}>
          {PROJECTS.map((certificate, pos) => <ProjectItem key={pos} item={certificate} />)}
        </Grid>
      </Container>
    </Box>
  )
}

function ProjectItem({ item }: { item: Project }) {
  return (
    <>
      <Grid item xs={2}>
        <Typography color={grey[400]} mt={0.4} align="left">
          {getFormattedTimeSpan(item.start, item.end)}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Box display="flex" justifyItems="end">
          <OptionalLink href={item.link}>
            <Typography fontSize={19} fontWeight={400}>{item.title}{item.link && <ArrowOutwardIcon fontSize="small" style={{marginBottom: "-3px", marginLeft: "2px"}} />}</Typography>
          </OptionalLink>
        </Box>
        <Typography color={grey[500]} mb={1}>{item.type}</Typography>
        <Typography>{item.description}</Typography>
        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" useFlexGap>
          {item.skills.map((skill, pos) => <SkillChip key={pos} variant="project" skill={skill}/>)}
        </Stack>
      </Grid>
    </>
  )
}