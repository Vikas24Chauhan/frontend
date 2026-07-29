import React, { useRef } from "react";
import "./Chaos.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const chaosReasons = [
  {
    title: "Unpredictable Trends",
    description:
      "Last Year's Cutoffs Won't Save You. You need multi-year trends, current seat data, and insights on how others are choosing.",
    desktopImage:
      "https://cdn.dribbble.com/userupload/48540668/file/32d29863339ae0e3e8b4246b389ee17f.webp",
    color: "from-red-100 to-red-200",
  },
  {
    title: "The Rules Vary. A Lot.",
    description:
      "Every state/counselling/quota has its own rules, fees, and eligibility, and they change every round.",
    desktopImage:
      "https://cdn.dribbble.com/userupload/48540669/file/a9163d61a4865ab653baabb3e8cd017b.webp",
    color: "from-blue-100 to-blue-200",
  },
  {
    title: "Decoding Quotas & Options",
    description:
      "All India Quota, State Quota, Deemed, Private, MBBS or BDS? Each path affects your fees, choices and future.",
    desktopImage:
      "https://cdn.dribbble.com/userupload/48540667/file/f80ad7f151a3abccced7712dcf0b3758.webp",
    color: "from-purple-100 to-purple-200",
  },
  {
    title: "Which College? Which Seat?",
    description:
      "160,000+ seats. 1000+ colleges. You need to find the ones that fit your rank, budget, and goals.",
    desktopImage:
      "https://cdn.dribbble.com/userupload/48540672/file/0876d3d8b122f9701539e5db8dbc89be.webp",
    color: "from-blue-100 to-blue-200",
  },
  {
    title: "Myths, PDFs and WhatsApp Advice",
    description:
      "From Telegram tips to WhatsApp groups, everyone has unreliable opinions while official data is scattered and hard to decode.",
    desktopImage:
      "https://cdn.dribbble.com/userupload/48540670/file/b88d380d49375f7e3db02dfaca93b86c.webp",
    color: "from-yellow-100 to-yellow-200",
  },
  {
    title: "Make confident choices",
    description:
      "A single mistake in your choice list can set you back. You're expected to make confident decisions on the 1st try.",
    desktopImage:
      "https://cdn.dribbble.com/userupload/48540671/file/58c26e16761efbb1f0588ff5c8621bbf.webp",
    color: "from-indigo-100 to-indigo-200",
  },
];

function Chaos() {
  const sectionRef = useRef();

  useGSAP(() => {
    gsap.from(".chaos-heading", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".chaos-heading",
        start: "top 80%",
      },
    });

    gsap.utils.toArray(".chaos-card").forEach((card, index) => {
      const image = card.querySelector(".chaos-image");
      const content = card.querySelector(".chaos-content");

      const reverse = card.classList.contains("reverse");

      gsap.from(image, {
        x: reverse ? 100 : -100,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(content, {
        x: reverse ? -100 : 100,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    });

    gsap.utils.toArray(".chaos-number-circle").forEach((circle) => {
      gsap.from(circle, {
        scale: 0,
        rotation: 180,
        duration: 0.7,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: circle,
          start: "top 85%",
        },
      });
    });
  }, []);

  return (
    <section className="chaos-section" ref={sectionRef}>
      <div className="chaos-bg"></div>

      <div className="chaos-container">
        <div className="chaos-heading">
          <h2>Welcome to the Counselling Chaos.</h2>

          <p>
            To get the best seat, here's everything you're expected to figure
            out on your own:
          </p>
        </div>

        <div className="chaos-list">
          {chaosReasons.map((reason, index) => (
            <div
              key={index}
              className={`chaos-card ${index % 2 !== 0 ? "reverse" : ""}`}
            >
              <div className="chaos-image">
                <img
                  src={reason.desktopImage}
                  alt={reason.title}
                  className="chaos-desktop-img"
                />

                <div className={`chaos-image-overlay ${reason.color}`}></div>
                <div className="chaos-dark-overlay"></div>

                <div className="chaos-image-content">
                  <div className="chaos-number-circle">{index + 1}</div>

                  <p className="chaos-challenge">Challenge #{index + 1}</p>
                </div>
              </div>

              <div className="chaos-content">
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Chaos;
