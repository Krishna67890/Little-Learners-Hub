import React, { useState, useEffect, useRef } from 'react';
import './Stories.css';

const StoriesPage = () => {
  // Expanded stories data with more content and age-appropriate stories
  const storiesData = [
    {
      id: 1,
      title: "The Happy Caterpillar",
      level: "Nursery",
      content: "Once upon a time, a little caterpillar named Carl loved to eat leaves. He ate one leaf on Monday, two leaves on Tuesday, and kept eating all week long. He grew bigger and bigger until one day, he built a cocoon around himself. After two weeks, something amazing happened! Carl emerged as a beautiful butterfly with colorful wings.",
      image: "https://placehold.co/400x300/FFD700/000000?text=Happy+Caterpillar",
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
      content: "Bobby Bear had 5 honey pots. He was very hungry and ate one pot of honey. Then he gave 2 pots to his friend Benny. How many honey pots does Bobby have left? Let's count together: 5 minus 1 is 4, and 4 minus 2 is 2. Bobby has 2 honey pots left!",
      image: "https://placehold.co/400x300/FFA500/000000?text=Counting+Bear",
      duration: "5 min",
      interactive: true,
      questions: [
        { text: "How many honey pots did Bobby have?", options: ["3", "5", "7"], correct: 1 },
        { text: "How many did he give to Benny?", options: ["1", "2", "3"], correct: 1 },
        { text: "How many honey pots are left?", options: ["1", "2", "3"], correct: 1 }
      ]
    },
    {
      id: 3,
      title: "The Alphabet Adventure",
      level: "1st Grade",
      content: "A went on an adventure with B and C. They met D the dinosaur who was dancing, E the elephant who was eating, and F the fox who was fishing. Then they found G the goat, H the horse, and I the iguana. They all decided to have a party together in the jungle!",
      image: "https://placehold.co/400x300/90EE90/000000?text=Alphabet+Adventure",
      duration: "7 min",
      interactive: true,
      questions: [
        { text: "Who did they meet first?", options: ["D the dinosaur", "E the elephant", "F the fox"], correct: 0 },
        { text: "What letter comes after C?", options: ["B", "D", "E"], correct: 1 },
        { text: "What was the elephant doing?", options: ["Dancing", "Eating", "Fishing"], correct: 1 }
      ]
    },
    {
      id: 4,
      title: "The Rainbow Colors",
      level: "Nursery",
      content: "After the rain, a beautiful rainbow appeared in the sky. It had seven colors: Red, Orange, Yellow, Green, Blue, Indigo, and Violet. Each color was happy to be part of the rainbow. Red apples, orange oranges, yellow sun, green leaves, blue sky, indigo flowers, and violet grapes - all the colors of the rainbow!",
      image: "https://placehold.co/400x300/FFB6C1/000000?text=Rainbow+Colors",
      duration: "4 min",
      interactive: true,
      questions: [
        { text: "How many colors are in a rainbow?", options: ["5", "7", "10"], correct: 1 },
        { text: "Which color comes first in the rainbow?", options: ["Blue", "Red", "Green"], correct: 1 }
      ]
    },
    {
      id: 5,
      title: "Shapes Around Us",
      level: "Kindergarten",
      content: "Look around! There are shapes everywhere. The sun is a circle, the window is a square, the door is a rectangle, and the roof is a triangle. Cookies are circles, sandwiches are squares or triangles, and balls are spheres. Learning shapes is fun!",
      image: "https://placehold.co/400x300/ADD8E6/000000?text=Shapes+Around+Us",
      duration: "6 min",
      interactive: true,
      questions: [
        { text: "What shape is the sun?", options: ["Square", "Circle", "Triangle"], correct: 1 },
        { text: "What shape is a door?", options: ["Circle", "Rectangle", "Triangle"], correct: 1 },
        { text: "What shape is a ball?", options: ["Circle", "Sphere", "Square"], correct: 1 }
      ]
    },
    {
      id: 6,
      title: "The Four Seasons",
      level: "1st Grade",
      content: "There are four seasons in a year: Spring, Summer, Autumn, and Winter. In Spring, flowers bloom and baby animals are born. Summer is hot and sunny, perfect for swimming. Autumn leaves change color and fall from trees. Winter is cold with snow, and we wear warm clothes.",
      image: "https://placehold.co/400x300/87CEEB/000000?text=Four+Seasons",
      duration: "8 min",
      interactive: true,
      questions: [
        { text: "How many seasons are there?", options: ["3", "4", "5"], correct: 1 },
        { text: "Which season is hot and sunny?", options: ["Winter", "Summer", "Spring"], correct: 1 },
        { text: "When do leaves change color?", options: ["Spring", "Summer", "Autumn"], correct: 2 }
      ]
    },
    {
      id: 7,
      title: "Animal Families",
      level: "Senior KG",
      content: "Animals live in families too! A baby cat is called a kitten, and its mother is a queen. A baby dog is a puppy, with a mother called a bitch. Baby cows are calves, and their mothers are cows. Baby horses are foals, with mothers called mares. All animal families take care of their babies!",
      image: "https://placehold.co/400x300/FFE4B5/000000?text=Animal+Families",
      duration: "7 min",
      interactive: true,
      questions: [
        { text: "What is a baby cat called?", options: ["Puppy", "Kitten", "Calf"], correct: 1 },
        { text: "What is a baby horse called?", options: ["Puppy", "Kitten", "Foal"], correct: 2 },
        { text: "Who takes care of animal babies?", options: ["Their families", "The zoo keeper", "No one"], correct: 0 }
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
  const [voice, setVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const [rate, setRate] = useState(0.9);
  const [pitch, setPitch] = useState(1.1);
  const [volume, setVolume] = useState(1);
  const synthRef = useRef(null);

  // Initialize speech synthesis
  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    
    const loadVoices = () => {
      const availableVoices = synthRef.current.getVoices();
      setVoices(availableVoices);
      
      // Try to find a child-friendly voice
      const childVoice = availableVoices.find(voice => 
        voice.name.includes('Child') || 
        voice.name.includes('Kids') ||
        voice.name.includes('Young') ||
        voice.name.includes('Google UK English Female') ||
        voice.name.includes('Samantha')
      ) || availableVoices[0];
      
      if (childVoice) {
        setVoice(childVoice);
      }
    };
    
    // Chrome loads voices asynchronously
    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = loadVoices;
    }
    
    loadVoices();
    
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Speak text using Web Speech API
  const speak = (text, onEnd) => {
    if (!synthRef.current || !voice || audioPlaying) return;
    
    // Stop any ongoing speech
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    
    setAudioPlaying(true);
    
    utterance.onend = () => {
      setAudioPlaying(false);
      if (onEnd) onEnd();
    };
    
    utterance.onerror = () => {
      setAudioPlaying(false);
    };
    
    synthRef.current.speak(utterance);
  };

  const stopSpeech = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setAudioPlaying(false);
    }
  };

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
    stopSpeech();
    
    // Start reading the story automatically
    setTimeout(() => {
      speak(story.content, () => {
        if (story.interactive) {
          setTimeout(() => {
            speak("Would you like to take a quiz now?");
          }, 1000);
        }
      });
    }, 500);
  };

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption === currentStory.questions[currentQuestionIndex].correct;
    
    if (isCorrect) {
      setScore(score + 1);
      speak("Correct! Good job!");
    } else {
      speak(`Sorry, the correct answer is ${currentStory.questions[currentQuestionIndex].options[currentStory.questions[currentQuestionIndex].correct]}`);
    }

    if (currentQuestionIndex < currentStory.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        speak(currentStory.questions[currentQuestionIndex + 1].text);
      }, 2000);
    } else {
      setTimeout(() => {
        setShowQuestions(false);
        speak(`Quiz completed! You scored ${score + (isCorrect ? 1 : 0)} out of ${currentStory.questions.length}`);
      }, 2000);
    }
  };

  const readQuestion = () => {
    if (currentStory.questions[currentQuestionIndex]) {
      speak(currentStory.questions[currentQuestionIndex].text);
    }
  };

  const togglePlayPause = () => {
    if (audioPlaying) {
      stopSpeech();
    } else if (currentStory) {
      speak(currentStory.content);
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
            <span className="search-icon">🔍</span>
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
              <option value="Senior KG">Senior KG</option>
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
                  <img src={story.image} alt={story.title} />
                  <span className={`level-badge ${story.level.replace(/\s+/g, '-').toLowerCase()}`}>
                    {story.level}
                  </span>
                </div>
                <div className="story-info">
                  <h3>{story.title}</h3>
                  <p>{story.content.substring(0, 80)}...</p>
                  <div className="story-meta">
                    <span>⏱️ {story.duration}</span>
                    {story.interactive && <span>🎮 Interactive</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="story-player">
            <button className="back-button" onClick={() => { setCurrentStory(null); stopSpeech(); }}>
              ← Back to Stories
            </button>
            
            <div className="story-content">
              <div className="story-header">
                <h2>{currentStory.title}</h2>
                <span className={`level-badge ${currentStory.level.replace(/\s+/g, '-').toLowerCase()}`}>
                  {currentStory.level}
                </span>
              </div>
              
              <div className="story-media">
                <img src={currentStory.image} alt={currentStory.title} />
                <div className="audio-controls">
                  <button onClick={togglePlayPause} disabled={!voice}>
                    {audioPlaying ? '⏸️ Pause' : '▶️ Play'}
                  </button>
                  <span>Listen to the story</span>
                </div>

                {/* Voice Settings */}
                <div className="voice-settings">
                  <h4>Voice Settings:</h4>
                  <div className="settings-grid">
                    <div className="setting-group">
                      <label>Voice:</label>
                      <select value={voice?.name || ''} onChange={(e) => {
                        const selectedVoice = voices.find(v => v.name === e.target.value);
                        if (selectedVoice) setVoice(selectedVoice);
                      }}>
                        {voices.map(voice => (
                          <option key={voice.name} value={voice.name}>
                            {voice.name} ({voice.lang})
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="setting-group">
                      <label>Speed:</label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={rate}
                        onChange={(e) => setRate(parseFloat(e.target.value))}
                      />
                      <span>{rate.toFixed(1)}x</span>
                    </div>
                    
                    <div className="setting-group">
                      <label>Pitch:</label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={pitch}
                        onChange={(e) => setPitch(parseFloat(e.target.value))}
                      />
                      <span>{pitch.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="story-text">
                <p>{currentStory.content}</p>
              </div>
              
              {currentStory.interactive && !showQuestions && (
                <button 
                  className="quiz-button"
                  onClick={() => {
                    setShowQuestions(true);
                    speak("Get ready for the quiz! " + currentStory.questions[0].text);
                  }}
                  disabled={audioPlaying}
                >
                  Take the Quiz! ❓
                </button>
              )}
              
              {showQuestions && currentStory.questions && (
                <div className="story-questions">
                  <h3>Question {currentQuestionIndex + 1} of {currentStory.questions.length}</h3>
                  <div className="question-header">
                    <p>{currentStory.questions[currentQuestionIndex].text}</p>
                    <button 
                      className="read-aloud-btn"
                      onClick={readQuestion}
                      disabled={audioPlaying}
                    >
                      {audioPlaying ? '🔊' : '🔈'}
                    </button>
                  </div>
                  <div className="options-grid">
                    {currentStory.questions[currentQuestionIndex].options.map((option, index) => (
                      <button 
                        key={index}
                        className="option-button"
                        onClick={() => handleAnswer(index)}
                        disabled={audioPlaying}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  
                  {!showQuestions && (
                    <div className="quiz-result">
                      <h4>Quiz Completed!</h4>
                      <p>You scored {score} out of {currentStory.questions.length}!</p>
                      {score === currentStory.questions.length ? (
                        <div className="celebration">
                          ⭐
                          <span>Perfect! Great job!</span>
                          ⭐
                        </div>
                      ) : score >= currentStory.questions.length / 2 ? (
                        <p>Good try! Keep learning!</p>
                      ) : (
                        <p>Let's read the story again!</p>
                      )}
                      <button 
                        className="quiz-restart"
                        onClick={() => {
                          setShowQuestions(true);
                          setCurrentQuestionIndex(0);
                          setScore(0);
                          speak(currentStory.questions[0].text);
                        }}
                      >
                        Try Again 🔄
                      </button>
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