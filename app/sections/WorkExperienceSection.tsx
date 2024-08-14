"use client"

import { Box, Container, Grid, Stack, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SkillChip } from "@/app/components/SkillChip";
import { getFormattedTimeSpan } from "@/app/lib/date";

interface WorkExperience {
  start: Date;
  end?: Date;
  position: string;
  subTitle: string;
  description: JSX.Element;
  tasks: string[];
  skills: string[];
  companyLink: string;
  company: string;
}

const WORK_EXPERIENCE_DATA: WorkExperience[] = [
  {
    start: new Date(2024, 1, 0),
    position: 'Full-Stack Developer',
    subTitle: 'Full-Time',
    description: <>
      During my full-time position, I am entrusted with the following:
    </>,
    tasks: [
      'Oversseing an internal business-critical web application and two customer-facing websites',
      'Implementing data exchange using REST APIs and FTP services',
      'Introducing, designing and improving front-end and back-end features',
      'Refactoring the existing codebase',
      'Managing and enhancing CI/CD pipelines'
    ],
    skills: [
      'React (TypeScript)',
      'Shopify & Shopify Hydrogen',
      'PHP (Laravel & Vue.js)',
      'Docker',
      'TailwindCSS'
    ],
    companyLink: '',
    company: 'Elektrohub'
  },
  {
    start: new Date(2022, 4),
    end: new Date(2024, 0),
    position: 'Application Developer',
    subTitle: 'Apprenticeship',
    description: <>
      During my apprenticeship, I undertook the following responsibilities:
    </>,
    tasks: [
      'Creation of several desktop applications (text editor with IntelliSense features, calculator, demo app of a web content renderer with additional optimizations)',
      'Complete revision of the user interface and logic of certain program areas',
      'Performance optimization for database queries',
      'Maintenance of the software'
    ],
    skills: [
      'C#',
      'WPF',
      '.NET'
    ],
    companyLink: '',
    company: 'Nistech'
  },
  {
    start: new Date(2019, 2),
    end: new Date(2019, 2),
    position: 'Embedded Software Developer',
    subTitle: 'Internship',
    description: <>
      During my internship, I focused on the following:
    </>,
    tasks: [
      'Development of microcontroller software',
      'Reading & processing real-time sensor data'
    ],
    skills: [
      'Embedded Systems'
    ],
    companyLink: '',
    company: 'Siemens Gamesa Renewable Energy, S.A.U'
  }
]

export function WorkExperienceSection() {
  return (
    <Box py={8} id="experience">
      <Container maxWidth="md">
        <Typography variant="h4" align="center" mb={4} fontWeight={500}>
          Professional Experience
        </Typography>

        <Grid container spacing={3} columns={8}>
          {WORK_EXPERIENCE_DATA.map((item, pos) => <WorkExperienceItem key={pos} item={item} />)}
        </Grid>
      </Container>
    </Box>
  )
}

function WorkExperienceItem({ item }: { item: WorkExperience }) {
  const theme = useTheme();

  return (
    <>
      <Grid item xs={false} sm={2} sx={{
        [theme.breakpoints.down('sm')]: {
          display: 'none'
        },
      }}>
        <Typography color={grey[400]} mt={0.4} align="left">
          {getFormattedTimeSpan(item.start, item.end)}
        </Typography>
      </Grid>
      <Grid item xs={10} sm={6}>
        <Typography fontSize={19} fontWeight={500}>{item.position} @ {item.company}</Typography>
        <Typography color={grey[500]} mb={1} sx={{
          [theme.breakpoints.down('sm')]: {
            display: 'none'
          },
        }}>
          {item.subTitle}
        </Typography>
        <Typography color={grey[500]} mb={1} sx={{
          [theme.breakpoints.up('sm')]: {
            display: 'none'
          },
        }}>
          {item.subTitle} — <span style={{ whiteSpace: 'nowrap' }}>{getFormattedTimeSpan(item.start, item.end)}</span>
        </Typography>
        <Typography>{item.description}</Typography>
        <ul style={{ paddingLeft: 20, marginTop: 0, marginBottom: 0 }}>
          {item.tasks.map((task, pos) => <li key={pos}><Typography>{task}</Typography></li>)}
        </ul>
        <Stack direction="row" spacing={0.8} mt={2} flexWrap="wrap" useFlexGap>
          {item.skills.map((skill, pos) => <SkillChip key={pos} variant="work" skill={skill} />)}
        </Stack>
      </Grid>
    </>
  )
}
