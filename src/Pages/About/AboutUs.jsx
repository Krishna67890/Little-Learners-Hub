// src/Pages/AboutUs/AboutUs.jsx
import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header className="about-header">
        <h1>Little Learners Hub</h1>
        <p>Building Strong Foundations for Young Minds</p>
      </header>

      <main className="about-content">
        <section className="intro-section">
          <h2>Welcome to Little Learners Hub</h2>
          <p>
            At Little Learners Hub, we provide quality education for children from Nursery to Senior KG 
            and comprehensive study materials for students from 1st to 3rd standard. Our engaging 
            curriculum focuses on building strong foundational skills in literacy, numeracy, and 
            cognitive development through interactive and playful learning experiences.
          </p>
        </section>

        <section className="programs-section">
          <h2>Our Programs</h2>
          <div className="programs-grid">
            <div className="program-card">
              <h3>Early Childhood Program</h3>
              <p>Nursery to Senior KG</p>
              <ul>
                <li>ABCs and 123s recognition</li>
                <li>Phonics and pre-reading skills</li>
                <li>Social development activities</li>
                <li>Creative expression</li>
              </ul>
            </div>
            <div className="program-card">
              <h3>Primary Education Support</h3>
              <p>1st to 3rd Standard</p>
              <ul>
                <li>Reading and writing development</li>
                <li>Mathematics fundamentals</li>
                <li>Science exploration</li>
                <li>Study skills building</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Development Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-icon">👨‍💻</div>
              <h3>Krishna Patil Rajput</h3>
              <p>Lead Developer</p>
            </div>
            <div className="team-member">
              <div className="member-icon">👩‍🎨</div>
              <h3>Gunjan Pande</h3>
              <p>Developer</p>
            </div>
            <div className="team-member">
              <div className="member-icon">👨‍🔧</div>
              <h3>Sanket Jadhav</h3>
              <p>Developer</p>
            </div>
          </div>
        </section>

        <section className="client-section">
          <h2>Our Client</h2>
          <div className="client-info">
            <h3>Matoshri College of Engineering and Research Center</h3>
            <p>We're proud to collaborate with Matoshri College of Engineering and Research Center in developing this educational platform.</p>
          </div>
        </section>

        <section className="contact-section">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <p>Have questions or want to learn more about our programs?</p>
            <div className="email-contact">
              <strong>Email:</strong>
              <a href="mailto:krishnaajaysing.patil@matoshri.edu.in">krishnaajaysing.patil@matoshri.edu.in</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;