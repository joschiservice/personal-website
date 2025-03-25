"use client"

import { useState } from "react";
import Link from "next/link";
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

  return (
    <div className="fixed flex w-screen z-100">
      <div className="min-h-[20px] mx-auto my-4 flex justify-between min-w-[90%] md:min-w-[800px] rounded-[24px] py-[5.6px] px-4 backdrop-blur-[16px] backdrop-saturate-[180%] bg-[rgba(33,33,33,0.6)] shadow-[0px_0px_24px_0px_rgba(0,0,0,0.4)]">
        <NavbarTitle href="/">JH</NavbarTitle>
        <MobileNavbarButton isOpen={isMobileNavbarOpen} setIsOpen={setIsMobileNavbarOpen} />
        <DesktopNavbar />
      </div>
      <MobileNavbar items={ITEMS} isOpen={isMobileNavbarOpen} setIsOpen={setIsMobileNavbarOpen} />
    </div>
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
      className="text-[22px] font-bold text-white no-underline transition-colors duration-300 ease-in-out hover:text-[#29b5f6]"
    >
      {children}
    </Link>
  );
}