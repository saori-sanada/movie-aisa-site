import Image from "next/image";
import type { CSSProperties } from "react";
import { MovieContactForm } from "../components/MovieContactForm";
import { MovieHeader } from "../components/MovieHeader";
import { MovieMotionCard } from "../components/MovieMotionCard";
import { MovieRevealSection } from "../components/MovieRevealSection";
import { MovieWorkCard } from "../components/MovieWorkCard";
import { moviePage } from "../data/moviePage";
import { movieBrand } from "../data/movieBrand";

export default function MoviePage() {
  return (
    <div className="movie-design-page">
      <MovieHeader />

      <main>
        <section id="movie-top" className="movie-design-hero">
          <a className="movie-hero-brand" href="#movie-top" aria-label="まなだMOViE トップ">
            <strong>まなだ MOViE</strong>
            <span>VIDEO / CREATE</span>
          </a>
          <div className="movie-design-hero-art" role="img" aria-label="映像編集モニターの前に立つ女性クリエイター" />
          <div className="movie-design-hero-fade" aria-hidden="true" />
          <div className="movie-design-hero-copy">
            <h1>想いを、映像に。</h1>
            <p>心を動かす物語を、<br />映像というカタチに。</p>
            <a className="movie-design-button movie-design-button-fill" href="#contact">お問い合わせ <span>→</span></a>
          </div>
        </section>

        <MovieRevealSection id="services" className="movie-design-section movie-design-services">
          <div className="movie-design-heading"><span>SERVICES</span><h2>できること</h2></div>
          <div className="movie-design-service-grid">
            {moviePage.services.map((service, index) => (
              <div
                className="movie-card-reveal movie-card-reveal-service"
                key={service.title}
                style={{ "--movie-card-delay": `${index * 70}ms` } as CSSProperties}
              >
                <MovieMotionCard className="movie-design-service-card">
                  <div className="movie-design-service-icon" aria-hidden="true">{service.icon}</div>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <span className="movie-card-number" aria-hidden="true">0{index + 1}</span>
                </MovieMotionCard>
              </div>
            ))}
          </div>
        </MovieRevealSection>

        <MovieRevealSection id="works" className="movie-design-section movie-design-works">
          <div className="movie-design-heading"><span>WORKS</span><h2>制作実績</h2></div>
          <div className="movie-design-work-grid">
            {moviePage.works.map((work, index) => (
              <div
                className="movie-card-reveal movie-card-reveal-work"
                key={work.title}
                style={{ "--movie-card-delay": `${index * 70}ms` } as CSSProperties}
              >
                <MovieWorkCard work={work} />
              </div>
            ))}
          </div>
        </MovieRevealSection>

        <MovieRevealSection id="profile" className="movie-design-about">
          <div className="movie-profile-mobile-label">PROFILE</div>
          <div className="movie-design-about-photo">
            <Image src={movieBrand.profile.image} alt={movieBrand.profile.imageAlt} fill sizes="48vw" style={{ objectPosition: movieBrand.profile.objectPosition }} />
          </div>
          <div className="movie-design-about-copy">
            <div className="movie-design-heading movie-design-heading-left"><span>PROFILE</span><h2>{movieBrand.profile.name}</h2><small>{movieBrand.profile.nameEn}</small><em>{movieBrand.profile.role}</em></div>
            <h3>人の「好き」を、誰かへ届ける。</h3>
            <p>動画編集からディレクション、SNS運用まで、<br />
              「伝えること」を通して、<br />
              人や企業の想いをカタチにするお手伝いをしています。<br />
              視聴者の心に届く映像を、丁寧に、誠実に。<br />
              一緒に、素敵な作品をつくりましょう。</p>
          </div>
        </MovieRevealSection>

        <MovieRevealSection id="contact" className="movie-design-contact">
          <div className="movie-contact-inner">
            <div className="movie-design-heading"><span>CONTACT</span><h2>お問い合わせ</h2></div>
            <p className="movie-contact-lead">制作のご相談・ご依頼はこちらから。<br />内容がまだまとまっていない段階でも、<br />お気軽にご相談ください。</p>
            <MovieContactForm />
          </div>
        </MovieRevealSection>
      </main>
    </div>
  );
}
