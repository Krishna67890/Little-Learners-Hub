import React, { useState, useEffect } from 'react';
import './GameContainer.css';

const GameContainer = () => {
  // Game states
  const [currentGame, setCurrentGame] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);

  // Available educational games
  const games = [
    {
      id: 'match-shapes',
      title: 'Shape Match',
      description: 'Match the shapes to their shadows!',
      icon: '🟦',
      color: '#3498db'
    },
    {
      id: 'count-animals',
      title: 'Animal Counting',
      description: 'Count the animals and select the correct number!',
      icon: '🐘',
      color: '#2ecc71'
    },
    {
      id: 'letter-sounds',
      title: 'Letter Sounds',
      description: 'Match the letter to the picture that starts with that sound!',
      icon: '🔤',
      color: '#e74c3c'
    },
    {
      id: 'color-mixer',
      title: 'Color Mixer',
      description: 'Mix primary colors to make new colors!',
      icon: '🎨',
      color: '#9b59b6'
    }
  ];

  // Start game function
  const startGame = (gameId) => {
    setCurrentGame(gameId);
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  // Game content based on selected game
  const renderGameContent = () => {
    switch(currentGame) {
      case 'match-shapes':
        return (
          <div className="game-content">
            <h3>Match the shape to its shadow!</h3>
            {/* Shape matching game implementation would go here */}
            <div className="shapes-grid">
              {['circle', 'square', 'triangle', 'star'].map(shape => (
                <div key={shape} className="shape-card">
                  <div className={`shape ${shape}`}></div>
                  <div className="shape-shadow"></div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'count-animals':
        return (
          <div className="game-content">
            <h3>How many animals do you see?</h3>
            {/* Animal counting game implementation would go here */}
            <div className="animals-display">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="animal">🐶</span>
              ))}
            </div>
            <div className="number-options">
              {[3, 4, 5, 6].map(num => (
                <button key={num} className="number-option">{num}</button>
              ))}
            </div>
          </div>
        );
      case 'letter-sounds':
        return (
          <div className="game-content">
            <h3>Which picture starts with "{'A'}"?</h3>
            {/* Letter sounds game implementation would go here */}
            <div className="letter-options">
              {['apple', 'ball', 'cat', 'dog'].map(item => (
                <div key={item} className="letter-option">
                  <div className="letter-image">{item === 'apple' ? '🍎' : item === 'ball' ? '⚽' : item === 'cat' ? '🐱' : '🐶'}</div>
                  <div className="letter-word">{item}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'color-mixer':
        return (
          <div className="game-content">
            <h3>Mix these colors!</h3>
            {/* Color mixing game implementation would go here */}
            <div className="color-mixer">
              <div className="color red" onClick={() => mixColors('red')}></div>
              <div className="color blue" onClick={() => mixColors('blue')}></div>
              <div className="color yellow" onClick={() => mixColors('yellow')}></div>
              <div className="mix-result"></div>
            </div>
          </div>
        );
      default:
        return (
          <div className="game-selection">
            <h2>Choose a Learning Game</h2>
            <div className="games-grid">
              {games.map(game => (
                <div 
                  key={game.id}
                  className="game-card"
                  onClick={() => startGame(game.id)}
                  style={{ borderColor: game.color }}
                >
                  <div className="game-icon" style={{ backgroundColor: game.color }}>
                    {game.icon}
                  </div>
                  <h3>{game.title}</h3>
                  <p>{game.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  // Mock function for game actions
  const mixColors = (color) => {
    console.log(`Mixing with ${color}`);
    setScore(prev => prev + 5);
  };

  return (
    <div className="game-container">
      {isPlaying ? (
        <>
          <div className="game-header">
            <button className="back-button" onClick={() => setIsPlaying(false)}>
              ← Back to Games
            </button>
            <div className="game-stats">
              <span className="score">Score: {score}</span>
              <span className="timer">Time: {timeLeft}s</span>
            </div>
          </div>
          {renderGameContent()}
        </>
      ) : (
        renderGameContent()
      )}
    </div>
  );
};

export default GameContainer;