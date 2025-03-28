import { IconType } from "react-icons";

interface SectionHeadingProps {
  title: string;
  className?: string;
  icon: IconType;
  gradient: string;
  id?: string;
}

export function SectionHeading({ title, className = "", icon: Icon, gradient, id }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col items-center mb-8 sm:mb-10 md:mb-16 ${className}`}>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
        <div className="relative mb-2 sm:mb-0">
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white/80 relative z-10" />
          <div className="absolute -inset-1 bg-white/10 rounded-full blur-sm"></div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-transparent rounded-full blur-md"></div>
        </div>
        <h2 id={id} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white/95 tracking-tight bg-clip-text bg-gradient-to-r from-blue-100 to-blue-50 text-center px-2 sm:px-4">
          {title}
        </h2>
      </div>
      <div className={`h-0.5 sm:h-1 w-12 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-r ${gradient} rounded-full`}></div>
    </div>
  );
}
