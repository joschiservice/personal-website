export const flightRadarSectionContent = {
  title: "Window seat, please.",
  description:
    "I log every flight, and I’ll pick the window whenever I can. My favorite is the A350, and when I’m grounded, there’s Microsoft Flight Simulator.",
  href: "https://my.flightradar24.com/joschi_service",
} as const;

/** Updated by hand from the myFlightradar24 export, along with flightRoutes below. */
export const flightStats = {
  flights: "79",
  distance: "187,000 km",
  hours: "292 h",
  airports: "28",
  windowSeats: "52 / 79",
  mostFlown: "HAM → MUC",
  aroundTheEarth: "4.7×",
} as const;

interface Airport {
  city: string;
  lat: number;
  lon: number;
}

export const airports = {
  ARN: { city: "Stockholm", lat: 59.65, lon: 17.92 },
  AUH: { city: "Abu Dhabi", lat: 24.43, lon: 54.65 },
  BCN: { city: "Barcelona", lat: 41.3, lon: 2.08 },
  BRU: { city: "Brussels", lat: 50.9, lon: 4.48 },
  CDG: { city: "Paris", lat: 49.01, lon: 2.55 },
  DOH: { city: "Doha", lat: 25.27, lon: 51.61 },
  DUB: { city: "Dublin", lat: 53.42, lon: -6.27 },
  FRA: { city: "Frankfurt", lat: 50.03, lon: 8.57 },
  HAM: { city: "Hamburg", lat: 53.63, lon: 9.99 },
  HEL: { city: "Helsinki", lat: 60.32, lon: 24.96 },
  HIJ: { city: "Hiroshima", lat: 34.44, lon: 132.92 },
  HND: { city: "Tokyo Haneda", lat: 35.55, lon: 139.78 },
  HRG: { city: "Hurghada", lat: 27.18, lon: 33.8 },
  ICN: { city: "Seoul", lat: 37.46, lon: 126.44 },
  ITM: { city: "Osaka Itami", lat: 34.79, lon: 135.44 },
  KIX: { city: "Osaka Kansai", lat: 34.43, lon: 135.24 },
  KMI: { city: "Miyazaki", lat: 31.88, lon: 131.45 },
  LHR: { city: "London", lat: 51.47, lon: -0.45 },
  MUC: { city: "Munich", lat: 48.35, lon: 11.79 },
  NRT: { city: "Tokyo Narita", lat: 35.77, lon: 140.39 },
  PRG: { city: "Prague", lat: 50.1, lon: 14.26 },
  PVG: { city: "Shanghai", lat: 31.14, lon: 121.81 },
  SDJ: { city: "Sendai", lat: 38.14, lon: 140.92 },
  SIN: { city: "Singapore", lat: 1.36, lon: 103.99 },
  TLS: { city: "Toulouse", lat: 43.63, lon: 1.37 },
  TPE: { city: "Taipei", lat: 25.08, lon: 121.23 },
  VIE: { city: "Vienna", lat: 48.11, lon: 16.57 },
  ZRH: { city: "Zurich", lat: 47.46, lon: 8.55 },
} as const satisfies Record<string, Airport>;

export type AirportCode = keyof typeof airports;

/** Each route once, in either direction, with how many times it was flown. */
export const flightRoutes: readonly (readonly [AirportCode, AirportCode, number])[] = [
  ["HAM", "MUC", 12],
  ["FRA", "HAM", 7],
  ["HAM", "ZRH", 5],
  ["BRU", "HAM", 4],
  ["CDG", "HAM", 3],
  ["HND", "MUC", 3],
  ["AUH", "BRU", 2],
  ["AUH", "NRT", 2],
  ["KMI", "NRT", 2],
  ["PVG", "TPE", 2],
  ["NRT", "TPE", 2],
  ["BRU", "LHR", 2],
  ["BCN", "MUC", 2],
  ["CDG", "HND", 2],
  ["KIX", "NRT", 2],
  ["HRG", "ZRH", 2],
  ["ICN", "NRT", 2],
  ["CDG", "NRT", 1],
  ["DOH", "NRT", 1],
  ["DOH", "HAM", 1],
  ["MUC", "TLS", 1],
  ["FRA", "TLS", 1],
  ["FRA", "PVG", 1],
  ["MUC", "PVG", 1],
  ["DUB", "MUC", 1],
  ["DUB", "ZRH", 1],
  ["FRA", "MUC", 1],
  ["CDG", "MUC", 1],
  ["CDG", "FRA", 1],
  ["PRG", "ZRH", 1],
  ["PRG", "VIE", 1],
  ["HAM", "VIE", 1],
  ["ARN", "FRA", 1],
  ["ARN", "MUC", 1],
  ["HEL", "MUC", 1],
  ["FRA", "HEL", 1],
  ["SIN", "ZRH", 1],
  ["MUC", "SIN", 1],
  ["ITM", "SDJ", 1],
  ["HIJ", "HND", 1],
];

// Matches the projection public/img/flight-map-land.svg was generated with.
const MAP_WEST = -14;
const MAP_NORTH = 66;
const MAP_LON_SCALE = 0.82;
const MAP_SCALE = 1000 / (164 * MAP_LON_SCALE);

export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 535;

export function projectAirport(code: AirportCode) {
  const { lat, lon } = airports[code];

  return {
    x: (lon - MAP_WEST) * MAP_LON_SCALE * MAP_SCALE,
    y: (MAP_NORTH - lat) * MAP_SCALE,
  };
}
