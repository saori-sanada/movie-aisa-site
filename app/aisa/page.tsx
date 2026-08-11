import Image from "next/image";
import type { CSSProperties } from "react";
import { AisaHeader } from "../components/AisaHeader";
import { AisaRevealSection } from "../components/AisaRevealSection";
import { AisaServiceIcon } from "../components/AisaServiceIcon";
import { AisaWorksCarousel } from "../components/AisaWorksCarousel";
import { aisaContact, aisaProfile, aisaServices, aisaWorks } from "../data/aisa";
import styles from "./AisaPage.module.css";

export default function AisaPage() {
  return (
    <div className={styles.page}>
      <AisaHeader />

      <main>
        <section id="aisa-top" className={styles.hero}>
          <a className={styles.heroBrand} href="#aisa-top" aria-label="aisa（AI活用）トップ">
            <strong>aisa</strong>
            <span>AI活用</span>
          </a>

          <div className={styles.heroScene} aria-hidden="true">
            <div className={styles.heroIllustration} />
          </div>
          <div className={styles.heroOverlay} aria-hidden="true" />

          <div className={styles.heroCopy}>
            <h1>可能性を、未来へ。</h1>
            <p>AIで、あなたの「やりたい」を<br />実現できる仕組みへ。</p>
            <a className={`${styles.button} ${styles.buttonFill}`} href="#contact">
              お問い合わせ <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <AisaRevealSection id="services" className={`${styles.section} ${styles.services}`}>
          <div className={styles.heading}><span>SERVICES</span><h2>できること</h2></div>
          <div className={styles.serviceGrid}>
            {aisaServices.map((service, index) => (
              <article
                className={`${styles.cardReveal} ${styles.serviceCard}`}
                key={service.title}
                style={{ "--aisa-card-delay": `${index * 55}ms` } as CSSProperties}
                tabIndex={0}
              >
                <span className={styles.serviceIcon} aria-hidden="true"><AisaServiceIcon name={service.icon} /></span>
                <h3>{service.title}</h3>
                <p>{service.lines.map((line) => <span key={line}>{line}</span>)}</p>
              </article>
            ))}
          </div>
        </AisaRevealSection>

        <AisaRevealSection id="works" className={`${styles.section} ${styles.works}`}>
          <AisaWorksCarousel works={aisaWorks} />
        </AisaRevealSection>

        <AisaRevealSection id="profile" className={styles.profile}>
          <div className={styles.profilePhoto}>
            <Image src={aisaProfile.image} alt={aisaProfile.imageAlt} fill sizes="(max-width: 768px) 70vw, 40vw" />
          </div>
          <div className={styles.profileCopy}>
            <div className={`${styles.heading} ${styles.headingLeft}`}>
              <span>PROFILE</span><h2>{aisaProfile.name}</h2><small>{aisaProfile.nameEn}</small><em>{aisaProfile.role}</em>
            </div>
            <h3>{aisaProfile.lead}</h3>
            <div className={styles.profileBody}>
              {aisaProfile.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </AisaRevealSection>

        <AisaRevealSection id="contact" className={styles.contact}>
          <div className={styles.contactInner}>
            <div className={styles.heading}><span>CONTACT</span><h2>{aisaContact.heading}</h2></div>
            <div className={styles.contactMessage}>
              {aisaContact.paragraphs.map((paragraph) => (
                <p key={paragraph[0]}>{paragraph.map((line) => <span key={line}>{line}</span>)}</p>
              ))}
            </div>
            <span className={`${styles.button} ${styles.buttonOutline} ${styles.pending}`} aria-disabled="true">
              お問い合わせ <span aria-hidden="true">→</span>
            </span>
          </div>
        </AisaRevealSection>
      </main>
    </div>
  );
}
