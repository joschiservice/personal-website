"use client";

import { SectionHeading } from "@/app/components/SectionHeading";
import { GlassCard } from "../components/cards/GlassCard";
import { CardSecondaryInfo } from "../components/cards/CardSecondaryInfo";
import { CardTitle } from "../components/cards/CardTitle";
import { CardChipsList } from "../components/cards/CardChipsList";
import { FaCertificate } from "react-icons/fa";

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
    name: "IBM Full Stack Software Developer Specialization",
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
      "Databases",
    ],
    type: "Professional Certificate",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/9X2DHARTH6D2",
  },
];

export function CertificatesSection() {
  return (
    <section className="py-16 sm:py-20 md:py-28" id="certificates">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <SectionHeading
          title="Certificates"
          icon={FaCertificate}
          gradient="from-teal-500/40 to-teal-300/40"
        />

        <div className="grid grid-cols-1 gap-10">
          {CERTIFICATES.map((certificate, pos) => (
            <CertificateItem key={pos} item={certificate} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificateItem({ item }: { item: Certificate }) {
  return (
    <GlassCard accentColor="teal">
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
        <CardSecondaryInfo
          start={item.date}
          end={item.date}
          subTitle={item.type}
        />

        <div className="flex-1">
          <CardTitle title={item.name} link={item.link} color="teal" />

          <CardChipsList items={item.skills} color="teal" className="mt-6" />
        </div>
      </div>
    </GlassCard>
  );
}
