import React, { useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    gsap.to(imageRef.current, {
      scale: 1.15,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=1000", // Increase for slower zoom
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });
  }, []);

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-badge">🎓 100% FREE Medical Counselling</span>

          <h1>
            Your Ultimate Guide to
            <span> Medical Counselling</span>
          </h1>

          <div className="hero-typewriter">
            <Typewriter
              words={[
                "NEET PG",
                "INICET",
                "NEET UG (Coming Soon)",
                "NEET SS (Coming Soon)",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1800}
            />
          </div>

          <p>
            Counselling dates, colleges, cut-offs, fees, previous year data,
            seat matrix, documents, and everything required for hassle-free
            choice filling.
          </p>

          <h4>
            All resources are completely FREE - Just login and access
            everything.
          </h4>

          <div className="hero-buttons">
            <button className="primary-btn">Get Started</button>
          </div>
        </div>

        <div className="hero-image">
          <img
            ref={imageRef}
            src="https://layers-r2.com/cdn-cgi/image/width=2560,format=avif/28d76dae-0b2f-4a68-8bd5-09764f93df65--5.png"
            alt="Medical Counselling"
          />
        </div>
      </div>

      <div className="blur blur1"></div>
      <div className="blur blur2"></div>
    </section>
  );
}

export default Hero;
