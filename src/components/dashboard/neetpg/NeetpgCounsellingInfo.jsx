import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./NeetpgCounsellingInfo.css";
import {
  FiCheckCircle,
  FiUpload,
  FiCreditCard,
  FiUser,
  FiList,
  FiHome,
  FiExternalLink,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Content — exactly as provided, not reworded                        */
/* ------------------------------------------------------------------ */

const TIMELINE_ITEMS = [
  { title: "Registration", status: "Started", details: "MCC Portal Open" },
  { title: "Round 1", status: "Coming Soon", details: "Choice Filling" },
  { title: "Seat Allotment", status: "Round 1", details: "Result Declaration" },
  { title: "Joining", status: "Round 1", details: "Documentation" },
];

const RESULT_STEPS = [
  "Visit the official NBE website – https://nbe.edu.in/",
  "Click on NEET PG 2025 Results.",
  "Enter your NEET PG 2025 Application Number and Password.",
  "Click Submit.",
  "Your NEET PG 2025 scorecard will be displayed.",
  "Download and print your scorecard for counselling registration.",
];

const SPECIALTIES = [
  { specialty: "General Medicine", seats: "3,600+", demand: "Very High" },
  { specialty: "Radiology", seats: "1,200+", demand: "Very High" },
  { specialty: "Dermatology", seats: "700+", demand: "Very High" },
  { specialty: "Pediatrics", seats: "1,500+", demand: "High" },
  { specialty: "Obstetrics & Gynecology", seats: "1,400+", demand: "High" },
  { specialty: "Orthopedics", seats: "1,200+", demand: "High" },
  { specialty: "Anesthesiology", seats: "2,000+", demand: "High" },
  { specialty: "Psychiatry", seats: "900+", demand: "Rising" },
  { specialty: "Pathology", seats: "1,000+", demand: "Moderate" },
];

const REGISTRATION_PHASE = [
  {
    title: "Register on MCC Portal",
    details: ["Create an account with your NEET PG credentials."],
    Icon: FiUser,
  },
  {
    title: "Pay Registration Fee",
    details: ["₹5,000 for AIQ.", "₹2,000 for Deemed Universities."],
    Icon: FiCreditCard,
  },
  {
    title: "Upload Documents",
    details: ["Upload all required certificates and documents."],
    Icon: FiUpload,
  },
];

const CHOICE_PHASE = [
  {
    title: "Fill Choices",
    details: ["Select colleges and specialties according to your preference."],
    Icon: FiList,
  },
  {
    title: "Seat Allotment",
    details: ["Seats are allotted by MCC based on rank and submitted choices."],
    Icon: FiCheckCircle,
  },
  {
    title: "Report to College",
    details: ["Complete admission formalities at the allotted college."],
    Icon: FiHome,
  },
];

/* status → visual class (Started / Coming Soon / Round 1) */
const STATUS_CLASS = {
  Started: "npgd-info-status-started",
  "Coming Soon": "npgd-info-status-soon",
  "Round 1": "npgd-info-status-round",
};

/* demand → visual class (Very High / High / Rising / Moderate) */
const DEMAND_CLASS = {
  "Very High": "npgd-info-demand-veryhigh",
  High: "npgd-info-demand-high",
  Rising: "npgd-info-demand-rising",
  Moderate: "npgd-info-demand-moderate",
};

/* Renders a step's text, turning a bare URL inside it into a real link
   without altering any of the surrounding wording. */
function StepText({ text }) {
  const urlMatch = text.match(/(https?:\/\/[^\s]+)/);
  if (!urlMatch) return <>{text}</>;
  const url = urlMatch[0];
  const [before, after] = [
    text.slice(0, urlMatch.index),
    text.slice(urlMatch.index + url.length),
  ];
  return (
    <>
      {before}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="npgd-info-inline-link"
      >
        {url}
        <FiExternalLink />
      </a>
      {after}
    </>
  );
}

function NeetpgCounsellingInfo() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Every section header + body fades/slides up as it enters the viewport
      gsap.utils.toArray(".npgd-info-section").forEach((section) => {
        gsap.from(section.querySelectorAll(".npgd-info-reveal"), {
          opacity: 0,
          y: 28,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
          },
        });
      });

      // Timeline connector line draws in as the timeline scrolls into view
      const line = rootRef.current.querySelector(
        ".npgd-info-timeline-line-fill",
      );
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".npgd-info-timeline",
              start: "top 75%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          },
        );
      }

      // Table rows stagger in
      gsap.from(".npgd-info-table tbody tr", {
        opacity: 0,
        x: -16,
        duration: 0.45,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".npgd-info-table-wrap",
          start: "top 80%",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="npgd-info-root" ref={rootRef}>
      {/* ---------------- Section 1: Timeline ---------------- */}
      <section className="npgd-info-section npgd-info-timeline-section">
        <h2 className="npgd-info-heading npgd-info-reveal">
          NEET PG 2025 Counselling Timeline
        </h2>
        <p className="npgd-info-para npgd-info-reveal">
          Important dates and events for NEET PG 2025 counselling process.
        </p>

        <div className="npgd-info-timeline">
          <span className="npgd-info-timeline-line">
            <span className="npgd-info-timeline-line-fill" />
          </span>

          {TIMELINE_ITEMS.map((item) => (
            <div
              className="npgd-info-timeline-item npgd-info-reveal"
              key={item.title}
            >
              <span className="npgd-info-timeline-dot" />
              <div className="npgd-info-timeline-card">
                <div className="npgd-info-timeline-head">
                  <h3 className="npgd-info-timeline-title">{item.title}</h3>
                  <span
                    className={`npgd-info-status-badge ${STATUS_CLASS[item.status] || ""}`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="npgd-info-timeline-details">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Section 2: How to check results ---------------- */}
      <section className="npgd-info-section npgd-info-results-section">
        <h2 className="npgd-info-heading npgd-info-reveal">
          How to Check NEET PG 2025 Results?
        </h2>
        <p className="npgd-info-para npgd-info-reveal">
          Follow these steps to check your NEET PG 2025 results and download
          your scorecard.
        </p>

        <ol className="npgd-info-steps">
          {RESULT_STEPS.map((step, i) => (
            <li className="npgd-info-step npgd-info-reveal" key={i}>
              <span className="npgd-info-step-num">{i + 1}</span>
              <span className="npgd-info-step-text">
                <StepText text={step} />
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- Section 3: Popular specialties ---------------- */}
      <section className="npgd-info-section npgd-info-specialties-section">
        <h2 className="npgd-info-heading npgd-info-reveal">
          Popular NEET PG 2025 Specialties
        </h2>
        <p className="npgd-info-para npgd-info-reveal">
          Top specialties with highest demand and career opportunities.
        </p>

        <div className="npgd-info-table-wrap npgd-info-reveal">
          <table className="npgd-info-table">
            <thead>
              <tr>
                <th>Specialty</th>
                <th>Seats</th>
                <th>Demand</th>
              </tr>
            </thead>
            <tbody>
              {SPECIALTIES.map((row) => (
                <tr key={row.specialty}>
                  <td>{row.specialty}</td>
                  <td>{row.seats}</td>
                  <td>
                    <span
                      className={`npgd-info-demand-badge ${DEMAND_CLASS[row.demand] || ""}`}
                    >
                      {row.demand}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------------- Section 4: Counselling process ---------------- */}
      <section className="npgd-info-section npgd-info-process-section">
        <h2 className="npgd-info-heading npgd-info-reveal">
          NEET PG 2025 Counselling Process
        </h2>
        <p className="npgd-info-para npgd-info-reveal">
          Complete step-by-step guide for NEET PG 2025 counselling registration.
        </p>

        <div className="npgd-info-phase npgd-info-reveal">
          <h3 className="npgd-info-phase-title">Registration Phase</h3>
          <div className="npgd-info-phase-grid">
            {REGISTRATION_PHASE.map((step) => (
              <div className="npgd-info-phase-step" key={step.title}>
                <span className="npgd-info-phase-icon">
                  <step.Icon />
                </span>
                <h4 className="npgd-info-phase-step-title">{step.title}</h4>
                {step.details.map((d, i) => (
                  <p className="npgd-info-phase-step-desc" key={i}>
                    {d}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="npgd-info-phase npgd-info-reveal">
          <h3 className="npgd-info-phase-title">
            Choice Filling &amp; Seat Allotment
          </h3>
          <div className="npgd-info-phase-grid">
            {CHOICE_PHASE.map((step) => (
              <div className="npgd-info-phase-step" key={step.title}>
                <span className="npgd-info-phase-icon">
                  <step.Icon />
                </span>
                <h4 className="npgd-info-phase-step-title">{step.title}</h4>
                {step.details.map((d, i) => (
                  <p className="npgd-info-phase-step-desc" key={i}>
                    {d}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default NeetpgCounsellingInfo;
