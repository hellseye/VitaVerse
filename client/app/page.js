"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Navigation scrolling state
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  // Mobile menu open state
  const [menuActive, setMenuActive] = useState(false);
  // Rating state
  const [selectedRating, setSelectedRating] = useState(0);

  // Waitlist form loading/success states
  const [waitlistStatus, setWaitlistStatus] = useState({ loading: false, message: "Reserve My Spot", style: "" });
  // Feedback form loading/success states
  const [feedbackStatus, setFeedbackStatus] = useState({ loading: false, message: "Submit Feedback", style: "" });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:2000";

  // Handle scroll-reveal IntersectionObserver and window scroll event
  useEffect(() => {
    // Scroll reveal observer
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // Scroll state for header styling and progress bar
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollHeight > 0) {
        const scrolledPercentage = (window.scrollY / totalScrollHeight) * 100;
        setScrollProgress(scrolledPercentage);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth scroll helper for anchor links
  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    setMenuActive(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Waitlist Form Handler
  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const waitlistEntry = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      city: formData.get("city")
    };

    setWaitlistStatus({ loading: true, message: "Saving...", style: "" });

    try {
      const response = await fetch(`${API_URL}/api/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(waitlistEntry)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Server error saving waitlist entry");
      }

      setWaitlistStatus({ loading: false, message: "✓ Reserved!", style: "bg-[#4ade80] text-black border-[#4ade80]" });

      setTimeout(() => {
        e.target.reset();
        setWaitlistStatus({ loading: false, message: "Reserve My Spot", style: "" });
        router.push("/thankyou");
      }, 1500);

    } catch (error) {
      console.error(error);
      const isDuplicate = error.message.toLowerCase().includes("already") || error.message.toLowerCase().includes("duplicate");
      const errorMessage = isDuplicate ? "You are already reserved" : "Start Server First";
      setWaitlistStatus({ loading: false, message: errorMessage, style: "bg-[#ef4444] text-white border-[#ef4444]" });

      setTimeout(() => {
        setWaitlistStatus({ loading: false, message: "Reserve My Spot", style: "" });
      }, 3000);
    }
  };

  // Feedback Form Handler
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const feedbackEntry = {
      name: formData.get("name"),
      email: formData.get("email"),
      feedback: formData.get("feedback"),
      rating: selectedRating
    };

    setFeedbackStatus({ loading: true, message: "Saving...", style: "" });

    try {
      const response = await fetch(`${API_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackEntry)
      });

      if (!response.ok) throw new Error("Server error saving feedback");

      setFeedbackStatus({ loading: false, message: "✓ Thank You!", style: "bg-[#4ade80] text-black border-[#4ade80]" });
      setSelectedRating(0);

      setTimeout(() => {
        e.target.reset();
        setFeedbackStatus({ loading: false, message: "Submit Feedback", style: "" });
      }, 3000);

    } catch (error) {
      console.error(error);
      setFeedbackStatus({ loading: false, message: "Start Server First", style: "bg-[#ef4444] text-white border-[#ef4444]" });

      setTimeout(() => {
        setFeedbackStatus({ loading: false, message: "Submit Feedback", style: "" });
      }, 3000);
    }
  };

  return (
    <>
      {/* NAVIGATION */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} id="nav">
        {/* Dynamic Scroll Progress Bar */}
        <div 
          className="nav-progress-bar" 
          style={{ 
            position: "absolute", 
            bottom: 0, 
            left: 0, 
            height: "1.5px", 
            background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)", 
            width: `${scrollProgress}%`, 
            transition: "width 0.08s ease-out",
            opacity: scrolled ? 1 : 0
          }}
        ></div>
        <div className="container">
          <div className="nav__inner">
            <a href="#" onClick={(e) => handleAnchorClick(e, "hero")} className="nav__logo" aria-label="VitaVerse home">
              <img src="/img/vitaverse-logo.jpeg" alt="" className="nav__logo-img" />
              VITA<span>VERSE</span>
            </a>
            <ul className={`nav__links ${menuActive ? "active" : ""}`} id="navLinks">
              <li>
                <a href="#performance" onClick={(e) => handleAnchorClick(e, "performance")} className="nav__link">
                  Performance
                </a>
              </li>
              <li>
                <a href="#intelligence" onClick={(e) => handleAnchorClick(e, "intelligence")} className="nav__link">
                  Intelligence
                </a>
              </li>
              <li>
                <a href="#design" onClick={(e) => handleAnchorClick(e, "design")} className="nav__link">
                  Design
                </a>
              </li>
              <li>
                <a href="#ecosystem" onClick={(e) => handleAnchorClick(e, "ecosystem")} className="nav__link">
                  Ecosystem
                </a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => handleAnchorClick(e, "privacy")} className="nav__link">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#waitlist" onClick={(e) => handleAnchorClick(e, "waitlist")} className="nav__cta">
                  Join Waitlist
                </a>
              </li>
            </ul>
            <button
              className="nav__burger"
              id="navBurger"
              onClick={() => setMenuActive(!menuActive)}
              aria-label="Toggle navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero section--flush" id="hero" style={{ position: "relative" }}>
        {/* Floating Luxury Ambient Glow Blobs */}
        <div className="ambient-glow" style={{ top: "10%", left: "10%", width: "350px", height: "350px", background: "var(--color-accent)" }}></div>
        <div className="ambient-glow" style={{ bottom: "10%", right: "10%", width: "450px", height: "450px", background: "rgba(201, 169, 110, 0.2)" }}></div>
        <div className="hero__bg">
          <img src="/img/vitaverse-hero.png" alt="VitaVerse luxury wellness wearable band" loading="eager" />
        </div>
        <div className="container">
          <div className="hero__content">
            <div className="hero__label">VITAVERSE</div>
            <h1 className="hero__title">
              Luxury Wellness<br />For Everyday <em>Performance.</em>
            </h1>
            <p className="hero__description">
              AI-powered wearable intelligence designed to help you understand recovery, sleep, stress, and long-term wellbeing.
            </p>
            <div className="hero__actions">
              <a href="#waitlist" onClick={(e) => handleAnchorClick(e, "waitlist")} className="btn btn--primary">
                Join Waitlist
                <span className="btn__arrow">→</span>
              </a>
              <a href="#about" onClick={(e) => handleAnchorClick(e, "about")} className="btn btn--outline">
                Discover VitaVerse
                <span className="btn__arrow">→</span>
              </a>
            </div>
          </div>
        </div>
        <div className="hero__scroll-indicator">
          <span>Scroll</span>
          <span>↓</span>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            <div className="stats__item reveal">
              <div className="stats__value">
                96<span className="stats__unit">%</span>
              </div>
              <div className="stats__label">Recovery Score</div>
            </div>
            <div className="stats__item reveal reveal-delay-1">
              <div className="stats__value">87</div>
              <div className="stats__label">Sleep Score</div>
            </div>
            <div className="stats__item reveal reveal-delay-2">
              <div className="stats__value">
                68<span className="stats__unit">ms</span>
              </div>
              <div className="stats__label">HRV</div>
            </div>
            <div className="stats__item reveal reveal-delay-3">
              <div className="stats__value">
                62<span className="stats__unit">bpm</span>
              </div>
              <div className="stats__label">Resting Heart Rate</div>
            </div>
            <div className="stats__item reveal reveal-delay-4">
              <div className="stats__value">18</div>
              <div className="stats__label">Stress Index</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="section" id="about" style={{ position: "relative", overflow: "hidden" }}>
        <div className="ambient-glow" style={{ top: "30%", left: "-10%", width: "400px", height: "400px", background: "rgba(74, 222, 128, 0.08)" }}></div>
        <div className="container">
          <div className="about__grid">
            <div className="about__image-wrap reveal float-visual">
              <img src="/img/vitaverse-lifestyle.png" alt="VitaVerse wearable on wrist" loading="lazy" />
            </div>
            <div className="reveal reveal-delay-2">
              <span className="section__label">About VitaVerse</span>
              <h2 className="section__heading">
                A New Standard in<br />Wellness Technology
              </h2>
              <div className="section__divider"></div>
              <p className="about__text">
                VitaVerse combines luxury craftsmanship, wearable intelligence, and personalized wellness into a single connected ecosystem. We believe that understanding your body should feel effortless, elegant, and deeply personal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="section" id="features" style={{ background: "var(--color-bg-elevated)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }} className="reveal">
            <span className="section__label">Core Features</span>
            <h2 className="section__heading">
              Built for Your Body.<br />Designed for Your Life.
            </h2>
          </div>
          <div className="features__grid">
            <div className="feature-card reveal">
              <div className="feature-card__icon">⌚</div>
              <h3 className="feature-card__title">Luxury Wearable</h3>
              <p className="feature-card__text">
                Titanium craftsmanship designed for everyday elegance. A wearable that feels like fine jewellery.
              </p>
            </div>
            <div className="feature-card reveal reveal-delay-1">
              <div className="feature-card__icon">🧠</div>
              <h3 className="feature-card__title">AI Health Intelligence</h3>
              <p className="feature-card__text">
                Predictive insights powered by advanced machine learning that adapts to your unique physiology.
              </p>
            </div>
            <div className="feature-card reveal reveal-delay-2">
              <div className="feature-card__icon">💪</div>
              <h3 className="feature-card__title">Recovery Tracking</h3>
              <p className="feature-card__text">
                Optimize your body with precision sleep and recovery data, delivered in real-time.
              </p>
            </div>
            <div className="feature-card reveal reveal-delay-3">
              <div className="feature-card__icon">📋</div>
              <h3 className="feature-card__title">Doctor-Ready Reports</h3>
              <p className="feature-card__text">
                Clinical-grade metrics formatted and ready to share with your physician instantly.
              </p>
            </div>
            <div className="feature-card reveal reveal-delay-4">
              <div className="feature-card__icon">🔒</div>
              <h3 className="feature-card__title">Privacy-First Design</h3>
              <p className="feature-card__text">
                End-to-end encryption and consent-based sharing. Your data, your rules, always.
              </p>
            </div>
            <div className="feature-card reveal reveal-delay-5">
              <div className="feature-card__icon">🌐</div>
              <h3 className="feature-card__title">Future Wellness Ecosystem</h3>
              <p className="feature-card__text">
                Connect with doctors, nutritionists, and wellness experts in a single ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PERFORMANCE SECTION */}
      <section className="section" id="performance" style={{ position: "relative", overflow: "hidden" }}>
        <div className="ambient-glow" style={{ top: "20%", right: "-10%", width: "400px", height: "400px", background: "rgba(201, 169, 110, 0.1)" }}></div>
        <div className="container">
          <div className="perf__grid">
            <div className="reveal">
              <span className="section__label">Performance Tracking</span>
              <h2 className="section__heading">
                Your Body Speaks.<br />VitaVerse <em style={{ fontStyle: "normal", color: "var(--color-accent)" }}>Listens.</em>
              </h2>
              <div className="section__divider"></div>
              <p className="section__subheading" style={{ marginBottom: "2.5rem" }}>
                Precision metrics that help you train smarter, recover faster, and perform at your peak every single day.
              </p>
              <ul className="perf__list">
                <li className="perf__list-item">
                  <span className="perf__list-icon">🌙</span> Sleep Tracking
                </li>
                <li className="perf__list-item">
                  <span className="perf__list-icon">⚡</span> Recovery Score
                </li>
                <li className="perf__list-item">
                  <span className="perf__list-icon">🧘</span> Stress Monitoring
                </li>
                <li className="perf__list-item">
                  <span className="perf__list-icon">❤️</span> HRV Analysis
                </li>
                <li className="perf__list-item">
                  <span className="perf__list-icon">✅</span> Daily Readiness
                </li>
              </ul>
            </div>
            <div className="perf__visual reveal reveal-delay-2 float-visual">
              <img src="/img/vitaverse-lifestyle.png" alt="VitaVerse performance tracking" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* INTELLIGENCE SECTION */}
      <section className="section" id="intelligence" style={{ background: "var(--color-bg-elevated)", position: "relative", overflow: "hidden" }}>
        <div className="ambient-glow" style={{ bottom: "10%", left: "-10%", width: "450px", height: "450px", background: "rgba(74, 222, 128, 0.08)" }}></div>
        <div className="container">
          <div className="perf__grid">
            <div className="perf__visual reveal float-visual">
              <img src="/img/vitaverse-hero.png" alt="VitaVerse AI intelligence" loading="lazy" />
            </div>
            <div className="reveal reveal-delay-2">
              <span className="section__label">AI Intelligence</span>
              <h2 className="section__heading">
                Predictive. Adaptive.<br />
                <em style={{ fontStyle: "normal", color: "var(--color-accent)" }}>Personal.</em>
              </h2>
              <div className="section__divider"></div>
              <p className="section__subheading" style={{ marginBottom: "2.5rem" }}>
                Machine learning that understands your patterns, predicts your needs, and adapts to your evolving health journey.
              </p>
              <ul className="perf__list">
                <li className="perf__list-item">
                  <span className="perf__list-icon">📊</span> Predictive Analytics
                </li>
                <li className="perf__list-item">
                  <span className="perf__list-icon">🔄</span> Adaptive Learning
                </li>
                <li className="perf__list-item">
                  <span className="perf__list-icon">🎯</span> Personalized Wellness Intelligence
                </li>
                <li className="perf__list-item">
                  <span className="perf__list-icon">📋</span> Doctor-Ready Reports
                </li>
                <li className="perf__list-item">
                  <span className="perf__list-icon">🔮</span> Future Health Insights
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN SECTION */}
      <section className="section" id="design">
        <div className="container">
          <div className="design__content reveal">
            <span className="section__label">Craftsmanship</span>
            <h2 className="section__heading--large">
              Designed Like<br />Luxury <em style={{ fontStyle: "normal", color: "var(--color-accent)" }}>Jewellery.</em>
            </h2>
            <div className="section__divider" style={{ margin: "2rem auto" }}></div>
            <p className="section__subheading" style={{ margin: "0 auto" }}>
              Where precision engineering meets the artistry of fine jewellery. Every curve, every material, every detail — crafted for those who refuse to compromise.
            </p>
          </div>
          <div className="design__image reveal reveal-delay-2">
            <img src="/img/vitaverse-design.png" alt="VitaVerse titanium craftsmanship closeup" loading="lazy" />
          </div>
          <div className="design__traits reveal reveal-delay-3">
            <span className="design__trait">Premium Materials</span>
            <span className="design__trait">Titanium Craftsmanship</span>
            <span className="design__trait">Elegant Comfort</span>
            <span className="design__trait">Interchangeable Styles</span>
            <span className="design__trait">Fashion Meets Function</span>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM SECTION */}
      <section className="section" id="ecosystem" style={{ background: "var(--color-bg-elevated)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }} className="reveal">
            <span className="section__label">Wellness Ecosystem</span>
            <h2 className="section__heading">
              Your Personal<br />Wellness Network.
            </h2>
            <p className="section__subheading" style={{ margin: "1rem auto 0" }}>
              A connected ecosystem of experts and intelligence, designed around your unique health journey.
            </p>
          </div>
          <div className="ecosystem__grid">
            <div className="ecosystem__card reveal">
              <div className="ecosystem__card-icon">🩺</div>
              <h3 className="ecosystem__card-title">Doctors</h3>
            </div>
            <div className="ecosystem__card reveal reveal-delay-1">
              <div className="ecosystem__card-icon">🥗</div>
              <h3 className="ecosystem__card-title">Nutritionists</h3>
            </div>
            <div className="ecosystem__card reveal reveal-delay-2">
              <div className="ecosystem__card-icon">🏋️</div>
              <h3 className="ecosystem__card-title">Fitness Experts</h3>
            </div>
            <div className="ecosystem__card reveal reveal-delay-3">
              <div className="ecosystem__card-icon">🧘</div>
              <h3 className="ecosystem__card-title">Wellness Coaches</h3>
            </div>
            <div className="ecosystem__card reveal reveal-delay-4">
              <div className="ecosystem__card-icon">✨</div>
              <h3 className="ecosystem__card-title">Personalized Guidance</h3>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY SECTION */}
      <section className="section" id="privacy">
        <div className="container">
          <div className="privacy__grid">
            <div className="reveal">
              <span className="section__label">Privacy</span>
              <h2 className="section__heading">
                Your Data.<br />Your <em style={{ fontStyle: "normal", color: "var(--color-accent)" }}>Rules.</em>
              </h2>
              <div className="section__divider"></div>
              <p className="section__subheading">
                We believe your health data belongs to you. Not advertisers, not corporations, not third parties. Only you.
              </p>
            </div>
            <div className="privacy__items reveal reveal-delay-2">
              <div className="privacy__item">
                <div className="privacy__item-icon">🔐</div>
                <div>
                  <div className="privacy__item-title">Encrypted Storage</div>
                  <p className="privacy__item-text">
                    Military-grade encryption protects every byte of your health data.
                  </p>
                </div>
              </div>
              <div className="privacy__item">
                <div className="privacy__item-icon">🤝</div>
                <div>
                  <div className="privacy__item-title">Consent-Based Sharing</div>
                  <p className="privacy__item-text">You choose exactly who sees your data and when.</p>
                </div>
              </div>
              <div className="privacy__item">
                <div className="privacy__item-icon">👤</div>
                <div>
                  <div className="privacy__item-title">User-Controlled Access</div>
                  <p className="privacy__item-text">
                    Full control over your personal health information at all times.
                  </p>
                </div>
              </div>
              <div className="privacy__item">
                <div className="privacy__item-icon">🚫</div>
                <div>
                  <div className="privacy__item-title">Zero Data Sales</div>
                  <p className="privacy__item-text">
                    We never sell, trade, or monetize your personal data. Period.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST SECTION */}
      <section className="section waitlist" id="waitlist">
        <div className="container">
          <div className="waitlist__grid">
            <div className="reveal">
              <span className="section__label">Early Access</span>
              <h2 className="section__heading">
                Be Among<br />The <em style={{ fontStyle: "normal", color: "var(--color-accent)" }}>First.</em>
              </h2>
              <div className="section__divider"></div>
              <p className="section__subheading">
                Join the future of luxury wellness technology. Reserve your spot for exclusive founding member access and early pricing.
              </p>
            </div>
            <form className="waitlist__form reveal reveal-delay-2" id="waitlistForm" onSubmit={handleWaitlistSubmit}>
              <div className="form__field">
                <label className="form__label" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form__input"
                  placeholder="Enter your full name"
                  required
                  disabled={waitlistStatus.loading}
                />
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form__input"
                  placeholder="Enter your email address"
                  required
                  disabled={waitlistStatus.loading}
                />
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form__input"
                  placeholder="Enter your phone number"
                  disabled={waitlistStatus.loading}
                />
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="city">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="form__input"
                  placeholder="Enter your city"
                  disabled={waitlistStatus.loading}
                />
              </div>
              <button
                type="submit"
                className={`btn btn--primary ${waitlistStatus.style}`}
                style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
                disabled={waitlistStatus.loading}
              >
                {waitlistStatus.message}
                <span className="btn__arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FEEDBACK SECTION */}
      <section className="section feedback" id="feedback">
        <div className="container">
          <div className="feedback__grid">
            <div className="reveal">
              <span className="section__label">Your Voice</span>
              <h2 className="section__heading">
                Help Shape<br />
                <em style={{ fontStyle: "normal", color: "var(--color-accent)" }}>VitaVerse</em>
              </h2>
              <div className="section__divider"></div>
              <p className="section__subheading">
                Your feedback directly shapes the future of VitaVerse. Tell us what matters most to you in a wellness wearable.
              </p>
            </div>
            <form className="feedback__form reveal reveal-delay-2" id="feedbackForm" onSubmit={handleFeedbackSubmit}>
              <div className="form__field">
                <label className="form__label" htmlFor="fbName">
                  Name
                </label>
                <input
                  type="text"
                  id="fbName"
                  name="name"
                  className="form__input"
                  placeholder="Your name"
                  required
                  disabled={feedbackStatus.loading}
                />
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="fbEmail">
                  Email
                </label>
                <input
                  type="email"
                  id="fbEmail"
                  name="email"
                  className="form__input"
                  placeholder="Your email"
                  required
                  disabled={feedbackStatus.loading}
                />
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="fbFeedback">
                  Feedback
                </label>
                <textarea
                  id="fbFeedback"
                  name="feedback"
                  className="form__textarea"
                  placeholder="Share your thoughts..."
                  required
                  disabled={feedbackStatus.loading}
                ></textarea>
              </div>
              <div className="form__field">
                <label className="form__label">Rating</label>
                <div className="rating__group" id="ratingGroup">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`rating__star ${star <= selectedRating ? "active" : ""}`}
                      onClick={() => setSelectedRating(star)}
                      disabled={feedbackStatus.loading}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className={`btn btn--primary ${feedbackStatus.style}`}
                style={{ width: "100%", justifyContent: "center" }}
                disabled={feedbackStatus.loading}
              >
                {feedbackStatus.message}
                <span className="btn__arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section cta">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="reveal">
            <span className="section__label">The Future is Here</span>
            <h2 className="cta__heading">
              Join The Future Of<br />Luxury <em>Wellness.</em>
            </h2>
            <p className="section__subheading" style={{ margin: "0 auto 2.5rem" }}>
              Your life. Your health. One ecosystem.
            </p>
            <a href="#waitlist" onClick={(e) => handleAnchorClick(e, "waitlist")} className="btn btn--primary">
              Reserve Your Spot
              <span className="btn__arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div>
              <img src="/img/vitaverse-logo.jpeg" alt="VitaVerse logo" className="footer__logo" loading="lazy" />
              <div className="footer__brand-name">VITAVERSE</div>
              <p className="footer__tagline">Your Life. Your Health. One Ecosystem.</p>
            </div>
            <div className="footer__links">
              <div>
                <div className="footer__col-title">Product</div>
                <ul className="footer__col-list">
                  <li>
                    <a href="#performance" onClick={(e) => handleAnchorClick(e, "performance")} className="footer__col-link">
                      Performance
                    </a>
                  </li>
                  <li>
                    <a href="#intelligence" onClick={(e) => handleAnchorClick(e, "intelligence")} className="footer__col-link">
                      Intelligence
                    </a>
                  </li>
                  <li>
                    <a href="#design" onClick={(e) => handleAnchorClick(e, "design")} className="footer__col-link">
                      Design
                    </a>
                  </li>
                  <li>
                    <a href="#ecosystem" onClick={(e) => handleAnchorClick(e, "ecosystem")} className="footer__col-link">
                      Ecosystem
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="footer__col-title">Company</div>
                <ul className="footer__col-list">
                  <li>
                    <a href="#about" onClick={(e) => handleAnchorClick(e, "about")} className="footer__col-link">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#privacy" onClick={(e) => handleAnchorClick(e, "privacy")} className="footer__col-link">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <Link href="/privacy" className="footer__col-link">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="footer__col-link">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <div className="footer__col-title">Connect</div>
                <ul className="footer__col-list">
                  <li>
                    <a href="https://www.instagram.com/vitaverse.health" target="_blank" rel="noopener" className="footer__col-link">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info.vitaverse.health@gmail.com" className="footer__col-link">
                      info.vitaverse.health@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© VITAVERSE 2026 · All rights reserved.</span>
            <span>Your Life. Your Health. One Ecosystem.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
