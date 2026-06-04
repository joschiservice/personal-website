"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { scroller } from 'react-scroll';

interface Props {
  title: string;
  href: string;
  isMobile?: boolean;
  onClick?: () => void;
}

export function NavbarItem({ title, href, isMobile = false, onClick }: Props) {
  const currentPathName = usePathname();
  const [pathName, elementName] = href.split('#');
  const isScrollLink = pathName === currentPathName;
  const targetElement = elementName ?? 'root';

  const linkClasses = "text-white no-underline transition-colors duration-300 ease-in-out hover:text-[#29b5f6]";
  const scrollLinkClasses = `${linkClasses} cursor-pointer select-none bg-transparent border-0 inline-flex items-center`;

  const innerComp = isMobile ?
    <span className="text-[28px] font-semibold">{title}</span> :
    <span>{title}</span>;

  const isActivePage = href === currentPathName;

  return (
    isScrollLink ? (
      <button
        type="button"
        onClick={() => {
          scroller.scrollTo(targetElement, {
            smooth: true,
            duration: 500
          });
          if (onClick) onClick();
        }}
        className={scrollLinkClasses}
      >
        {innerComp}
      </button>
    ) : (
      <Link href={href} onClick={onClick} className={linkClasses} aria-current={isActivePage ? 'page' : undefined}>
        {innerComp}
      </Link>
    )
  )
}
