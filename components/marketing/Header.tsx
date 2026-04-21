"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart/store";
import { CarteContactNumerique } from "./CarteContactNumerique";

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-200 ${
        scrolled ? "shadow-md bg-white/95 backdrop-blur-sm" : "bg-white"
      }`}
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xl font-bold text-[var(--color-primary)]"
            aria-label="Kebab d'Or – La Mer Égée, retour à l'accueil"
          >
            <span aria-hidden="true" className="text-2xl">🥙</span>
            <span className="leading-tight">
              Kebab d&apos;Or
              <span className="block text-xs font-sans font-normal text-[var(--color-ink-muted)]">
                La Mer Égée · Lyon Vaise
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + cart */}
          <div className="flex items-center gap-3">
            <CarteContactNumerique />
            <Link
              href="/commander/panier"
              aria-label={`Panier — ${itemCount} article${itemCount !== 1 ? "s" : ""}`}
              className="relative p-2 text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {itemCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-white"
                >
                  {itemCount}
                </span>
              )}
            </Link>

            <Link
              href="/commander"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)] transition-colors min-h-[44px]"
            >
              Commander
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="md:hidden p-2 text-[var(--color-ink-muted)] min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-[var(--color-border)] bg-white px-4 pb-4 pt-2"
          role="navigation"
          aria-label="Menu mobile"
        >
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-ink-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/commander"
                className="mt-2 block rounded-lg bg-[var(--color-primary)] px-3 py-3 text-center text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Commander maintenant
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
