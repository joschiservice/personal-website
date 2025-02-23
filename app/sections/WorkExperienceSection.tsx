"use client"

import { Box, Container, Grid2, Stack, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SkillChip } from "@/app/components/SkillChip";
import { getFormattedTimeSpan } from "@/app/lib/date";
import { OptionalLink } from "../components/OptionalLink";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { ReactElement } from "react";

interface WorkExperience {
  start: Date;
  end?: Date;
  position: string;
  subTitle: string;
  description: ReactElement;
  tasks: string[];
  skills: string[];
  companyLink: string;
  company: string;
}

const WORK_EXPERIENCE_DATA: WorkExperience[] = [
  {
    start: new Date(2024, 1, 0),
    position: 'Lead Full-Stack Engineer',
    subTitle: 'Full-Time',
    description: <>
      In my full-time role, I am responsible for leading and delivering high-impact projects, developing scalable applications,
      optimizing workflows, and leveraging emerging technologies to drive business success.
    </>,
    tasks: [
      'Led development of a mission-critical internal web app, ensuring scalability, security, and reliability',
      'Built and maintained a customer-facing website to streamline car accessory purchases, boosting engagement and sales',
      'Developing a modular e-commerce management platform, empowering businesses to manage catalogs, orders, and interactions efficiently',
      'Launched a generative AI tool on the Shopify App Store, helping merchants in creating blog content and enhance digital marketing',
      'Integrated data systems via REST APIs and FTP services, improving interoperability and data-driven decision-making',
      'Enhanced front-end and back-end features across multiple frameworks, optimizing performance and user experience',
      'Refactored legacy codebases for better maintainability, performance, and scalability',
      'Optimized CI/CD pipelines, accelerating release cycles and improving deployment efficiency'
    ],
    skills: [
      'React (Next.js)',
      'Node.js (Nest.js)',
      'Vue.js',
      'TypeScript',
      'Shopify & Shopify Hydrogen',
      'PHP (Laravel)',
      'Docker',
      'TailwindCSS',
    ],
    companyLink: 'https://www.elektrohub.de',
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
    companyLink: 'https://www.nistech.de',
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
    companyLink: 'https://www.siemensgamesa.com/global/en/home.html',
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

        <Grid2 container spacing={3} columns={8}>
          {WORK_EXPERIENCE_DATA.map((item, pos) => <WorkExperienceItem key={pos} item={item} />)}
        </Grid2>
      </Container>
    </Box>
  )
}

function WorkExperienceItem({ item }: { item: WorkExperience }) {
  const theme = useTheme();

  return (<>
    <Grid2
      sx={{
        [theme.breakpoints.down('sm')]: {
          display: 'none'
        },
      }}
      size={{
        xs: false,
        sm: 2
      }}>
      <Typography color={grey[400]} mt={0.4} align="left">
        {getFormattedTimeSpan(item.start, item.end)}
      </Typography>
    </Grid2>
    <Grid2
      size={{
        xs: 10,
        sm: 6
      }}>
      <OptionalLink href={item.companyLink}>
        <Typography fontSize={19} fontWeight={500}>{item.position} @ {item.company}{item.companyLink && <ArrowOutwardIcon fontSize="small" style={{marginBottom: "-3px", marginLeft: "2px"}} />}</Typography>
      </OptionalLink>
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
    </Grid2>
  </>);
}
