"use client";

import { FormEvent, useState } from "react";

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzepwvjg";

type ContactFormProps = {
  brand: "movie" | "aisa";
  source: "MOViE" | "aisa";
  subject: string;
};

export function ContactForm({ brand, source, subject }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending");
    console.info("[ContactForm] POST", JSON.stringify({ url: FORMSPREE_ENDPOINT, method: "POST", source }));
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const responseBody = await response.text();
      if (!response.ok) {
        console.error("[ContactForm] Formspree error", JSON.stringify({
          url: FORMSPREE_ENDPOINT,
          status: response.status,
          body: responseBody,
        }));
        throw new Error(`Formspree request failed: ${response.status}`);
      }
      console.info("[ContactForm] Formspree success", JSON.stringify({
        url: FORMSPREE_ENDPOINT,
        status: response.status,
        body: responseBody,
      }));
      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("[ContactForm] request failed", JSON.stringify({ url: FORMSPREE_ENDPOINT, error: String(error) }));
      setStatus("error");
    }
  };

  if (status === "success") {
    return <div className={`contact-form-success contact-form-success-${brand}`} role="status" aria-live="polite"><strong>お問い合わせありがとうございます。</strong><p>内容を確認のうえ、ご連絡いたします。</p></div>;
  }

  return (
    <form className={`contact-form contact-form-${brand}`} onSubmit={submit}>
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="_subject" value={subject} />
      <div className="contact-form-honeypot" aria-hidden="true"><label htmlFor={`${brand}-gotcha`}>Leave this field empty</label><input id={`${brand}-gotcha`} name="_gotcha" type="text" tabIndex={-1} autoComplete="off" /></div>
      <div className="contact-form-field"><label htmlFor={`${brand}-name`}>お名前 <span aria-hidden="true">必須</span></label><input id={`${brand}-name`} name="name" type="text" placeholder="山田 太郎" required autoComplete="name" /></div>
      <div className="contact-form-field"><label htmlFor={`${brand}-company`}>会社名・屋号 <small>任意</small></label><input id={`${brand}-company`} name="company" type="text" placeholder="株式会社〇〇" autoComplete="organization" /></div>
      <div className="contact-form-field contact-form-field-wide"><label htmlFor={`${brand}-email`}>メールアドレス <span aria-hidden="true">必須</span></label><input id={`${brand}-email`} name="email" type="email" placeholder="example@example.com" required autoComplete="email" /></div>
      <div className="contact-form-field contact-form-field-wide"><label htmlFor={`${brand}-message`}>お問い合わせ内容 <span aria-hidden="true">必須</span></label><textarea id={`${brand}-message`} name="message" placeholder="ご相談内容をご記入ください" required rows={6} /></div>
      <div className="contact-form-actions" style={brand === "movie" ? { justifyContent: "center" } : undefined}><button type="submit" disabled={status === "sending"}>{status === "sending" ? "送信中..." : "送信する"}</button>{status === "error" && <p className="contact-form-error" role="alert" aria-live="polite">送信できませんでした。時間をおいてもう一度お試しください。</p>}</div>
    </form>
  );
}
