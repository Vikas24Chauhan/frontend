import React from "react";
import "./InicetHero.css";
import { useNavigate } from "react-router-dom";

const InicetHero = () => {
  const navigate = useNavigate();

  return (
    <section className="inicet-hero">
      <div className="inicet-hero-blob inicet-hero-blob-1"></div>
      <div className="inicet-hero-blob inicet-hero-blob-2"></div>

      <div className="inicet-container">
        <div className="inicet-hero-content">
          <span className="inicet-hero-tag">INI-CET Counselling</span>

          <h1>
            Make informed decisions before submitting your <span>INI-CET</span>{" "}
            preferences
          </h1>

          <p>
            Secure your postgraduate seat with confidence using reliable
            counselling insights and verified admission data. Believers
            Consultancy helps you evaluate institute options, compare previous
            closing ranks, understand category-wise seat availability, and build
            a smarter preference list for AIIMS, JIPMER, PGIMER, NIMHANS, and
            other Institutes of National Importance.
          </p>

          <div className="inicet-hero-actions">
            <button
              onClick={() => navigate("/login")}
              className="inicet-hero-btn"
            >
              Get started - FREE &rarr;
            </button>
          </div>

          <div className="inicet-hero-note">
            ✓ 100% Free. No subscription. No hidden charges.
          </div>
        </div>

        <div className="inicet-hero-image">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900"
            alt="INI-CET Counselling"
          />
        </div>
      </div>
    </section>
  );
};

export default InicetHero;
