import React from "react";
import "./NeetssHero.css";
import { useNavigate } from "react-router-dom";

const NeetssHero = () => {
  const navigate = useNavigate();

  return (
    <section className="ss-hero">
      <div className="ss-hero-blob ss-hero-blob-1"></div>
      <div className="ss-hero-blob ss-hero-blob-2"></div>

      <div className="ss-container">
        <div className="ss-hero-content">
          <span className="ss-hero-tag">NEET SS Counselling</span>

          <h1>
            Navigate <span>NEET SS</span> Counselling with Precision
          </h1>

          <p>
            Super-speciality admissions are the most competitive in Indian
            medicine. Believers Consultancy gives you real data on DM/MCh seat
            availability, cut-offs, fee structures, and bond obligations across
            all institutes — completely free, so you can make the best decision
            for your career.
          </p>

          <div className="ss-hero-actions">
            <button onClick={() => navigate("/login")} className="ss-hero-btn">
              Get started - FREE &rarr;
            </button>
          </div>

          <div className="ss-hero-note">
            ✓ 100% Free. No subscription. No hidden charges.
          </div>
        </div>

        <div className="ss-hero-image">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900"
            alt="NEET PG Counselling"
          />
        </div>
      </div>
    </section>
  );
};

export default NeetssHero;
