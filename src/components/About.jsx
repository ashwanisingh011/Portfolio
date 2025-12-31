import React from "react";
// import aboutImg from '../assets/new.png';
import aboutImg from "../assets/myIMG.jpg";
const About = () => {
  const handleConnect = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=ashwanisingh9737@gmail.com&su=Let's%20Connect&body=Hi%20Ashwani%2C%0AI'd%20love%20to%20chat%20about",
      "_blank"
    );
  };

  return (
    <div id="about">
      <img src={aboutImg} alt="Ashwani" style={{ borderRadius: "50%" }} />
      <div className="abouttxt">
        <h5>(about me)</h5>
        <p>
          I’m a BCA student and a full-stack web developer with experience in
          building modern, responsive, and scalable web applications. I work
          with HTML, CSS, JavaScript, React, Svelte, and the MERN stack to
          create clean and user-friendly interfaces backed by efficient
          server-side logic. I’ve completed a 4-month frontend development
          internship where I worked extensively with Svelte.js, and I actively
          contribute to open-source projects like Rocket.Chat, gaining
          real-world experience with large codebases and collaborative
          development. I’m passionate about clean code, problem-solving, and
          continuous learning, and I enjoy turning ideas into practical,
          impactful web solutions.
        </p>
        <button id="btn" onClick={handleConnect}>
          Let's talk
        </button>
      </div>
    </div>
  );
};

export default About;
