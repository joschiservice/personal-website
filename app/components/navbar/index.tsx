"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarItem } from "@/app/components/navbar/NavbarItem";
import { MobileNavbar, MobileNavbarButton } from "./MobileNavbarMenu";

const ITEMS = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/#about-me' },
  { title: 'Experience', href: '/#experience' },
  { title: 'Projects', href: '/#projects' },
  { title: 'Imprint', href: '/imprint' }
];

export function Navbar() {
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  // Function to calculate scroll progress
  const calculateScrollProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    // Set up scroll event listener
    window.addEventListener('scroll', calculateScrollProgress);
    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  // Reset scroll progress when navigating to a new page (not just hash changes)
  useEffect(() => {
    setScrollProgress(0);
  }, [pathname]);

  // Handle hash navigation by recalculating scroll progress after navigation
  useEffect(() => {
    const handleHashChange = () => {
      setTimeout(() => {
        calculateScrollProgress();
      }, 100);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Recalculate after pathname changes as well (non-hash navigation)
    handleHashChange();
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]);

  return (
    <nav className="fixed flex w-screen z-100" aria-label="Primary">
      <div className="relative min-h-[20px] mx-auto my-4 flex justify-between min-w-[90%] md:min-w-[800px] rounded-[24px] py-[5.6px] px-4 backdrop-blur-[12px] backdrop-saturate-[150%] bg-[rgba(20,20,20,0.7)] border border-[rgba(255,255,255,0.05)] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.2)] after:content-[''] after:absolute after:bottom-0 after:left-[10%] after:right-[10%] after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-[#29b5f6]/30 after:to-transparent overflow-hidden">
        {/* Scroll indicator */}
        <div
          className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#29b5f6]/20 via-[#29b5f6]/40 to-[#29b5f6]/20 rounded-tl-[24px] ${
            scrollProgress > 99 ? 'rounded-tr-[24px]' : ''
          }`}
          style={{ width: `${scrollProgress}%` }}
        />
        <NavbarTitle href="/">JH</NavbarTitle>
        <MobileNavbarButton isOpen={isMobileNavbarOpen} setIsOpen={setIsMobileNavbarOpen} />
        <DesktopNavbar />
      </div>
      <MobileNavbar items={ITEMS} isOpen={isMobileNavbarOpen} setIsOpen={setIsMobileNavbarOpen} />
    </nav>
  );
}

function DesktopNavbar() {
  return (
    <div className="justify-between w-full md:flex hidden">
      <div />
      <div className="flex flex-row items-center space-x-8">
        {ITEMS.map((item, index) => <NavbarItem key={index} title={item.title} href={item.href} />)}
      </div>
      <div />
    </div>
  );
}

function NavbarTitle({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label="Home"
      className="text-[22px] font-bold text-white no-underline transition-colors duration-300 ease-in-out hover:text-[#29b5f6]"
    >
      {children}
    </Link>
  );
}