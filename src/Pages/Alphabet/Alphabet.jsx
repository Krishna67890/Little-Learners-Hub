import React, { useState, useEffect } from 'react';
import './Alphabet.css';

const Alphabet = () => {
  const alphabet = [
    { letter: 'A', word: 'Apple', emoji: '🍎' },
    { letter: 'B', word: 'Ball', emoji: '⚽' },
    { letter: 'C', word: 'Cat', emoji: '🐱' },
    { letter: 'D', word: 'Dog', emoji: '🐶' },
    { letter: 'E', word: 'Elephant', emoji: '🐘' },
    { letter: 'F', word: 'Fish', emoji: '🐟' },
    { letter: 'G', word: 'Giraffe', emoji: '🦒' },
    { letter: 'H', word: 'House', emoji: '🏠' },
    { letter: 'I', word: 'Ice Cream', emoji: '🍦' },
    { letter: 'J', word: 'Jellyfish', emoji: '🎐' },
    { letter: 'K', word: 'Kite', emoji: '🪁' },
    { letter: 'L', word: 'Lion', emoji: '🦁' },
    { letter: 'M', word: 'Monkey', emoji: '🐒' },
    { letter: 'N', word: 'Nest', emoji: '🪺' },
    { letter: 'O', word: 'Orange', emoji: '🍊' },
    { letter: 'P', word: 'Pizza', emoji: '🍕' },
    { letter: 'Q', word: 'Queen', emoji: '👑' },
    { letter: 'R', word: 'Rainbow', emoji: '🌈' },
    { letter: 'S', word: 'Sun', emoji: '☀️' },
    { letter: 'T', word: 'Tree', emoji: '🌳' },
    { letter: 'U', word: 'Umbrella', emoji: '☔' },
    { letter: 'V', word: 'Violin', emoji: '🎻' },
    { letter: 'W', word: 'Watermelon', emoji: '🍉' },
    { letter: 'X', word: 'Xylophone', emoji: '🎼' },
    { letter: 'Y', word: 'Yacht', emoji: '🛥️' },
    { letter: 'Z', word: 'Zebra', emoji: '🦓' }
  ];

  const [currentLetter, setCurrentLetter] = useState(alphabet[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [showWord, setShowWord] = useState(true);

  // Speak the letter and word
  const speak = (letterObj) => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `${letterObj.letter} for ${letterObj.word}`;
    utterance.rate = 0.8;
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  // Auto-play through alphabet
  useEffect(() => {
    let timer;
    if (autoPlay) {
      const currentIndex = alphabet.findIndex(l => l.letter === currentLetter.letter);
      const nextIndex = (currentIndex + 1) % alphabet.length;
      
      timer = setTimeout(() => {
        setCurrentLetter(alphabet[nextIndex]);
        speak(alphabet[nextIndex]);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [autoPlay, currentLetter]);

  return (
    <div className="alphabet-container">
      <h1>Alphabet Adventure</h1>
      
      <div className="letter-display">
        <div className={`big-letter ${isPlaying ? 'bounce' : ''}`}>
          {currentLetter.letter}
        </div>
        
        {showWord && (
          <div className="word-display">
            <span className="word-emoji">{currentLetter.emoji}</span>
            <span className="word-text">{currentLetter.word}</span>
          </div>
        )}
      </div>

      <div className="controls">
        <button 
          onClick={() => speak(currentLetter)} 
          disabled={isPlaying}
        >
          {isPlaying ? 'Speaking...' : '🔊 Hear Letter'}
        </button>
        
        <button onClick={() => setShowWord(!showWord)}>
          {showWord ? 'Hide Word' : 'Show Word'}
        </button>
        
        <button onClick={() => setAutoPlay(!autoPlay)}>
          {autoPlay ? '⏸ Stop Auto Play' : '▶ Auto Play A-Z'}
        </button>
      </div>

      <div className="alphabet-grid">
        {alphabet.map((letterObj) => (
          <button
            key={letterObj.letter}
            className={`letter-button ${currentLetter.letter === letterObj.letter ? 'active' : ''}`}
            onClick={() => {
              setCurrentLetter(letterObj);
              speak(letterObj);
            }}
          >
            {letterObj.letter}
          </button>
        ))}
      </div>

      <div className="letter-practice">
        <h3>Practice Writing: {currentLetter.letter}</h3>
        <div className="writing-area">
          <div className="letter-outline">{currentLetter.letter}</div>
          <div className="writing-guide"></div>
        </div>
      </div>
    </div>
  );
};

export default Alphabet;