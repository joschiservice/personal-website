import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export function FlightRadarSection() {
  return (
    (<Box sx={{
      py: 8
    }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 1,
            fontWeight: 500
          }}>
          FlightRadar24 Flights Summary
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{
            mb: 3,
            color: "text.secondary"
          }}>
          I have a deep passion for flying and exploring the world. Through my travels, I&apos;ve had the opportunity to experience different cultures, meet amazing people, and create unforgettable memories. Here&apos;s a summary of my flight journeys:
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Link
            href="https://my.flightradar24.com/joschi_service"
            style={{ display: 'block', width: '100%', maxWidth: 400 }}
          >
            <Image
              src="https://banners-my.flightradar24.com/joschi_service.png"
              alt="FlightRadar24 Flights Summary"
              width={400}
              height={100}
              style={{ 
                width: "100%", 
                height: "auto",
                filter: "invert(1) hue-rotate(180deg)"
              }}
            />
          </Link>
        </Box>
      </Container>
    </Box>)
  );
}
