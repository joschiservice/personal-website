"use client"

import {Box, Container, Grid, Stack, Typography, useTheme} from "@mui/material";
import {grey} from "@mui/material/colors";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import {OptionalLink} from "@/app/components/OptionalLink";
import {SkillChip} from "@/app/components/SkillChip";
import {getFormattedTimeSpan} from "@/app/lib/date";

interface Certificate {
  date: Date;
  name: string;
  skills: string[];
  type: string;
  link?: string;
}

const CERTIFICATES: Certificate[] = [
  {
    date: new Date(2023, 4),
    name: 'IBM Full Stack Software Developer Specialization',
    skills: [
      "Full-Stack Development",
      "Cloud Computing",
      "Serverless Computing",
      "CI/CD",
      "Microservices",
      "React.js",
      "Python",
      "Django",
      "GitHub",
      "Docker",
      "Kubernetes",
      "Databases"
    ],
    type: "Professional Certificate",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/9X2DHARTH6D2"
  }
]

export function CertificatesSection() {
  return (
    <Box py={8}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" mb={4} fontWeight={500}>
          Certificates
        </Typography>

        <Grid container spacing={3} columns={8}>
          {CERTIFICATES.map((certificate, pos) => <CertificateItem key={pos} item={certificate} />)}
        </Grid>
      </Container>
    </Box>
  )
}

function CertificateItem({item}: { item: Certificate }) {
  const theme = useTheme();
  
  return (
    <>
      <Grid item xs={false} sm={2} sx={{
        [theme.breakpoints.down('sm')]: {
          display: 'none'
        },
      }}>
        <Typography color={grey[400]} mt={0.4} align="left">
          {getFormattedTimeSpan(item.date, item.date)}
        </Typography>
      </Grid>
      <Grid item xs={10} sm={6}>
        <Box display="flex" justifyItems="end">
          <OptionalLink href={item.link}>
            <Typography fontSize={19} fontWeight={500}>{item.name}{item.link && <ArrowOutwardIcon fontSize="small" style={{marginBottom: "-3px", marginLeft: "2px"}} />}</Typography>
          </OptionalLink>
        </Box>
        <Typography color={grey[500]} mb={1} sx={{
          [theme.breakpoints.down('sm')]: {
            display: 'none'
          },
        }}>
          {item.type}
        </Typography>
        <Typography color={grey[500]} mb={1} sx={{
          [theme.breakpoints.up('sm')]: {
            display: 'none'
          },
        }}>
          {item.type} — <span style={{whiteSpace: 'nowrap'}}>{getFormattedTimeSpan(item.date, item.date)}</span>
        </Typography>
        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" useFlexGap>
          {item.skills.map((skill, pos) => <SkillChip key={pos} variant="certificate" skill={skill}/>)}
        </Stack>
      </Grid>
    </>
  )
}