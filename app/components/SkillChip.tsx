"use client"

interface Props {
  skill: string;
  variant: "work" | "certificate" | "project"
}

export function SkillChip({ skill, variant }: Props) {
  const styles = {
    work: {
      bgColor: "bg-[rgba(0,255,196,0.17)]",
      textColor: "text-[rgb(113,255,213)]",
    },
    certificate: {
      bgColor: "bg-[rgba(0,149,255,0.17)]",
      textColor: "text-[rgb(0,208,255)]",
    },
    project: {
      bgColor: "bg-[rgba(202,56,243,0.17)]",
      textColor: "text-[rgb(225,133,255)]",
    },
  }[variant]

  return (
    <div className={`rounded-[22px] px-[10px] py-[2px] ${styles.bgColor}`}>
      <p className={`text-[14px] leading-[1.8] px-1 ${styles.textColor}`}>{skill}</p>
    </div>
  )
}
