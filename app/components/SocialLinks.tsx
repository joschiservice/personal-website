import Link from "next/link";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export function SocialLinks({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-row gap-2 sm:gap-3 ${className}`}>
            <SocialLink href={process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN} icon={FaLinkedin} />
            <SocialLink href={process.env.NEXT_PUBLIC_SOCIAL_GITHUB} icon={FaGithub} />
            <SocialLink href={process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM} icon={FaInstagram} />
        </div>
    )
}

interface SocialLinkProps {
    href: string | undefined;
    icon: IconType;
}

function SocialLink({ href, icon: Icon }: SocialLinkProps) {
    if (!href) return null;

    return (
        <Link
            href={href}
            target="_blank"
            className="flex text-gray-300 no-underline transition-all duration-300 ease-in-out hover:text-[#29b5f6]"
            aria-label="Social media link"
        >
            <Icon className="text-[22px] sm:text-[26px] hover:shadow-[0px_0px_10px_rgba(41,181,246,0.4)] hover:drop-shadow-[0_0_5px_rgba(41,181,246,0.3)]" />
        </Link>
    )
}