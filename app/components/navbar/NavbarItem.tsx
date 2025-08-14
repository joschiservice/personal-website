"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
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

  const [currentLinkType, setCurrentLinkType] = useState(0); // 0 = default href link, 1 = smooth scroll link
  const [targetElement, setTargetElement] = useState('');

  useEffect(() => {
    const [pathName, elementName] = href.split('#');

    // Is current page?
    if (pathName == currentPathName) {
      setTargetElement(elementName?? 'root');
      setCurrentLinkType(1);
    } else {
      setCurrentLinkType(0);
    }
  }, [currentPathName, href]);

  const linkClasses = "text-white no-underline transition-colors duration-300 ease-in-out hover:text-[#29b5f6]";
  const scrollLinkClasses = `${linkClasses} cursor-pointer select-none bg-transparent border-0 inline-flex items-center`;

  const innerComp = isMobile ?
    <span className="text-[28px] font-semibold">{title}</span> :
    <span>{title}</span>;

  const isActivePage = href === currentPathName;

  return (
    currentLinkType == 1 ? (
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