"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CTAButton from "./CTAButton";
import { RxArrowTopRight } from "react-icons/rx";
import { Icon } from "./icons/Icon";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isMobile = useIsMobile();
  const navItems = [
    { id: 1, label: "About", href: "/#about" },
    { id: 2, label: "Services", href: "/#services" },
    { id: 3, label: "Work", href: "/#work" },
    { id: 4, label: "Process", href: "/#roadmap" },
    { id: 5, label: "FAQ", href: "/#faq" },
  ];

  const listVariants = {
    open: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    open: { y: 0, opacity: 1 },
    closed: { y: "100%", opacity: 0 },
  };

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      const isNearTop = currentScrollY < 24;
      const isScrollingUp = scrollDelta < -8;
      const isScrollingDown = scrollDelta > 8;

      if (isOpen) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (isNearTop || isScrollingUp) {
        setIsVisible(true);
      } else if (isScrollingDown) {
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const shouldShowHeader = isVisible || isOpen;

  const renderNavItems = (isMobileMenu = false) =>
    navItems.map((item) => (
      <li key={item.id} className={isMobileMenu ? "w-full" : "inline-block"}>
        <Link
          href={item.href}
          onClick={isMobileMenu ? () => setIsOpen(false) : undefined}
          className={
            isMobileMenu
              ? "group block w-full rounded-lg border border-white/15 bg-black/25 px-4 py-3 text-left font-medium text-white transition-all duration-300 hover:bg-white hover:text-black active:bg-white active:text-black"
              : "group block rounded-full px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-white hover:text-black active:bg-white active:text-black"
          }
        >
          <span className="inline-block overflow-hidden">
            <motion.span
              variants={itemVariants}
              className="inline-block self-center transition-colors duration-300 group-hover:text-black group-active:text-black"
            >
              {item.label}
            </motion.span>
          </span>
        </Link>
      </li>
    ));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-transform duration-300 lg:top-5 ${
        shouldShowHeader
          ? "translate-y-0 pointer-events-auto"
          : "-translate-y-full pointer-events-none"
      }`}
      style={
        isMobile
          ? { paddingTop: "max(4px, env(safe-area-inset-top))" }
          : undefined
      }
    >
      <div
        className={`mx-3 mt-1 sm:mx-6 lg:mx-10 lg:mt-0 ${
          isMobile
            ? "overflow-hidden rounded-[32px] border border-white/20 shadow-[0_14px_45px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
            : "rounded-none border-none bg-transparent shadow-none backdrop-blur-0"
        }`}
        style={
          isMobile
            ? {
                backgroundImage:
                  "linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.08) 40%,rgba(0,0,0,0.36) 100%)",
              }
            : undefined
        }
      >
        <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 lg:px-0 lg:py-6">
          <Link onClick={() => setIsOpen(false)}  href="/" className="text-white text-lg flex items-center gap-3">
            <Icon size="38" name="logo" />
            <span className="hidden xl:inline">Bayvine Digital Agency</span>
          </Link>

          <nav className="hidden lg:flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.15),rgba(255,255,255,0.06)_45%,rgba(0,0,0,0.35)_100%)] px-2 py-2 text-white shadow-[0_16px_38px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
            <motion.ul
              className="flex gap-4 shrink-0 text-center"
              variants={listVariants}
              initial="open"
              animate="open"
            >
              {renderNavItems()}
            </motion.ul>
          </nav>

          <div className="hidden lg:block shrink-0">
            <Link href={"/contact"} onClick={() => setIsOpen(false)}>
              <CTAButton as="span">
                <span className="flex items-center gap-1">
                  Let&apos;s talk <RxArrowTopRight strokeWidth={0.5} />
                </span>
              </CTAButton>
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white shadow-[0_10px_35px_rgba(0,0,0,0.45)] backdrop-blur-xl cursor-pointer"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="relative block h-3.5 w-5 ">
              <span
                className={`absolute left-0 top-0 h-[2.5px] w-full rounded-full bg-white transition-transform duration-300 ${
                  isOpen ? "translate-y-[5.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[2.5px] w-full -translate-y-1/2 rounded-full bg-white transition-opacity duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-[2.5px] w-full rounded-full bg-white transition-transform duration-300 ${
                  isOpen ? "-translate-y-[5.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden px-4 pb-4 sm:px-5 sm:pb-5"
            >
              <motion.ul
                className="flex flex-col gap-3  pt-4 text-white"
                variants={listVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {renderNavItems(true)}
                <li className="pt-2">
                  <Link
                    href={"/contact"}
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <CTAButton as="span" className="w-full justify-center">
                      <span className="flex items-center gap-1">
                        Let&apos;s talk <RxArrowTopRight strokeWidth={0.5} />
                      </span>
                    </CTAButton>
                  </Link>
                </li>
              </motion.ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default NavBar;
