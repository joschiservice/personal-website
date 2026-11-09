"use client";

import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { Container } from "@/app/components/system/Container";
import { SectionIntro } from "@/app/components/system/SectionIntro";
import {
  airports,
  flightRoutes,
  flightStats,
  MAP_HEIGHT,
  MAP_WIDTH,
  projectAirport,
  type AirportCode,
} from "@/app/data/flightRadarSection";
import type { Dictionary } from "@/app/i18n/getDictionary";
import { SpaceBackdrop } from "@/app/components/system/SpaceBackdrop";
import { ImpactValue } from "@/app/sections/timeline/ImpactValue";
import styles from "./FlightRadarSection.module.css";

/** Labelled airports, with the label above (negative) or below the dot, clear of its neighbours. */
const LABEL_OFFSETS: Partial<Record<AirportCode, number>> = { HAM: -12, NRT: 28, SIN: 26, AUH: 26 };
const ROUTE_STAGGER_MS = 34;

function buildRoutes() {
  return flightRoutes
    .map(([from, to, count]) => {
      const start = projectAirport(from);
      const end = projectAirport(to);
      const length = Math.hypot(end.x - start.x, end.y - start.y);
      const liftX = (start.x + end.x) / 2;
      const liftY = (start.y + end.y) / 2 - length * 0.2;

      return {
        id: `${from}-${to}`,
        from,
        to,
        count,
        length,
        path: `M${start.x.toFixed(1)} ${start.y.toFixed(1)}Q${liftX.toFixed(1)} ${liftY.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`,
      };
    })
    .sort((a, b) => a.length - b.length);
}

const routes = buildRoutes();

function countFlights(code: AirportCode) {
  return flightRoutes.reduce(
    (total, [from, to, count]) => (from === code || to === code ? total + count : total),
    0,
  );
}

export function FlightRadarSection({
  copy,
  newTabLabel,
}: {
  copy: Dictionary["flightRadar"];
  newTabLabel: string;
}) {
  const boardRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(boardRef, { once: true, amount: 0.25 });
  const [activeAirport, setActiveAirport] = useState<AirportCode | null>(null);
  const codes = Object.keys(airports) as AirportCode[];

  const headlineStats = [
    { label: copy.flightsLabel, value: flightStats.flights },
    { label: copy.distanceLabel, value: flightStats.distance },
    { label: copy.hoursLabel, value: flightStats.hours },
  ];
  const activeFlights = activeAirport ? countFlights(activeAirport) : 0;

  return (
    <section className={`editorial-section ${styles.section}`} aria-labelledby="travel-log-heading">
      <SpaceBackdrop variant="travel" />
      <Container>
        <SectionIntro
          label={copy.label}
          title={copy.title}
          description={copy.description}
          id="travel-log-heading"
          align="split"
        />

        <div
          ref={boardRef}
          className={`${styles.board} motion-section-content`}
          data-visible={isVisible}
        >
          <div className={styles.map} onPointerLeave={() => setActiveAirport(null)}>
            <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} role="img" aria-label={copy.mapLabel}>
              {routes.map((route, index) => (
                <path
                  key={route.id}
                  className={styles.route}
                  d={route.path}
                  pathLength={1}
                  data-state={
                    !activeAirport
                      ? undefined
                      : route.from === activeAirport || route.to === activeAirport
                        ? "active"
                        : "muted"
                  }
                  style={
                    {
                      "--route-weight": 1 + Math.log2(route.count) * 0.55,
                      "--route-delay": `${index * ROUTE_STAGGER_MS}ms`,
                    } as React.CSSProperties
                  }
                />
              ))}
              {codes.map((code) => {
                const { x, y } = projectAirport(code);
                const labelOffset = LABEL_OFFSETS[code];

                return (
                  <g key={code}>
                    <circle className={styles.airport} cx={x} cy={y} r={3.4} data-active={code === activeAirport} />
                    {labelOffset !== undefined && (
                      <text className={styles.airportLabel} x={x} y={y + labelOffset} textAnchor="middle">
                        {airports[code].city.replace(" Narita", "")}
                      </text>
                    )}
                    <circle
                      className={styles.airportTarget}
                      cx={x}
                      cy={y}
                      r={11}
                      onPointerEnter={() => setActiveAirport(code)}
                      onClick={() => setActiveAirport(code)}
                    />
                  </g>
                );
              })}
            </svg>
            <p className={styles.readout} data-visible={activeAirport !== null} aria-hidden="true">
              {activeAirport && (
                <>
                  <strong>{airports[activeAirport].city}</strong>
                  <span>
                    {activeAirport} · {activeFlights} {activeFlights === 1 ? copy.flightSingular : copy.flightPlural}
                  </span>
                </>
              )}
            </p>
          </div>

          <div className={styles.pass}>
            <div className={styles.passBody}>
              <header>
                <span>{copy.passLabel}</span>
                <span>
                  {flightStats.aroundTheEarth} {copy.aroundTheEarth}
                </span>
              </header>

              <dl className={styles.headline}>
                {headlineStats.map((stat, index) => (
                  <div key={stat.label}>
                    <dt>{stat.label}</dt>
                    <dd>
                      <ImpactValue
                        value={stat.value}
                        earlierValues={headlineStats.slice(0, index).map((earlier) => earlier.value)}
                      />
                    </dd>
                  </div>
                ))}
              </dl>

              <dl className={styles.details}>
                <div>
                  <dt>{copy.airportsLabel}</dt>
                  <dd>{flightStats.airports}</dd>
                </div>
                <div>
                  <dt>{copy.windowSeatsLabel}</dt>
                  <dd>{flightStats.windowSeats}</dd>
                </div>
                <div>
                  <dt>{copy.mostFlownLabel}</dt>
                  <dd>{flightStats.mostFlown}</dd>
                </div>
              </dl>
            </div>

            <a className={styles.stub} href={copy.href} target="_blank" rel="noopener noreferrer">
              <span className={styles.barcode} aria-hidden="true" />
              <span className={styles.stubAction}>
                {copy.action}
                <HiArrowUpRight aria-hidden="true" />
              </span>
              <span className="sr-only"> · {newTabLabel}</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
