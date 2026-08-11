import Image from "next/image";
import type { CSSProperties } from "react";
import { MovieContactForm } from "../components/MovieContactForm";
import { MovieHeader } from "../components/MovieHeader";
import { MovieMotionCard } from "../components/MovieMotionCard";
import { MovieRevealSection } from "../components/MovieRevealSection";
import { MovieServiceIcon } from "../components/MovieServiceIcon";
import { MovieWorksCarousel } from "../components/MovieWorksCarousel";
import { moviePage } from "../data/moviePage";
import { movieBrand } from "../data/movieBrand";
import { movieWorks } from "../data/movieWorks";

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
            <h1>想いを、<span>映像に。</span></h1>
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
                  <div className="movie-design-service-icon" aria-hidden="true"><MovieServiceIcon name={service.icon} /></div>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.lines.map((line) => <span key={line}>{line}</span>)}</p>
                  </div>
                  <span className="movie-card-number" aria-hidden="true">0{index + 1}</span>
                </MovieMotionCard>
              </div>
            ))}
          </div>
        </MovieRevealSection>

        <MovieRevealSection id="works" className="movie-design-section movie-design-works">
          <MovieWorksCarousel works={movieWorks} />
        </MovieRevealSection>

        <MovieRevealSection id="profile" className="movie-design-about">
          <div className="movie-profile-mobile-label">PROFILE</div>
          <div className="movie-design-about-photo">
            <Image src={movieBrand.profile.image} alt={movieBrand.profile.imageAlt} fill sizes="48vw" style={{ objectPosition: movieBrand.profile.objectPosition }} />
          </div>
          <div className="movie-design-about-copy">
            <div className="movie-design-heading movie-design-heading-left"><span>PROFILE</span><h2>{movieBrand.profile.name}</h2><small>{movieBrand.profile.nameEn}</small><em>{movieBrand.profile.role}</em></div>
            <h3>人の「好き」を、誰かへ届ける。</h3>
            <div className="movie-profile-body">
              <p>動画編集からディレクション、SNS運用まで。<br />「伝えること」を通して、人や企業の想いをカタチにするお手伝いをしています。</p>
              <p>動画制作・ディレクション歴4年。累計1,000本以上の制作に携わり、企業YouTube6チャンネル以上の運営に参画してきました。</p>
              <p>SNS運用では、9か月でフォロワー1万人達成に貢献。撮影・クリエイティブ支援では、プロフィールへのリーチや問い合わせ増加につながった事例もあります。</p>
              <p>企画・編集・進行管理から外部パートナーとの連携まで、制作全体を見渡しながら支援します。</p>
              <p>視聴者の心に届くクリエイティブを、丁寧に、誠実に。<br />一緒に、素敵な作品をつくりましょう。</p>
            </div>
          </div>
        </MovieRevealSection>

        <MovieRevealSection id="contact" className="movie-design-contact">
          <div className="movie-contact-inner">
            <div className="movie-design-heading"><span>CONTACT</span><h2>まずは、お気軽にご相談ください。</h2></div>
            <p className="movie-contact-lead">
              <span>動画制作・ディレクション・SNS運用など、<br />ご相談内容がまだ固まっていない段階でも大丈夫です。</span>
              <span>目的や状況を伺いながら、<br />必要な制作内容を一緒に整理します。</span>
            </p>
            <MovieContactForm />
          </div>
        </MovieRevealSection>
      </main>
    </div>
  );
}
