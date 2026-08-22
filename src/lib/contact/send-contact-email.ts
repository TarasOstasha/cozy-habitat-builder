import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";

const contactInquirySchema = z.object({
  intent: z.enum(["contact", "designer"]),
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(50).optional(),
  company: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1).max(5000),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailHtml(data: ContactInquiryInput) {
  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Email", data.email],
  ];

  if (data.phone) rows.push(["Phone", data.phone]);
  if (data.company) rows.push(["Firm / Studio", data.company]);

  const detailRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 8px 12px 8px 0; color: #6b6358; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; vertical-align: top;">
            ${escapeHtml(label)}
          </td>
          <td style="padding: 8px 0; color: #1c1917; font-size: 15px; vertical-align: top;">
            ${escapeHtml(value)}
          </td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; background: #f7f3ec; padding: 32px 16px;">
      <div style="max-width: 560px; margin: 0 auto; background: #fffdf8; border: 1px solid #e6dfd3; padding: 28px;">
        <p style="margin: 0 0 8px; color: #8a7d68; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;">
          SEMTA · Website inquiry
        </p>
        <h1 style="margin: 0 0 24px; font-size: 24px; font-weight: normal; color: #1c1917;">
          ${data.intent === "designer" ? "Designer inquiry" : "Contact inquiry"}
        </h1>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          ${detailRows}
        </table>
        <p style="margin: 0 0 8px; color: #6b6358; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em;">
          Message
        </p>
        <p style="margin: 0; color: #1c1917; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
${escapeHtml(data.message)}
        </p>
      </div>
    </div>
  `;
}

function buildEmailText(data: ContactInquiryInput) {
  return [
    data.intent === "designer" ? "Designer inquiry" : "Contact inquiry",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.company ? `Firm / Studio: ${data.company}` : null,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator(contactInquirySchema)
  .handler(async ({ data }) => {
    const apiKey = process.env.SEMTACCD_EMAIL_API?.trim();
    const from =
      process.env.RESEND_FROM_EMAIL?.trim() || "SEMTA <info@semtaccd.com>";
    const to = process.env.RESEND_TO_EMAIL?.trim() || "info@semtaccd.com";

    if (!apiKey) {
      throw new Error("Email is not configured (missing SEMTACCD_EMAIL_API).");
    }

    const resend = new Resend(apiKey);
    const subject =
      data.intent === "designer"
        ? `Designer Inquiry — ${data.name}`
        : `Contact Inquiry — ${data.name}`;

    const { data: result, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject,
      html: buildEmailHtml(data),
      text: buildEmailText(data),
    });

    if (error) {
      console.error("Resend contact email failed", error);
      throw new Error(error.message || "Failed to send message.");
    }

    return { id: result?.id ?? null };
  });
