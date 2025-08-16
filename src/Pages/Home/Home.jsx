import React from "react";
import ActivityCard from "../../Components/ActivityCard/ActivityCard.jsx";
import "./Home.css";

const Home = () => {
  const activities = [
    {
      title: "Alphabet",
      icon: "🔤",
      color: "#3498db",
      path: "/alphabet"
    },
    {
      title: "Numbers",
      icon: "🔢",
      color: "#e74c3c",
      path: "/numbers"
    },
    {
      title: "Shapes & Colors",
      icon: "🟨",
      color: "#f1c40f",
      path: "/shapes-colors"
    },
    {
      title: "Rhymes",
      icon: "🎵",
      color: "#2ecc71",
      path: "/rhymes"
    },
    {
      title: "General Knowledge",
      icon: "🧠",
      color: "#9b59b6",
      path: "/gk"
    },
    {
      title: "Parents",
      icon: "👪",
      color: "#1abc9c",
      path: "/parents"
    }
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Little Learners!</h1>
        <p>Fun educational activities for preschool to 1st grade</p>
      </header>

      <section className="age-selector">
        <h3>Select Age Group:</h3>
        <div className="age-buttons">
          <button>Nursery</button>
          <button>LKG</button>
          <button>UKG</button>
          <button>1st Grade</button>
        </div>
      </section>

      <main className="activities-grid">
        {activities.map((activity, index) => (
          <ActivityCard
            key={index}
            title={activity.title}
            icon={activity.icon}
            color={activity.color}
            onClick={() => window.location.href = activity.path}
          />
        ))}
      </main>

      <section className="featured-section">
        <h2>Today's Featured Activity</h2>
        <div className="featured-card">
          <div className="featured-content">
            <h3>Letter Tracing</h3>
            <p>Practice writing letters with fun animations!</p>
            <button className="start-button">Start Now</button>
          </div>
          <div className="featured-image">
            <span role="img" aria-label="Pencil writing on paper">✏️📝</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;