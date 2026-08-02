import React from "react";
import "./NeetugHero.css";
import { useNavigate } from "react-router-dom";

const NeetugHero = () => {
  const navigate = useNavigate();

  return (
    <section className="neetug-hero">
      <div className="neetug-hero-blob neetug-hero-blob-1"></div>
      <div className="neetug-hero-blob neetug-hero-blob-2"></div>

      <div className="neetug-container">
        <div className="neetug-hero-content">
          <span className="neetug-hero-tag">NEET UG Counselling</span>

          <h1>
            Your <span>NEET UG</span> rank has potential. Let’s unlock the right
            college for it
          </h1>

          <p>
            Find the Right Medical Seat Based on Your Rank The NEET UG
            counselling process can feel overwhelming but it doesn’t have to be
            ZyNerd brings structure, clarity, and precision to your MBBS/BDS
            seat selection. Get access to real-time cut-offs, seat availability,
            and expert insights all in one place. Whether you're targeting a
            government college or a private institution, our advanced tools help
            you plan smart and choose confidently. Join 28,000+ students who
            have already used ZyNerd to find their best-fit medical college.
          </p>

          <div className="neetug-hero-actions">
            <button
              onClick={() => navigate("/login")}
              className="neetug-hero-btn"
            >
              Get started - FREE &rarr;
            </button>
          </div>

          <div className="neetug-hero-note">
            ✓ 100% Free. No subscription. No hidden charges.
          </div>
        </div>

        <div className="neetug-hero-image">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900"
            alt="NEET UG Counselling"
          />
        </div>
      </div>
    </section>
  );
};

export default NeetugHero;
