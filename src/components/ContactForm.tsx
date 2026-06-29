import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type ContactFormProps = {
  intent?: "contact" | "designer";
};

export function ContactForm({ intent = "contact" }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const isDesigner = intent === "designer";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const company = String(data.get("company") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = isDesigner ? `Designer Inquiry - ${name}` : `Contact Inquiry - ${name}`;

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      company ? `Company: ${company}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:semtaccd@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    form.reset();
  }

  if (submitted) {
    return (
      <div className="border border-border/60 bg-secondary/20 px-8 py-10 text-center">
        <span className="eyebrow">Thank you</span>
        <p className="mt-4 font-display text-2xl">Your message is ready to send.</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Your email app should open with your message. If it did not, reach us directly at{" "}
          <a href="mailto:semtaccd@gmail.com" className="link-underline">
            semtaccd@gmail.com
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="eyebrow link-underline mt-8 inline-block"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${intent}-name`} className="eyebrow text-muted-foreground">
            Name
          </Label>
          <Input
            id={`${intent}-name`}
            name="name"
            required
            autoComplete="name"
            className="h-11 rounded-none border-border/80 bg-transparent"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${intent}-email`} className="eyebrow text-muted-foreground">
            Email
          </Label>
          <Input
            id={`${intent}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="h-11 rounded-none border-border/80 bg-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${intent}-phone`} className="eyebrow text-muted-foreground">
            Phone
          </Label>
          <Input
            id={`${intent}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className="h-11 rounded-none border-border/80 bg-transparent"
          />
        </div>
        {isDesigner && (
          <div className="space-y-2">
            <Label htmlFor={`${intent}-company`} className="eyebrow text-muted-foreground">
              Firm / Studio
            </Label>
            <Input
              id={`${intent}-company`}
              name="company"
              className="h-11 rounded-none border-border/80 bg-transparent"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${intent}-message`} className="eyebrow text-muted-foreground">
          Message
        </Label>
        <Textarea
          id={`${intent}-message`}
          name="message"
          required
          rows={5}
          placeholder={
            isDesigner
              ? "Tell us about your project, timeline, and how we can support your design."
              : "Tell us about your space and what you have in mind."
          }
          className="min-h-[140px] resize-none rounded-none border-border/80 bg-transparent"
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center bg-[color:var(--color-gold)] px-7 py-3.5 text-sm font-medium tracking-[0.15em] uppercase text-black transition-colors hover:bg-[color:var(--color-gold-hover)] sm:w-auto"
      >
        Send Message
      </button>
    </form>
  );
}
