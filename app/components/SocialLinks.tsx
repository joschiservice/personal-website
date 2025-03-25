import Link from "next/link";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export function SocialLinks() {
    return (
        <div className="flex flex-row gap-3">
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
            className="flex text-gray-300 no-underline transition-colors duration-300 ease-in-out hover:text-[#29b5f6]"
        >
            <Icon className="text-[26px]" />
        </Link>
    )
}