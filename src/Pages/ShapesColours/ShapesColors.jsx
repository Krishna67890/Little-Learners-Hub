import React, { useState, useEffect, useRef } from 'react';
import './ShapesColors.css';

const ShapesColors = () => {
  // Audio files for shapes and colors
  const shapeAudios = {
    Circle: '/audio/shapes/circle.mp3',
    Triangle: '/audio/shapes/triangle.mp3',
    Square: '/audio/shapes/square.mp3',
    Rectangle: '/audio/shapes/rectangle.mp3',
    Pentagon: '/audio/shapes/pentagon.mp3',
    Hexagon: '/audio/shapes/hexagon.mp3',
    Star: '/audio/shapes/star.mp3',
    Heart: '/audio/shapes/heart.mp3',
    Diamond: '/audio/shapes/diamond.mp3',
    Oval: '/audio/shapes/oval.mp3'
  };

  const colorAudios = {
    Red: '/audio/colors/red.mp3',
    Orange: '/audio/colors/orange.mp3',
    Yellow: '/audio/colors/yellow.mp3',
    Green: '/audio/colors/green.mp3',
    Blue: '/audio/colors/blue.mp3',
    Purple: '/audio/colors/purple.mp3',
    Pink: '/audio/colors/pink.mp3',
    Brown: '/audio/colors/brown.mp3',
    Black: '/audio/colors/black.mp3',
    White: '/audio/colors/white.mp3'
  };

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
    { name: 'Oval', sides: 'Curved', emoji: '🏉', class: 'oval', fact: "Eggs have an oval shape!" }
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
    { name: 'White', hex: '#FFFFFF', emoji: '⚪', fact: "Snow is white!" }
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
    }
  ];

  // State management
  const [activeTab, setActiveTab] = useState('shapes');
  const [selectedItem, setSelectedItem] = useState(shapes[0]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showFact, setShowFact] = useState(false);
  const audioRef = useRef(null);

  // Play audio for the selected item
  const playAudio = () => {
    if (audioPlaying) return;
    
    const audioFile = activeTab === 'shapes' 
      ? shapeAudios[selectedItem.name]
      : colorAudios[selectedItem.name];

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(audioFile);
    audio.volume = volume;
    audioRef.current = audio;

    setAudioPlaying(true);
    audio.play()
      .then(() => {
        audio.onended = () => {
          setAudioPlaying(false);
          if (showFact) {
            setTimeout(() => setShowFact(false), 3000);
          }
        };
      })
      .catch(error => {
        console.error("Audio playback error:", error);
        setAudioPlaying(false);
      });
  };

  // Handle item selection
  const selectItem = (item) => {
    setSelectedItem(item);
    setShowFact(true);
    if (autoPlay) {
      playAudio();
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Start quiz
  const startQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  // Handle quiz answer
  const handleAnswer = (selectedAnswer) => {
    const isCorrect = quizQuestions[currentQuestion].answer === selectedAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    // Play feedback sound
    const feedbackAudio = new Audio(isCorrect ? '/audio/correct.mp3' : '/audio/wrong.mp3');
    feedbackAudio.volume = volume;
    feedbackAudio.play();

    // Move to next question or show score
    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 1500);
    } else {
      setTimeout(() => {
        setShowScore(true);
        setShowQuiz(false);
      }, 1500);
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setShowQuiz(false);
    setShowScore(false);
  };

  // Auto-play effect
  useEffect(() => {
    if (autoPlay && !showQuiz) {
      playAudio();
    }
  }, [selectedItem]);

  return (
    <div className="shapes-colours-container">
      {/* Audio element */}
      <audio ref={audioRef} />
      
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
              Question {currentQuestion + 1}/{quizQuestions.length}
            </div>
            <h2 className="quiz-question">
              {quizQuestions[currentQuestion].question}
            </h2>
            <div className="quiz-options">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className="quiz-option"
                  onClick={() => handleAnswer(option)}
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
              You scored {score} out of {quizQuestions.length}
            </p>
            <div className="score-emoji">
              {score === quizQuestions.length ? '🎉' : score >= quizQuestions.length / 2 ? '👍' : '😊'}
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
                <div className="volume-control">
                  <span>🔈</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                  <span>🔊</span>
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
            </div>

            {/* Options grid */}
            <div className="options-grid">
              {activeTab === 'shapes' ? (
                shapes.map((shape) => (
                  <button
                    key={shape.name}
                    className={`option-card ${selectedItem.name === shape.name ? 'active' : ''}`}
                    onClick={() => selectItem(shape)}
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