import React, { useState, useEffect, useRef } from 'react';
import './Numbers.css';

const Numbers = () => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSpelling, setShowSpelling] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  // Number spellings up to 200
  const numberWords = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 
    'eighteen', 'nineteen', 'twenty'
  ];

  // Tens place spellings
  const tensWords = [
    '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
  ];

  // Generate number spelling
  const getNumberSpelling = (num) => {
    if (num <= 20) return numberWords[num];
    if (num < 100) {
      const tens = Math.floor(num / 10);
      const units = num % 10;
      return `${tensWords[tens]}${units ? '-' + numberWords[units] : ''}`;
    }
    if (num <= 200) {
      const hundreds = Math.floor(num / 100);
      const remainder = num % 100;
      return `${numberWords[hundreds]} hundred${remainder ? ' and ' + getNumberSpelling(remainder) : ''}`;
    }
    return num.toString();
  };

  // Play number pronunciation
  const playNumberSound = (num) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = getNumberSpelling(num);
    utterance.rate = 0.8;
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  // Auto-play numbers
  useEffect(() => {
    let timer;
    if (autoPlay && currentNumber < 200) {
      timer = setInterval(() => {
        setCurrentNumber(prev => {
          const nextNum = prev + 1;
          playNumberSound(nextNum);
          return nextNum;
        });
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [autoPlay, currentNumber]);

  // Handle scroll for infinite numbers
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 50 && !autoPlay) {
        setCurrentNumber(prev => prev + 10);
      }
    }
  };

  // Render number buttons
  const renderNumberButtons = () => {
    const buttons = [];
    const start = Math.max(1, currentNumber - 10);
    const end = currentNumber + 10;
    
    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          className={`number-button ${currentNumber === i ? 'active' : ''}`}
          onClick={() => {
            setCurrentNumber(i);
            playNumberSound(i);
          }}
        >
          {i}
          {showSpelling && <span className="number-spelling">{getNumberSpelling(i)}</span>}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="numbers-container" ref={containerRef} onScroll={handleScroll}>
      <h1>Number Explorer</h1>
      
      <div className="number-display">
        <div className="big-number">{currentNumber}</div>
        {showSpelling && (
          <div className="number-word">{getNumberSpelling(currentNumber)}</div>
        )}
      </div>

      <div className="controls">
        <button 
          onClick={() => playNumberSound(currentNumber)} 
          disabled={isPlaying}
        >
          {isPlaying ? 'Speaking...' : '🔊 Hear Number'}
        </button>
        
        <button onClick={() => setShowSpelling(!showSpelling)}>
          {showSpelling ? 'Hide Spelling' : 'Show Spelling'}
        </button>
        
        <button onClick={() => setAutoPlay(!autoPlay)}>
          {autoPlay ? '⏸ Stop Auto Play' : '▶ Auto Play (1-200)'}
        </button>
      </div>

      <div className="number-grid">
        {renderNumberButtons()}
      </div>

      <div className="number-facts">
        <h3>Did you know?</h3>
        <p>
          {currentNumber === 0 && "Zero is the only number that can't be represented in Roman numerals."}
          {currentNumber === 7 && "7 is considered a lucky number in many cultures."}
          {currentNumber === 13 && "13 is often considered an unlucky number in Western culture."}
          {currentNumber === 100 && "100 is the square of 10 (10 × 10 = 100)."}
          {currentNumber === 200 && "200 is the sum of the first 20 even numbers."}
        </p>
      </div>
    </div>
  );
};

export default Numbers;