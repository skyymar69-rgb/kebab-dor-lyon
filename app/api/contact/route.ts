import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  nom: z.string().min(1).max(100),
  email: z.string().email(),
  sujet: z.string().min(1).max(100),
  message: z.string().min(10).max(1000),
  rgpd: z.boolean().refine((v) => v === true, "Consentement RGPD requis"),
});

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const resendKey = process.env["RESEND_API_KEY"];
    if (resendKey && resendKey !== "re_test_placeholder") {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from: process.env["FROM_EMAIL"] ?? "noreply@kebabdor.fr",
        to: process.env["RESTAURANT_EMAIL"] ?? "admin@kebabdor.fr",
        replyTo: data.email,
        subject: `[Contact] ${data.sujet} — ${data.nom}`,
        html: `
          <h3>Nouveau message de contact</h3>
          <p><strong>Nom :</strong> ${data.nom}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          <p><strong>Sujet :</strong> ${data.sujet}</p>
          <p><strong>Message :</strong></p>
          <blockquote>${data.message.replace(/\n/g, "<br>")}</blockquote>
          <p><small>Consentement RGPD : Oui — ${new Date().toLocaleString("fr-FR")}</small></p>
        `,
      });
    } else {
      console.log("Contact form (dev mode):", data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
