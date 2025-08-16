import React, { useState } from 'react';
import './stories.css';

const StoriesPage = () => {
  // Sample stories data
  const storiesData = [
    {
      id: 1,
      title: "The Happy Caterpillar",
      level: "Nursery",
      content: "Once upon a time, a little caterpillar named Carl loved to eat leaves. He ate and ate until one day...",
      image: "caterpillar.png",
      audio: "caterpillar-story.mp3",
      duration: "3 min",
      interactive: true,
      questions: [
        { text: "What did Carl like to eat?", options: ["Leaves", "Flowers", "Candy"], correct: 0 },
        { text: "What did Carl become at the end?", options: ["Butterfly", "Bird", "Frog"], correct: 0 }
      ]
    },
    {
      id: 2,
      title: "Counting with Bobby Bear",
      level: "Kindergarten",
      content: "Bobby Bear had 5 honey pots. He gave 2 to his friend Benny. How many does Bobby have left?",
      image: "counting-bear.png",
      audio: "counting-bear.mp3",
      duration: "5 min",
      interactive: true,
      questions: [
        { text: "How many honey pots did Bobby have?", options: ["3", "5", "7"], correct: 1 },
        { text: "How many did he give to Benny?", options: ["1", "2", "3"], correct: 1 }
      ]
    },
    {
      id: 3,
      title: "The Alphabet Adventure",
      level: "1st Grade",
      content: "A went on an adventure with B and C. They met D the dinosaur and E the elephant...",
      image: "alphabet-adventure.png",
      audio: "alphabet-story.mp3",
      duration: "7 min",
      interactive: true,
      questions: [
        { text: "Who did they meet first?", options: ["D the dinosaur", "E the elephant", "F the fox"], correct: 0 },
        { text: "What letter comes after C?", options: ["B", "D", "E"], correct: 1 }
      ]
    }
  ];

  const [currentStory, setCurrentStory] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStories = storiesData.filter(story => {
    const matchesLevel = selectedLevel === "All" || story.level === selectedLevel;
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         story.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const playStory = (story) => {
    setCurrentStory(story);
    setShowQuestions(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAudioPlaying(true);
  };

  const handleAnswer = (selectedOption) => {
    if (selectedOption === currentStory.questions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < currentStory.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowQuestions(false);
    }
  };

  return (
    <div className="stories-app">
      <header className="app-header">
        <h1>Kids Story World</h1>
        <div className="controls">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search stories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
          <div className="level-filter">
            <label>Filter by Level:</label>
            <select 
              value={selectedLevel} 
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="All">All Levels</option>
              <option value="Nursery">Nursery</option>
              <option value="Kindergarten">Kindergarten</option>
              <option value="1st Grade">1st Grade</option>
            </select>
          </div>
        </div>
      </header>

      <main className="app-main">
        {!currentStory ? (
          <div className="story-grid">
            {filteredStories.map(story => (
              <div 
                key={story.id} 
                className="story-card"
                onClick={() => playStory(story)}
              >
                <div className="story-image">
                  <img src={`/images/${story.image}`} alt={story.title} />
                  <span className={`level-badge ${story.level.replace(/\s+/g, '-').toLowerCase()}`}>
                    {story.level}
                  </span>
                </div>
                <div className="story-info">
                  <h3>{story.title}</h3>
                  <p>{story.content.substring(0, 60)}...</p>
                  <div className="story-meta">
                    <span><i className="fas fa-clock"></i> {story.duration}</span>
                    {story.interactive && <span><i className="fas fa-gamepad"></i> Interactive</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="story-player">
            <button className="back-button" onClick={() => setCurrentStory(null)}>
              <i className="fas fa-arrow-left"></i> Back to Stories
            </button>
            
            <div className="story-content">
              <div className="story-header">
                <h2>{currentStory.title}</h2>
                <span className={`level-badge ${currentStory.level.replace(/\s+/g, '-').toLowerCase()}`}>
                  {currentStory.level}
                </span>
              </div>
              
              <div className="story-media">
                <img src={`/images/${currentStory.image}`} alt={currentStory.title} />
                <div className="audio-controls">
                  <button onClick={() => setAudioPlaying(!audioPlaying)}>
                    {audioPlaying ? 
                      <i className="fas fa-pause"></i> : 
                      <i className="fas fa-play"></i>
                    }
                  </button>
                  <span>Listen to the story</span>
                </div>
              </div>
              
              <div className="story-text">
                <p>{currentStory.content}</p>
              </div>
              
              {currentStory.interactive && !showQuestions && (
                <button 
                  className="quiz-button"
                  onClick={() => setShowQuestions(true)}
                >
                  Take the Quiz! <i className="fas fa-question-circle"></i>
                </button>
              )}
              
              {showQuestions && currentStory.questions && (
                <div className="story-questions">
                  <h3>Question {currentQuestionIndex + 1} of {currentStory.questions.length}</h3>
                  <p>{currentStory.questions[currentQuestionIndex].text}</p>
                  <div className="options-grid">
                    {currentStory.questions[currentQuestionIndex].options.map((option, index) => (
                      <button 
                        key={index}
                        className="option-button"
                        onClick={() => handleAnswer(index)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {currentQuestionIndex === currentStory.questions.length - 1 && (
                    <div className="quiz-result">
                      <p>You scored {score} out of {currentStory.questions.length}!</p>
                      {score === currentStory.questions.length ? (
                        <div className="celebration">
                          <i className="fas fa-star"></i>
                          <span>Perfect! Great job!</span>
                          <i className="fas fa-star"></i>
                        </div>
                      ) : score >= currentStory.questions.length / 2 ? (
                        <p>Good try! Keep learning!</p>
                      ) : (
                        <p>Let's read the story again!</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2025 Kids Story World - Learning through fun stories</p>
      </footer>
    </div>
  );
};

export default StoriesPage;