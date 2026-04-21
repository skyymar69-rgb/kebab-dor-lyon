"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ status: "loading", message: "" });

    const formData = new FormData(e.currentTarget);

    // Honeypot check
    if (formData.get("website")) {
      setState({ status: "success", message: "Message envoyé avec succès." });
      return;
    }

    const data = {
      nom: formData.get("nom") as string,
      email: formData.get("email") as string,
      sujet: formData.get("sujet") as string,
      message: formData.get("message") as string,
      rgpd: formData.get("rgpd") === "on",
    };

    if (!data.rgpd) {
      setState({ status: "error", message: "Vous devez accepter la politique de confidentialité pour envoyer ce message." });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setState({ status: "success", message: "Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais." });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error("Server error");
      }
    } catch {
      setState({ status: "error", message: "Une erreur est survenue. Veuillez réessayer ou nous appeler directement." });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Formulaire de contact">
      {/* Honeypot RGPD */}
      <div aria-hidden="true" className="hidden" tabIndex={-1}>
        <label htmlFor="website">Ne pas remplir ce champ</label>
        <input
          type="text"
          id="website"
          name="website"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-[var(--color-ink)] mb-1">
              Nom <span aria-label="champ obligatoire" className="text-[var(--color-primary)]">*</span>
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              required
              autoComplete="name"
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 min-h-[44px]"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--color-ink)] mb-1">
              Email <span aria-label="champ obligatoire" className="text-[var(--color-primary)]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 min-h-[44px]"
              placeholder="votre@email.fr"
            />
          </div>
        </div>

        <div>
          <label htmlFor="sujet" className="block text-sm font-medium text-[var(--color-ink)] mb-1">
            Sujet <span aria-label="champ obligatoire" className="text-[var(--color-primary)]">*</span>
          </label>
          <select
            id="sujet"
            name="sujet"
            required
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-ink)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 min-h-[44px]"
          >
            <option value="">Choisissez un sujet</option>
            <option value="commande">Question sur une commande</option>
            <option value="menu">Question sur le menu</option>
            <option value="groupe">Commande de groupe / événement</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[var(--color-ink)] mb-1">
            Message <span aria-label="champ obligatoire" className="text-[var(--color-primary)]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={1000}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 resize-none"
            placeholder="Votre message..."
          />
        </div>

        {/* RGPD consent */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="rgpd"
            name="rgpd"
            required
            className="mt-1 h-4 w-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] shrink-0"
          />
          <label htmlFor="rgpd" className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
            J&apos;accepte que mes données personnelles (nom, email, message) soient traitées par LAC DE VAN dans le but de répondre à ma demande de contact, conformément à la{" "}
            <a href="/confidentialite" className="text-[var(--color-primary)] underline hover:no-underline">
              politique de confidentialité
            </a>
            . Ces données seront conservées 3 ans maximum et ne seront pas transmises à des tiers.{" "}
            <span className="font-medium">Ce consentement est requis.</span>
          </label>
        </div>

        {/* Status message */}
        {state.status !== "idle" && state.status !== "loading" && (
          <div
            role="alert"
            aria-live="polite"
            className={`rounded-lg p-3 text-sm ${
              state.status === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={state.status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px]"
          aria-busy={state.status === "loading"}
        >
          {state.status === "loading" ? (
            <>
              <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Envoyer le message
            </>
          )}
        </button>
      </div>
    </form>
  );
}
