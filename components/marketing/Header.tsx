"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronDown, ChevronRight, Phone } from "lucide-react";
import { CarteContactNumerique } from "./CarteContactNumerique";

const MEGA = [
  {
    id: "formules",
    title: "Nos formules",
    subtitle: "Accompagnement + boisson inclus",
    items: [
      { name: "Menu Sandwich Kebab", price: "13,65 €" },
      { name: "Menu Assiette Kebab", price: "13,65 €" },
      { name: "Menu Géant Kebab",    price: "21,06 €" },
      { name: "Menu Tacos",          price: "15,47 €" },
      { name: "Menu Maxi Tacos",     price: "21,06 €" },
      { name: "Menu Roulé",          price: "12,35 €" },
      { name: "Menu Hamburger",      price: "11,05 €" },
      { name: "Menu Enfant",         price: "7,50 €"  },
    ],
  },
  {
    id: "carte",
    title: "À la carte",
    subtitle: "Sans accompagnement ni boisson",
    items: [
      { name: "Sandwich Kebab",    price: "7,40 €"  },
      { name: "Assiette Kebab",    price: "9,50 €"  },
      { name: "Tacos",             price: "10,00 €" },
      { name: "Roulé Kebab",       price: "7,50 €"  },
      { name: "Hamburger",         price: "6,50 €"  },
      { name: "Portion de Frites", price: "3,00 €"  },
    ],
  },
  {
    id: "extras",
    title: "Boissons & Desserts",
    subtitle: "Pour accompagner",
    items: [
      { name: "Baklava",                      price: "2,50 €" },
      { name: "Yaourt Grec au Miel",          price: "3,00 €" },
      { name: "Coca-Cola / Orangina / Oasis", price: "2,00 €" },
      { name: "Jus de Pêche 25cl",            price: "1,50 €" },
      { name: "Eau 50cl",                     price: "1,00 €" },
      { name: "Sauce (harissa, blanche…)",    price: "0,50 €" },
    ],
  },
];

const MOBILE_NAV = [
  { href: "/menu",     label: "Menu" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact",  label: "Contact" },
];

export function Header() {
  const [open, setOpen]         = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMegaOpen(false); setOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega  = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);

  const closeMega = useCallback(() => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  }, []);

  const keepMega  = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-200 ${
        scrolled ? "shadow-md bg-white/97 backdrop-blur-sm" : "bg-white"
      }`}
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xl font-bold text-[var(--color-primary)] shrink-0"
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
          <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-1">

            {/* Menu avec méga-menu */}
            <div className="relative" onMouseEnter={openMega} onMouseLeave={closeMega}>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={megaOpen}
                aria-controls="mega-menu"
                onClick={() => setMegaOpen((v) => !v)}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg)] transition-colors min-h-[44px]"
              >
                Menu
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </div>

            <Link href="/a-propos" className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg)] transition-colors min-h-[44px] flex items-center">
              À propos
            </Link>
            <Link href="/contact" className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg)] transition-colors min-h-[44px] flex items-center">
              Contact
            </Link>
          </nav>

          {/* Actions droite */}
          <div className="flex items-center gap-2 shrink-0">
            <CarteContactNumerique />
            <a
              href="tel:+33478472426"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-ink-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors min-h-[44px]"
              aria-label="Appeler le restaurant au +33 4 78 47 24 26"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              04 78 47 24 26
            </a>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)] transition-colors min-h-[44px]"
            >
              Notre menu
            </Link>
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

      {/* ── MÉGA-MENU DESKTOP ── */}
      {megaOpen && (
        <div
          id="mega-menu"
          role="region"
          aria-label="Menu complet — Kebab d'Or"
          className="hidden md:block absolute left-0 right-0 top-full bg-white border-t border-[var(--color-border)] shadow-2xl z-40"
          onMouseEnter={keepMega}
          onMouseLeave={closeMega}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-[280px_1fr] gap-8">

              {/* Image vedette + CTA */}
              <div className="flex flex-col gap-4">
                <div className="relative rounded-2xl overflow-hidden h-52 shadow-md">
                  <Image
                    src="/images/restaurant/menu-assortiment.webp"
                    alt="Assortiment complet Kebab d'Or : sandwich, tacos, assiette, roulé — Lyon Vaise"
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-3 left-4 font-display font-bold text-white text-lg leading-tight">
                    Kebab d&apos;Or<br />
                    <span className="text-[var(--color-accent)] text-sm font-normal">La Mer Égée</span>
                  </p>
                </div>
                <Link
                  href="/menu"
                  onClick={() => setMegaOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-3 text-sm font-bold text-white hover:bg-[var(--color-primary-dark)] transition-colors min-h-[44px]"
                >
                  Voir tout le menu
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href="tel:+33478472426"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm font-semibold text-[var(--color-ink-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors min-h-[44px]"
                  aria-label="Appeler le restaurant"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  04 78 47 24 26
                </a>
              </div>

              {/* Catégories */}
              <div className="grid grid-cols-3 gap-6 divide-x divide-[var(--color-border)]">
                {MEGA.map((cat) => (
                  <div key={cat.id} className="pl-6 first:pl-0">
                    <p className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-0.5">
                      {cat.title}
                    </p>
                    {cat.subtitle && (
                      <p className="text-xs text-[var(--color-ink-subtle)] mb-3">{cat.subtitle}</p>
                    )}
                    <ul className="space-y-2">
                      {cat.items.map((item) => (
                        <li key={item.name}>
                          <Link
                            href="/menu"
                            onClick={() => setMegaOpen(false)}
                            className="flex items-center justify-between gap-3 group"
                          >
                            <span className="text-sm text-[var(--color-ink-muted)] group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                              {item.name}
                            </span>
                            <span className="text-sm font-semibold text-[var(--color-ink)] shrink-0">
                              {item.price}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-ink-subtle)]">
              <p><span aria-hidden="true">🥩</span> Toute la viande est certifiée halal · TVA 10 % incluse</p>
              <p><span aria-hidden="true">📍</span> 37 rue Marietton, 69009 Lyon — Métro Valmy (D)</p>
            </div>
          </div>
        </div>
      )}

      {/* ── MENU MOBILE ── */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-[var(--color-border)] bg-white"
          role="navigation"
          aria-label="Menu mobile"
        >
          <div className="px-4 pt-4 pb-2">
            <p className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-3">
              Nos formules
            </p>
            <div className="grid grid-cols-2 gap-2">
              {MEGA[0]!.items.slice(0, 6).map((item) => (
                <Link
                  key={item.name}
                  href="/menu"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg bg-[var(--color-bg)] px-3 py-2 text-xs"
                >
                  <span className="text-[var(--color-ink-muted)] truncate pr-2">{item.name}</span>
                  <span className="font-semibold text-[var(--color-ink)] shrink-0">{item.price}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="px-4 pb-2 border-t border-[var(--color-border)] mt-2 pt-3">
            <ul className="space-y-1">
              {MOBILE_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-ink-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)]"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-4 pb-4 border-t border-[var(--color-border)] mt-2 pt-3">
            <a
              href="tel:+33478472426"
              className="flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-3 text-sm font-bold text-white"
              aria-label="Appeler le restaurant"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              04 78 47 24 26
            </a>
          </div>
        </div>
      )}

      {megaOpen && (
        <div
          className="hidden md:block fixed inset-0 top-16 bg-black/20 z-30"
          onClick={() => setMegaOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
