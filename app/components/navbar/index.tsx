"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import {
  localeHref,
  locales,
  pathWithoutLocale,
  type Locale,
} from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/getDictionary";
import { Container } from "@/app/components/system/Container";

export function Navbar({
  locale,
  copy,
}: {
  locale: Locale;
  copy: Dictionary["nav"];
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const items = [
    { title: copy.work, href: localeHref(locale, "/#experience") },
    { title: copy.about, href: localeHref(locale, "/#about-me") },
    { title: copy.notes, href: localeHref(locale, "/blog") },
    { title: copy.contact, href: localeHref(locale, "/contact") },
  ];

  useEffect(() => {
    // Route changes must dismiss the mobile dialog, regardless of navigation source.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    let scrolled = false;

    const onScroll = () => {
      const nextScrolled = window.scrollY > 18;
      if (nextScrolled === scrolled) return;
      scrolled = nextScrolled;
      setIsScrolled(nextScrolled);
    };
    const frameId = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const backgroundElements = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer")
    );
    const previousInertStates = backgroundElements.map((element) => element.inert);
    document.body.style.overflow = "hidden";
    backgroundElements.forEach((element) => {
      element.inert = true;
    });
    firstMobileLinkRef.current?.focus();

    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;
      const menuControls = Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
      const focusableElements = [toggleRef.current, ...menuControls].filter(
        (element): element is HTMLElement => element !== null
      );
      if (focusableElements.length === 0) return;

      const currentIndex = focusableElements.findIndex(
        (element) => element === document.activeElement
      );
      const direction = event.shiftKey ? -1 : 1;
      const nextIndex =
        currentIndex === -1
          ? 0
          : (currentIndex + direction + focusableElements.length) %
            focusableElements.length;
      event.preventDefault();
      focusableElements.at(nextIndex)?.focus();
    };

    window.addEventListener("keydown", handleDialogKeyDown);
    return () => {
      window.removeEventListener("keydown", handleDialogKeyDown);
      document.body.style.overflow = previousOverflow;
      backgroundElements.forEach((element, index) => {
        element.inert = previousInertStates[index];
      });
    };
  }, [isOpen]);

  return (
    <nav
      className="site-nav"
      data-scrolled={isScrolled ? "true" : "false"}
      aria-label={copy.label}
    >
      <Container className="site-nav__inner">
        <Link
          href={localeHref(locale, "/")}
          className="site-nav__mark"
          aria-label={copy.home}
        >
          <span className="site-nav__mark-full">{copy.identity}</span>
          <span className="site-nav__mark-short">{copy.monogram}</span>
        </Link>

        <div className="site-nav__actions">
          <div className="site-nav__links">
            {items.map((item) => (
              <NavigationLink key={item.href} {...item} pathname={pathname} />
            ))}
          </div>
          <LanguageSwitcher
            locale={locale}
            pathname={pathname}
            copy={copy}
            className="site-language--desktop"
          />
          <button
            ref={toggleRef}
            type="button"
            className="site-nav__toggle"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? copy.closeMenu : copy.openMenu}
          >
            {isOpen ? <HiXMark aria-hidden="true" /> : <HiBars3 aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <div
        ref={mobileMenuRef}
        id="mobile-nav"
        className="site-nav__mobile"
        data-open={isOpen ? "true" : "false"}
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? "true" : undefined}
        aria-label={isOpen ? copy.mobileLabel : undefined}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="site-nav__mobile-links">
          {items.map((item, index) => (
            <Link
              ref={index === 0 ? firstMobileLinkRef : undefined}
              key={item.href}
              href={item.href}
              onClick={(event) => {
                scrollToCurrentHash(event);
                setIsOpen(false);
              }}
              style={{ "--nav-index": index } as React.CSSProperties}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.title}
            </Link>
          ))}
          <LanguageSwitcher
            locale={locale}
            pathname={pathname}
            copy={copy}
            className="site-language--mobile"
          />
        </div>
      </div>
    </nav>
  );
}

function LanguageSwitcher({
  locale,
  pathname,
  copy,
  className,
}: {
  locale: Locale;
  pathname: string;
  copy: Dictionary["nav"];
  className: string;
}) {
  const href = pathWithoutLocale(pathname);
  const targetLocale = locales.find((candidate) => candidate !== locale) ?? locale;

  return (
    <div
      className={`site-language ${className}`}
      aria-label={copy.languageLabel}
    >
      <a
        href={localeHref(targetLocale, href)}
        hrefLang={targetLocale}
        title={copy.languages[targetLocale]}
        aria-label={copy.languages[targetLocale]}
        onClick={(event) => {
          event.preventDefault();
          const target = new URL(event.currentTarget.href);
          target.search = window.location.search;
          target.hash = window.location.hash;
          window.location.assign(target.toString());
        }}
      >
        {locales.map((candidate) => (
          <span
            key={candidate}
            className="site-language__option"
            data-current={candidate === locale ? "true" : "false"}
            lang={candidate}
            aria-hidden="true"
          >
            {copy.languages[candidate]}
          </span>
        ))}
      </a>
    </div>
  );
}

function NavigationLink({
  title,
  href,
  pathname,
}: {
  title: string;
  href: string;
  pathname: string;
}) {
  const hrefPath = href.split("#")[0] || "/";
  const isActive =
    hrefPath !== "/" && (pathname === hrefPath || pathname.startsWith(`${hrefPath}/`));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={scrollToCurrentHash}
    >
      {title}
    </Link>
  );
}

function scrollToCurrentHash(event: MouseEvent<HTMLAnchorElement>) {
  const target = new URL(event.currentTarget.href);
  if (
    !target.hash ||
    target.pathname !== window.location.pathname ||
    target.search !== window.location.search ||
    target.hash !== window.location.hash
  ) {
    return;
  }

  const section = document.getElementById(decodeURIComponent(target.hash.slice(1)));
  if (!section) return;

  event.preventDefault();
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}
