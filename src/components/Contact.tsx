import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { contact, FORM_ENDPOINT } from "../content";
import { card } from "./About";
import { buttonMotion, buttonPrimary } from "./Hero";
import { MailIcon, socialIcons } from "./icons";
import Reveal from "./Reveal";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (f.message.trim().length < 10) e.message = "Please write a message of at least 10 characters.";
  return e;
}

const input =
  "mt-2 block w-full rounded-xl border border-line bg-bg px-4 py-3 text-base text-fg placeholder:text-muted/70 transition focus:border-accent focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-accent/20 aria-[invalid=true]:border-red-500";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      className="inline-flex shrink-0 items-center gap-1 rounded-full border border-line px-2.5 py-1 text-[13px] text-fg/80 transition hover:border-accent hover:text-accent"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

export default function Contact() {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const update = (key: keyof Fields) => (e: { target: { value: string } }) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(`Hello from ${fields.name}`);
      const body = encodeURIComponent(`${fields.message}\n\n${fields.name} <${fields.email}>`);
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(fields),
      });
      setStatus(res.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  const field = (key: keyof Fields, label: string, el: "input" | "textarea", type = "text") => {
    const id = `contact-${key}`;
    const props = {
      id,
      name: key,
      value: fields[key],
      onChange: update(key),
      "aria-invalid": errors[key] ? true : undefined,
      "aria-describedby": errors[key] ? `${id}-error` : undefined,
      className: input,
    };
    return (
      <div>
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {el === "textarea" ? (
          <textarea {...props} rows={5} className={`${input} resize-y`} />
        ) : (
          <input {...props} type={type} autoComplete={key} />
        )}
        {errors[key] && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-sm text-red-600 dark:text-red-400"
          >
            {errors[key]}
          </motion.p>
        )}
      </div>
    );
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="min-h-svh py-24 sm:py-32">
      <Reveal className="text-center">
        <h2
          id="contact-heading"
          className="text-[clamp(40px,7vw,72px)] leading-[1.05] font-bold tracking-[-0.03em]"
        >
          {contact.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-[40ch] text-[clamp(18px,2.4vw,24px)] font-light text-muted">
          {contact.subheading}
        </p>
      </Reveal>

      <Reveal className={`${card} mx-auto mt-16 max-w-[720px] p-6 sm:p-10`}>
        {/* Cross-fade between the form and the thank-you message. */}
        <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            role="status"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="py-12 text-center"
          >
            <p className="text-3xl font-semibold tracking-tight">Thank you!</p>
            <p className="mt-3 text-muted">
              {FORM_ENDPOINT
                ? "Your message is on its way. I'll get back to you soon."
                : "Your email app should open with the message ready to send."}
            </p>
            <button
              type="button"
              className="mt-8 text-[15px] font-medium text-accent hover:underline"
              onClick={() => {
                setFields({ name: "", email: "", message: "" });
                setStatus("idle");
              }}
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            noValidate
            onSubmit={onSubmit}
            className="grid gap-5"
            aria-label="Contact form"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {field("name", "Name", "input")}
              {field("email", "Email", "input", "email")}
            </div>
            {field("message", "Message", "textarea")}
            {status === "failed" && (
              <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
            <div>
              <motion.button
                type="submit"
                disabled={status === "sending"}
                className={`${buttonPrimary} disabled:opacity-60`}
                {...buttonMotion}
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </motion.button>
            </div>
          </motion.form>
        )}
        </AnimatePresence>
      </Reveal>
      {/* Email and socials, centred under the form. */}
      <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 text-[17px] text-accent hover:underline"
          >
            <MailIcon className="shrink-0" />
            {contact.email}
          </a>
          <CopyButton text={contact.email} />
        </div>
        <ul className="flex gap-2" aria-label="Social profiles">
          {contact.socials.map((s) => {
            const Icon = socialIcons[s.icon];
            return (
              <li key={s.label}>
                <motion.a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in a new tab)`}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="grid size-11 place-items-center rounded-full border border-line text-fg/80 transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon />
                </motion.a>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
