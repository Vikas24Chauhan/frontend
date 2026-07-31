import React, { useState } from "react";
import "./NeetpgFaqs.css";
import { FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function NeetpgFaqs() {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState(0);

  const faqs = [
    {
      question: "What is NEET PG counselling?",
      answer:
        "NEET PG counselling is the seat allotment process conducted after NEET PG results are declared. It determines which college and specialisation you get based on your rank, category, and choice preferences. It's conducted at both the national level (MCC) and state level.",
    },
    {
      question: "How many rounds are there in NEET PG counselling?",
      answer:
        "MCC conducts Round 1, Round 2, Round 3, and a Stray Vacancy Round for AIQ seats. State counselling authorities have their own schedule with multiple rounds. Always check the official schedule on Believers Consultancy for real-time updates.",
    },
    {
      question: "Can I participate in both AIQ and State counselling?",
      answer:
        "Yes, eligible candidates can participate in both All India Quota (AIQ) through MCC and their respective state counselling simultaneously. You need to register separately for each.",
    },
    {
      question: "What is the difference between Deemed and Government seats?",
      answer:
        "Government seats have significantly lower fees (often under ₹1 lakh/year) and are allotted through MCC or state counselling. Deemed university seats are available through MCC counselling but with much higher fees (₹10–25 lakhs/year). Bond obligations and stipends also vary significantly.",
    },
    {
      question: "Is Believers Consultancy free to use?",
      answer:
        "Yes! Believers Consultancy is 100% free. Just create an account and access all features — cut-offs, seat matrix, fee data, choice list tools, webinars, and expert guidance — without any payment, subscription, or hidden charges.",
    },
  ];

  return (
    <section className="pg-faq-section">
      <div className="pg-faq-container">
        <div className="pg-faq-header">
          <h2>Frequently Asked Questions</h2>

          <p>Everything you need to know about NEET PG counselling.</p>
        </div>

        <div className="pg-faq-list">
          {faqs.map((faq, index) => (
            <div
              className={`pg-faq-card ${activeFAQ === index ? "active" : ""}`}
              key={index}
            >
              <button
                className="pg-faq-question"
                onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
              >
                <div className="pg-faq-left">
                  <span className="pg-faq-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{faq.question}</h3>
                </div>

                <div className="pg-faq-icon">
                  {activeFAQ === index ? <FiMinus /> : <FiPlus />}
                </div>
              </button>

              <div
                className={`pg-faq-answer ${activeFAQ === index ? "show" : ""}`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pg-faq-cta">
          <div className="pg-faq-cta-content">
            <h2>Start Your NEET PG Journey</h2>

            <p>Everything is FREE | No subscriptions | No catch</p>

            <button
              onClick={() => navigate("/login")}
              className="pg-faq-cta-btn"
            >
              <span>Get started - FREE Access</span>
              <FiArrowRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NeetpgFaqs;
