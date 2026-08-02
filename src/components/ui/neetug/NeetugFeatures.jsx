import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  TrendingUp,
  FileText,
  DollarSign,
  MapPin,
  Search,
  Target,
  Building2,
  GraduationCap,
  Users,
  Calendar,
  BookOpen,
} from "lucide-react";
import "./NeetugFeatures.css";

const features = [
  {
    icon: <BarChart3 size={24} />,
    title: "Allotments",
    description:
      "Track multi-year official allotments across rounds, states, and quotas, all in one structured view.",
    colorKey: "blue",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Closing Ranks",
    description:
      "Explore multi-year cut-off ranks for every round, course and institute, filtered by category, quota, and more.",
    colorKey: "indigo",
  },
  {
    icon: <FileText size={24} />,
    title: "Seat Matrix",
    description:
      "Access real-time seat availability for each round across institutes, quotas, and categories to stay ahead.",
    colorKey: "purple",
  },
  {
    icon: <DollarSign size={24} />,
    title: "Fee, Stipend & Bond",
    description:
      "Compare tuition fees, stipends, bond obligations, and penalties categorised by institute, course and quota.",
    colorKey: "blue",
  },
  {
    icon: <MapPin size={24} />,
    title: "Allotment Mapping",
    description:
      "Track how candidates near your rank are moving across states and rounds, and spot better opportunities instantly.",
    colorKey: "orange",
  },
  {
    icon: <Search size={24} />,
    title: "Rank Scan",
    description:
      "Zoom into any rank and see what options candidates actually landed. A quick snapshot from all allotments across states.",
    colorKey: "cyan",
  },
  {
    icon: <Target size={24} />,
    title: "My Choice List",
    description:
      "Build, save, and refine multiple choice lists for each counselling with live data and smart filters.",
    colorKey: "pink",
  },
  {
    icon: <Building2 size={24} />,
    title: "Institutes",
    description:
      "Get verified information on 1000+ colleges, from beds in the hospital to facilities and clinical information.",
    colorKey: "teal",
  },
  {
    icon: <GraduationCap size={24} />,
    title: "Courses",
    description:
      "Explore all available courses with duration, recognition, and clinical info.",
    colorKey: "yellow",
  },
  {
    icon: <Users size={24} />,
    title: "Universities",
    description:
      "Browse all medical universities with their profiles, affiliations, and participating institutes.",
    colorKey: "red",
  },
  {
    icon: <Calendar size={24} />,
    title: "Counsellings",
    description:
      "Understand all quotas, counselling timelines, key events and announcements – all in one place.",
    colorKey: "violet",
  },
  {
    icon: <BookOpen size={24} />,
    title: "Resources",
    description:
      "Explore the official sources behind our data, from govt sites to verified documents.",
    colorKey: "slate",
  },
];

function NeetugFeatures() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="ug-feature">
      <div className="ug-feature-container">
        <div className="ug-feature-grid">
          <div className="ug-feature-sticky-col">
            <div className="ug-feature-dark-card">
              <h2 className="ug-feature-dark-card-title">
                Explore,
                <br />
                Choose,
                <br />
                Succeed
              </h2>
              <p className="ug-feature-dark-card-para">
                Everything you need to navigate NEET UG counselling, all in one
                free platform.
              </p>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="ug-feature-dark-card-btn"
              >
                Start Free &rarr;
              </button>
            </div>
          </div>

          <div className="ug-feature-list">
            {features.map((f, i) => (
              <div
                key={i}
                className={`ug-feature-card is-${f.colorKey} ${
                  visible ? "is-visible" : ""
                }`}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div className={`ug-feature-card-icon is-${f.colorKey}`}>
                  {f.icon}
                </div>
                <h3 className="ug-feature-card-title">{f.title}</h3>
                <p className="ug-feature-card-desc">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NeetugFeatures;
