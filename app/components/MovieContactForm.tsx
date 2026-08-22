"use client";

import { useState } from "react";
import { movieBrand } from "../data/movieBrand";
import { ContactForm } from "./ContactForm";

export function MovieContactForm() {
  const [copied, setCopied] = useState(false);
  const email = movieBrand.contactEmail;
  const copyEmail = async () => {
    if (!email) return;
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="movie-contact-cta">
      <ContactForm brand="movie" source="MOViE" subject="【MOViE】ポートフォリオサイトからのお問い合わせ" />
      <aside className="movie-contact-direct">
        <span>DIRECT EMAIL</span>
        <h3>メールで相談する</h3>
        {email ? (
          <>
            <a className="movie-email-button" href={`mailto:${email}`}>メールを作成する <span aria-hidden="true">→</span></a>
            <button className="movie-email-copy" type="button" onClick={copyEmail}>
              {copied ? "コピーしました" : "メールアドレスをコピー"}
            </button>
            <p className="movie-email-address">{email}</p>
          </>
        ) : (
          <p className="movie-contact-coming-soon">お問い合わせ窓口を準備中です。</p>
        )}
      </aside>
    </div>
  );
}
