import React from "react";
import "./SupportSection.css";
import { FaWhatsapp, FaUserFriends, FaHeadset, FaClock } from "react-icons/fa";

function SupportSection() {
  return (
    <section className="support-section">
      <div className="support-container">
        <div className="support-content">
          <span className="support-tag">We're Just One Message Away</span>

          <h2>
            Have a question <br /> specific to you?
          </h2>

          <p className="support-subtitle">
            Sometimes all you want is to talk to a person.
          </p>

          <h3>
            Trust us, we've seen it all; and if we haven't, we'll figure it out.
          </h3>

          <a
            href="https://wa.me/919211724969?text=Hi%20I%20want%20to%20talk%20to%20an%20expert"
            target="_blank"
            rel="noreferrer"
            className="support-btn"
          >
            <FaWhatsapp />
            Chat with an Expert
          </a>
        </div>

        <div className="support-cards">
          <div className="support-card card-blue">
            <div className="icon-box">
              <FaHeadset />
            </div>

            <h4>No question is off-topic</h4>

            <p>If it matters to you, it matters to us.</p>
          </div>

          <div className="support-card card-purple">
            <div className="icon-box">
              <FaUserFriends />
            </div>

            <h4>No AI. No bots.</h4>

            <p>Real humans, real conversations.</p>
          </div>

          <div className="support-card card-orange">
            <div className="icon-box">
              <FaClock />
            </div>

            <h4>We're Here for You</h4>

            <p>
              Available daily from 10 AM to 7 PM
              <br />
              (Sunday Closed).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SupportSection;
