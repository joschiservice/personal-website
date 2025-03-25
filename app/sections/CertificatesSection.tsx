"use client";

import { FiExternalLink } from "react-icons/fi";
import { OptionalLink } from "@/app/components/OptionalLink";
import { SkillChip } from "@/app/components/SkillChip";
import { getFormattedTimeSpan } from "@/app/lib/date";

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
    <section className="py-16" id="certificates">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-medium text-center mb-8">
          Certificates
        </h2>

        <div className="grid grid-cols-1 gap-8">
          {CERTIFICATES.map((certificate, pos) => <CertificateItem key={pos} item={certificate} />)}
        </div>
      </div>
    </section>
  );
}

function CertificateItem({ item }: { item: Certificate }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-8 gap-4">
      <div className="hidden sm:block sm:col-span-2">
        <p className="text-gray-400 mt-1 text-left">
          {getFormattedTimeSpan(item.date, item.date)}
        </p>
      </div>
      <div className="col-span-1 sm:col-span-6">
        <OptionalLink href={item.link}>
          <h3 className="text-xl font-medium flex items-center">
            {item.name}
            {item.link && <FiExternalLink className="ml-1 mb-0.5 inline-block h-auto w-4" />}
          </h3>
        </OptionalLink>
        <p className="text-gray-400 mb-2 hidden sm:block">
          {item.type}
        </p>
        <p className="text-gray-500 mb-2 sm:hidden">
          {item.type} — <span className="whitespace-nowrap">{getFormattedTimeSpan(item.date, item.date)}</span>
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {item.skills.map((skill, pos) => <SkillChip key={pos} variant="certificate" skill={skill} />)}
        </div>
      </div>
    </div>
  );
}
