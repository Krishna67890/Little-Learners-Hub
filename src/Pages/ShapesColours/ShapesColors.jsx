import React, { useState, useEffect, useRef } from 'react';
import './ShapesColors.css';

const ShapesColors = () => {
  // Shapes data with additional properties
  const shapes = [
    { name: 'Circle', sides: 'Infinite', emoji: '⭕', class: 'circle', fact: "A circle has no corners!" },
    { name: 'Triangle', sides: '3', emoji: '🔺', class: 'triangle', fact: "Triangles are the strongest shape!" },
    { name: 'Square', sides: '4', emoji: '⬛', class: 'square', fact: "All sides are equal in a square!" },
    { name: 'Rectangle', sides: '4', emoji: '🟦', class: 'rectangle', fact: "Opposite sides are equal!" },
    { name: 'Pentagon', sides: '5', emoji: '⬟', class: 'pentagon', fact: "The Pentagon building has this shape!" },
    { name: 'Hexagon', sides: '6', emoji: '⬢', class: 'hexagon', fact: "Honeycombs are made of hexagons!" },
    { name: 'Star', sides: '10', emoji: '⭐', class: 'star', fact: "Stars twinkle in the night sky!" },
    { name: 'Heart', sides: 'Curved', emoji: '❤️', class: 'heart', fact: "Hearts symbolize love!" },
    { name: 'Diamond', sides: '4', emoji: '♦️', class: 'diamond', fact: "Diamonds are precious gems!" },
    { name: 'Oval', sides: 'Curved', emoji: '🏉', class: 'oval', fact: "Eggs have an oval shape!" },
    { name: 'Crescent', sides: 'Curved', emoji: '🌙', class: 'crescent', fact: "The moon appears as a crescent sometimes!" },
    { name: 'Cross', sides: '4', emoji: '➕', class: 'cross', fact: "A cross has intersecting lines!" },
    { name: 'Arrow', sides: '7', emoji: '➡️', class: 'arrow', fact: "Arrows point in a direction!" },
    { name: 'Spiral', sides: 'Curved', emoji: '🌀', class: 'spiral', fact: "Spirals are common in nature like seashells!" },
    { name: 'Cloud', sides: 'Curved', emoji: '☁️', class: 'cloud', fact: "Clouds are fluffy and white!" }
  ];

  // Colors data with additional properties
  const colors = [
    { name: 'Red', hex: '#FF0000', emoji: '🔴', fact: "Red is the color of apples!" },
    { name: 'Orange', hex: '#FFA500', emoji: '🟠', fact: "Oranges are orange in color!" },
    { name: 'Yellow', hex: '#FFFF00', emoji: '🟡', fact: "The sun looks yellow!" },
    { name: 'Green', hex: '#008000', emoji: '🟢', fact: "Leaves are usually green!" },
    { name: 'Blue', hex: '#0000FF', emoji: '🔵', fact: "The ocean appears blue!" },
    { name: 'Purple', hex: '#800080', emoji: '🟣', fact: "Grapes can be purple!" },
    { name: 'Pink', hex: '#FFC0CB', emoji: '🌸', fact: "Pink is a pretty color!" },
    { name: 'Brown', hex: '#A52A2A', emoji: '🟤', fact: "Chocolate is brown!" },
    { name: 'Black', hex: '#000000', emoji: '⚫', fact: "Night sky is black!" },
    { name: 'White', hex: '#FFFFFF', emoji: '⚪', fact: "Snow is white!" },
    { name: 'Gray', hex: '#808080', emoji: '🐘', fact: "Elephants are often gray!" },
    { name: 'Gold', hex: '#FFD700', emoji: '🥇', fact: "Gold medals are awarded for first place!" },
    { name: 'Silver', hex: '#C0C0C0', emoji: '🥈', fact: "Silver medals are awarded for second place!" },
    { name: 'Cyan', hex: '#00FFFF', emoji: '💧', fact: "Cyan is a blue-green color!" },
    { name: 'Magenta', hex: '#FF00FF', emoji: '🌺', fact: "Magenta is a purplish-red color!" }
  ];

  // Quiz questions
  const quizQuestions = [
    {
      question: "Which shape has 3 sides?",
      options: ["Circle", "Triangle", "Square", "Pentagon"],
      answer: "Triangle",
      type: "shapes"
    },
    {
      question: "What color is the sun?",
      options: ["Blue", "Green", "Yellow", "Red"],
      answer: "Yellow",
      type: "colors"
    },
    {
      question: "How many sides does a hexagon have?",
      options: ["4", "5", "6", "7"],
      answer: "6",
      type: "shapes"
    },
    {
      question: "Which color is #FF0000?",
      options: ["Blue", "Green", "Red", "Yellow"],
      answer: "Red",
      type: "colors"
    },
    {
      question: "Which shape is like an egg?",
      options: ["Circle", "Square", "Oval", "Triangle"],
      answer: "Oval",
      type: "shapes"
    },
    {
      question: "What color are leaves usually?",
      options: ["Blue", "Green", "Red", "Yellow"],
      answer: "Green",
      type: "colors"
    },
    {
      question: "Which shape has infinite sides?",
      options: ["Triangle", "Circle", "Square", "Star"],
      answer: "Circle",
      type: "shapes"
    },
    {
      question: "What color is chocolate?",
      options: ["Brown", "Green", "Blue", "Pink"],
      answer: "Brown",
      type: "colors"
    },
    {
      question: "Which shape has 5 sides?",
      options: ["Square", "Pentagon", "Hexagon", "Star"],
      answer: "Pentagon",
      type: "shapes"
    },
    {
      question: "What color is the night sky?",
      options: ["White", "Blue", "Black", "Purple"],
      answer: "Black",
      type: "colors"
    },
    {
      question: "Which shape is often seen in the night sky?",
      options: ["Crescent", "Square", "Triangle", "Heart"],
      answer: "Crescent",
      type: "shapes"
    },
    {
      question: "What color is silver?",
      options: ["#C0C0C0", "#FFD700", "#808080", "#000000"],
      answer: "#C0C0C0",
      type: "colors"
    },
    {
      question: "Which shape points in a direction?",
      options: ["Circle", "Arrow", "Square", "Heart"],
      answer: "Arrow",
      type: "shapes"
    },
    {
      question: "What color is cyan?",
      options: ["Blue-green", "Red-yellow", "Purple-pink", "Orange-brown"],
      answer: "Blue-green",
      type: "colors"
    },
    {
      question: "Which shape is common in seashells?",
      options: ["Square", "Triangle", "Spiral", "Cross"],
      answer: "Spiral",
      type: "shapes"
    }
  ];

  // State management
  const [activeTab, setActiveTab] = useState('shapes');
  const [selectedItem, setSelectedItem] = useState(shapes[0]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizMode, setQuizMode] = useState('mixed'); // 'shapes', 'colors', or 'mixed'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showFact, setShowFact] = useState(false);
  const [recentItems, setRecentItems] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [difficulty, setDifficulty] = useState('easy'); // 'easy', 'medium', 'hard'
  const [voice, setVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const [rate, setRate] = useState(0.8);
  const [pitch, setPitch] = useState(1);
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
        voice.name.includes('Young')
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

  // Filter questions based on quiz mode and difficulty
  const getFilteredQuestions = () => {
    let filtered = quizQuestions;
    
    // Filter by type if not mixed
    if (quizMode !== 'mixed') {
      filtered = filtered.filter(q => q.type === quizMode);
    }
    
    // Filter by difficulty (for this example, we'll use question index as difficulty proxy)
    if (difficulty === 'easy') {
      filtered = filtered.slice(0, 8);
    } else if (difficulty === 'medium') {
      filtered = filtered.slice(4, 12);
    } else {
      filtered = filtered.slice(8);
    }
    
    // Shuffle questions
    return filtered.sort(() => Math.random() - 0.5).slice(0, 10);
  };

  // Speak text using Web Speech API
  const speak = (text) => {
    if (audioPlaying || !synthRef.current || !voice) return;
    
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
      if (showFact) {
        setTimeout(() => setShowFact(false), 3000);
      }
    };
    
    utterance.onerror = () => {
      setAudioPlaying(false);
    };
    
    synthRef.current.speak(utterance);
  };

  // Play audio for the selected item
  const playAudio = () => {
    if (audioPlaying) return;
    
    const textToSpeak = activeTab === 'shapes' 
      ? `This is a ${selectedItem.name}. ${selectedItem.fact}`
      : `This is the color ${selectedItem.name}. ${selectedItem.fact}`;
    
    speak(textToSpeak);
  };

  // Handle item selection
  const selectItem = (item) => {
    setSelectedItem(item);
    setShowFact(true);
    
    // Add to recent items (limit to 5)
    setRecentItems(prev => {
      const filtered = prev.filter(i => i.name !== item.name);
      return [item, ...filtered.slice(0, 4)];
    });
    
    if (autoPlay) {
      playAudio();
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  // Handle rate change
  const handleRateChange = (e) => {
    setRate(parseFloat(e.target.value));
  };

  // Handle pitch change
  const handlePitchChange = (e) => {
    setPitch(parseFloat(e.target.value));
  };

  // Handle voice change
  const handleVoiceChange = (e) => {
    const selectedVoice = voices.find(voice => voice.name === e.target.value);
    if (selectedVoice) {
      setVoice(selectedVoice);
    }
  };

  // Start quiz
  const startQuiz = () => {
    const questions = getFilteredQuestions();
    setShowQuiz(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setQuizAnswers([]);
  };

  // Handle quiz answer
  const handleAnswer = (selectedAnswer) => {
    const currentQ = getFilteredQuestions()[currentQuestion];
    const isCorrect = currentQ.answer === selectedAnswer;
    
    // Record the answer
    setQuizAnswers(prev => [...prev, {
      question: currentQ.question,
      userAnswer: selectedAnswer,
      correctAnswer: currentQ.answer,
      isCorrect
    }]);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    // Speak feedback
    const feedbackText = isCorrect 
      ? "Correct! Good job!" 
      : `Incorrect. The right answer is ${currentQ.answer}.`;
    
    speak(feedbackText);

    // Move to next question or show score
    if (currentQuestion < getFilteredQuestions().length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 2000);
    } else {
      setTimeout(() => {
        setShowScore(true);
        setShowQuiz(false);
        
        // Speak final score
        setTimeout(() => {
          speak(`Quiz completed! You scored ${score + (isCorrect ? 1 : 0)} out of ${getFilteredQuestions().length}`);
        }, 500);
      }, 2000);
    }
  };

  // Read the quiz question
  const readQuestion = () => {
    if (getFilteredQuestions()[currentQuestion]) {
      speak(getFilteredQuestions()[currentQuestion].question);
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setShowQuiz(false);
    setShowScore(false);
  };

  // Auto-play effect
  useEffect(() => {
    if (autoPlay && !showQuiz && selectedItem) {
      playAudio();
    }
  }, [selectedItem]);

  // Get current filtered questions
  const filteredQuestions = getFilteredQuestions();

  return (
    <div className="shapes-colours-container">
      {/* Header with tabs */}
      <header className="sc-header">
        <h1>Shapes & Colours</h1>
        {!showQuiz && !showScore && (
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'shapes' ? 'active' : ''}`}
              onClick={() => setActiveTab('shapes')}
            >
              Shapes
            </button>
            <button
              className={`tab ${activeTab === 'colors' ? 'active' : ''}`}
              onClick={() => setActiveTab('colors')}
            >
              Colours
            </button>
          </div>
        )}
      </header>

      {/* Main content area */}
      <main className="sc-main">
        {showQuiz ? (
          <div className="quiz-container">
            <div className="quiz-progress">
              Question {currentQuestion + 1}/{filteredQuestions.length}
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <h2 className="quiz-question">
              {filteredQuestions[currentQuestion].question}
              <button 
                className="read-aloud-btn"
                onClick={readQuestion}
                disabled={audioPlaying}
              >
                {audioPlaying ? '🔊' : '🔈'}
              </button>
            </h2>
            <div className="quiz-options">
              {filteredQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className="quiz-option"
                  onClick={() => handleAnswer(option)}
                  disabled={audioPlaying}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : showScore ? (
          <div className="score-container">
            <h2>Quiz Completed!</h2>
            <p className="score-text">
              You scored {score} out of {filteredQuestions.length}
            </p>
            <div className="score-emoji">
              {score === filteredQuestions.length ? '🎉' : score >= filteredQuestions.length / 2 ? '👍' : '😊'}
            </div>
            
            {/* Quiz review */}
            <div className="quiz-review">
              <h3>Review your answers:</h3>
              {quizAnswers.map((answer, index) => (
                <div key={index} className={`review-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                  <p><strong>Q:</strong> {answer.question}</p>
                  <p><strong>Your answer:</strong> {answer.userAnswer}</p>
                  {!answer.isCorrect && <p><strong>Correct answer:</strong> {answer.correctAnswer}</p>}
                </div>
              ))}
            </div>
            
            <button className="play-again-btn" onClick={resetQuiz}>
              Play Again
            </button>
          </div>
        ) : (
          <>
            {/* Display area */}
            <div className="display-area">
              {activeTab === 'shapes' ? (
                <div className={`shape-display ${selectedItem.class}`}>
                  <div className="shape-emoji">{selectedItem.emoji}</div>
                  <div className="item-info">
                    <h2>{selectedItem.name}</h2>
                    <p>Sides: {selectedItem.sides}</p>
                    {showFact && (
                      <div className="fun-fact">
                        <p>💡 Fun Fact: {selectedItem.fact}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div 
                  className="color-display"
                  style={{ backgroundColor: selectedItem.hex }}
                >
                  <div className="item-info">
                    <h2>{selectedItem.name}</h2>
                    <p>{selectedItem.hex}</p>
                    {showFact && (
                      <div className="fun-fact">
                        <p>💡 Fun Fact: {selectedItem.fact}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Audio controls */}
              <div className="audio-controls">
                <button
                  onClick={playAudio}
                  disabled={audioPlaying}
                  className={`play-button ${audioPlaying ? 'playing' : ''}`}
                >
                  {audioPlaying ? '🔊 Playing...' : '▶ Play Sound'}
                </button>
                
                <div className="voice-settings">
                  <div className="setting-group">
                    <label>Voice:</label>
                    <select value={voice?.name || ''} onChange={handleVoiceChange}>
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
                      onChange={handleRateChange}
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
                      onChange={handlePitchChange}
                    />
                    <span>{pitch.toFixed(1)}</span>
                  </div>
                  
                  <div className="setting-group">
                    <label>Volume:</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                    />
                    <span>{Math.round(volume * 100)}%</span>
                  </div>
                </div>
                
                <label className="autoplay-toggle">
                  <input
                    type="checkbox"
                    checked={autoPlay}
                    onChange={() => setAutoPlay(!autoPlay)}
                  />
                  Auto-play
                </label>
              </div>

              {/* Recently viewed items */}
              {recentItems.length > 0 && (
                <div className="recent-items">
                  <h3>Recently Viewed:</h3>
                  <div className="recent-items-list">
                    {recentItems.map((item, index) => (
                      <button
                        key={index}
                        className="recent-item"
                        onClick={() => selectItem(item)}
                        disabled={audioPlaying}
                      >
                        {activeTab === 'shapes' ? item.emoji : (
                          <span 
                            className="color-dot" 
                            style={{ backgroundColor: item.hex }}
                          ></span>
                        )}
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Options grid */}
            <div className="options-grid">
              {activeTab === 'shapes' ? (
                shapes.map((shape) => (
                  <button
                    key={shape.name}
                    className={`option-card ${selectedItem.name === shape.name ? 'active' : ''}`}
                    onClick={() => selectItem(shape)}
                    disabled={audioPlaying}
                  >
                    <div className={`shape-icon ${shape.class}`}>
                      {shape.emoji}
                    </div>
                    <span>{shape.name}</span>
                  </button>
                ))
              ) : (
                colors.map((color) => (
                  <button
                    key={color.name}
                    className={`option-card ${selectedItem.name === color.name ? 'active' : ''}`}
                    onClick={() => selectItem(color)}
                    style={{ backgroundColor: color.hex }}
                    disabled={audioPlaying}
                  >
                    <span className="color-emoji">{color.emoji}</span>
                    <span className="color-name">{color.name}</span>
                  </button>
                ))
              )}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="sc-footer">
        {!showQuiz && !showScore && (
          <>
            <p>Tap any shape or colour to hear its name!</p>
            <div className="quiz-settings">
              <div className="setting-group">
                <label>Quiz Mode:</label>
                <select value={quizMode} onChange={(e) => setQuizMode(e.target.value)}>
                  <option value="mixed">Mixed</option>
                  <option value="shapes">Shapes Only</option>
                  <option value="colors">Colors Only</option>
                </select>
              </div>
              <div className="setting-group">
                <label>Difficulty:</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
            <button className="quiz-button" onClick={startQuiz}>
              🎯 Take the Quiz!
            </button>
          </>
        )}
      </footer>
    </div>
  );
};

export default ShapesColors;