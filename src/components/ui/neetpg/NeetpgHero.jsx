import React from "react";
import "./NeetpgHero.css";
import { useNavigate } from "react-router-dom";

const NeetpgHero = () => {
  const navigate = useNavigate();

  return (
    <section className="neetpg-hero">
      <div className="neetpg-hero-blob neetpg-hero-blob-1"></div>
      <div className="neetpg-hero-blob neetpg-hero-blob-2"></div>

      <div className="neetpg-container">
        <div className="neetpg-hero-content">
          <span className="neetpg-hero-tag">NEET PG Counselling</span>

          <h1>
            Get real insights before you fill your <span>NEET PG</span> choice
            list
          </h1>

          <p>
            MD/MS Seat Planning Backed by Real Data, Not Guesswork. Choosing a
            specialisation is a major step and Believers Consultancy helps you
            take it with clarity. Align your NEET PG rank with actual seat
            trends, category-wise eligibility, and college preferences. Access
            last-round cut-offs, seat allotment trends, and tools designed to
            keep you informed at every step.
          </p>

          <div className="neetpg-hero-actions">
            <button
              onClick={() => navigate("/login")}
              className="neetpg-hero-btn"
            >
              Get started - FREE &rarr;
            </button>
          </div>

          <div className="neetpg-hero-note">
            ✓ 100% Free. No subscription. No hidden charges.
          </div>
        </div>

        <div className="neetpg-hero-image">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900"
            alt="NEET PG Counselling"
          />
        </div>
      </div>
    </section>
  );
};

export default NeetpgHero;
