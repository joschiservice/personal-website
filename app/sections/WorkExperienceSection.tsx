"use client"

import {Box, Container, Grid, Stack, styled, Typography} from "@mui/material";
import dayjs from "dayjs";
import {blue, grey, lightGreen} from "@mui/material/colors";
import Link from "next/link";
import {SkillChip} from "@/app/components/SkillChip";
import {getFormattedTimeSpan} from "@/app/lib/date";

interface WorkExperience {
  start: Date;
  end: Date;
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
    start: new Date(2022, 4),
    end: new Date(2024, 0),
    position: 'Application Developer',
    subTitle: 'Apprenticeship',
    description: <>
      During this apprenticeship, I dealt with the following areas of responsibility:
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
      During this internship, I dealt with the following topics:
    </>,
    tasks: [
      'Development of microcontroller software',
      'Reading & processing sensor data'
    ],
    skills: [
      'Embedded Systems'
    ],
    companyLink: '',
    company: 'Senvion Germany'
  }
]

export function WorkExperienceSection() {
  return (
    <Box py={8}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" mb={4} fontWeight={500}>
          Professional Experience
        </Typography>

        <Grid container spacing={3} columns={8}>
          {WORK_EXPERIENCE_DATA.map(item => <WorkExperienceItem item={item} />)}
        </Grid>
      </Container>
    </Box>
  )
}

function WorkExperienceItem({item}: {item: WorkExperience}) {
  return (
    <>
      <Grid item xs={2}>
        <Typography color={grey[400]} mt={0.4} align="left">
          {getFormattedTimeSpan(item.start, item.end)}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography fontSize={19} fontWeight={400}>{item.position} @ {item.company}</Typography>
        <Typography color={grey[500]} mb={1}>{item.subTitle}</Typography>
        <Typography>{item.description}</Typography>
        <ul style={{ paddingLeft: 20, marginTop: 0, marginBottom: 0 }}>
          {item.tasks.map(task => <li><Typography>{task}</Typography></li>)}
        </ul>
        <Stack direction="row" spacing={0.8} mt={2}>
          {item.skills.map(skill => <SkillChip skill={skill}/>)}
        </Stack>
      </Grid>
    </>
  )
}