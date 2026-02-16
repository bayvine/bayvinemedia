'use client';

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
    { id: 1, label: "About us", href: "#about" },
    { id: 2, label: "Services", href: "#services" },
    { id: 3, label: "Our work", href: "#work" },
    { id: 4, label: "Roadmap", href: "#roadmap" },
    { id: 5, label: "FAQ", href: "#faq" },
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
    if (isMobile) {
      setIsVisible(true);
      return undefined;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isNearTop = currentScrollY < 20;
      const isScrollingUp = currentScrollY < lastScrollY.current;

      setIsVisible(isNearTop || isScrollingUp);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const renderNavItems = () =>
    navItems.map((item) => (
      <li
        key={item.id}
        className="font-medium inline-block hover:bg-white hover:text-black rounded-full py-2 px-6 transition-all duration-300 cursor-pointer"
      >
        <Link href={item.href}>
          <span className="inline-block overflow-hidden">
            <motion.span variants={itemVariants} className="inline-block">
              {item.label}
            </motion.span>
          </span>
        </Link>
      </li>
    ));

  return (
    <header
      className={`fixed z-[100] w-full top-5 left-0 transition-transform duration-300 ${
        isVisible
          ? "translate-y-0 lg:pointer-events-auto"
          : "translate-y-0 lg:-translate-y-full lg:pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
        <Link href="/" className="text-white text-lg flex items-center gap-3">
          <Icon size="38" name="logo" />
          <span className="hidden sm:inline">Bayvine Digital Agency</span>
        </Link>

        <nav className="hidden lg:flex items-center justify-center text-white bg-black/50 px-2 py-2 rounded-full box-shadow shadow-2xl shrink-0">
          <motion.ul
            className="flex gap-4 shrink-0"
            variants={listVariants}
            initial="open"
            animate="open"
          >
            {renderNavItems()}
          </motion.ul>
        </nav>

        <div className="hidden lg:block shrink-0">
          <CTAButton>
            <span className="flex items-center gap-1">
              Let's Chat <RxArrowTopRight strokeWidth={0.5} />
            </span>
          </CTAButton>
        </div>

        <button
          type="button"
          className="lg:hidden rounded-full bg-black w-[50] p-4 h-[50] flex items-center justify-center text-white shadow-lg"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="relative h-5 w-6 flex flex-col gap-1">
            <span
              className={`absolute left-0 top-0 h-px w-full origin-center bg-white transition-transform duration-300 ${
                isOpen ? "translate-y-2.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-px w-full origin-center bg-white transition-transform duration-300 ${
                isOpen ? "-translate-y-2.5 -rotate-45" : ""
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
            className="lg:hidden overflow-hidden px-4 sm:px-6 relative z-[110]"
          >
            <motion.ul
              className="flex flex-col gap-3 text-white bg-black rounded-2xl px-4 py-8 shadow-2xl relative z-[110]"
              variants={listVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {renderNavItems()}
              <li className="pt-2">
                <CTAButton>
                  <span className="flex items-center gap-1">
                    Let's Chat <RxArrowTopRight strokeWidth={0.5} />
                  </span>
                </CTAButton>
              </li>
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
