import React, { useState, useEffect, useRef } from 'react';
import './Rhymes.css';

const Rhymes = () => {
  const rhymes = [
    {
      id: 'twinkle',
      title: "Twinkle Twinkle Little Star",
      lyrics: [
        "Twinkle, twinkle, little star,",
        "How I wonder what you are!",
        "Up above the world so high,",
        "Like a diamond in the sky.",
        "Twinkle, twinkle, little star,",
        "How I wonder what you are!"
      ],
      image: "⭐",
      audio: "/audio/twinkle.mp3",
      color: "#FFD700",
      duration: 30 // seconds
    },
    {
      id: 'baabaa',
      title: "Baa Baa Black Sheep",
      lyrics: [
        "Baa, baa, black sheep,",
        "Have you any wool?",
        "Yes sir, yes sir,",
        "Three bags full!",
        "One for the master,",
        "One for the dame,",
        "And one for the little boy",
        "Who lives down the lane."
      ],
      image: "🐑",
      audio: "/audio/baabaa.mp3",
      color: "#9B59B6",
      duration: 25
    },
    {
      id: 'humpty',
      title: "Humpty Dumpty",
      lyrics: [
        "Humpty Dumpty sat on a wall,",
        "Humpty Dumpty had a great fall.",
        "All the king's horses",
        "And all the king's men",
        "Couldn't put Humpty together again."
      ],
      image: "🥚",
      audio: "/audio/humpty.mp3",
      color: "#3498DB",
      duration: 20
    },
    {
      id: 'jackjill',
      title: "Jack and Jill",
      lyrics: [
        "Jack and Jill went up the hill",
        "To fetch a pail of water.",
        "Jack fell down and broke his crown,",
        "And Jill came tumbling after."
      ],
      image: "👫",
      audio: "/audio/jackjill.mp3",
      color: "#E74C3C",
      duration: 18
    }
  ];

  // State management
  const [currentRhyme, setCurrentRhyme] = useState(rhymes[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedLine, setHighlightedLine] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const [showActions, setShowActions] = useState(true);
  const [audioStatus, setAudioStatus] = useState('idle'); // 'idle', 'loading', 'ready', 'error'
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  
  // Refs
  const lyricsRef = useRef(null);
  const audioRef = useRef(null);
  const animationRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setAudioStatus('ready');
      calculateLineTimings();
    };

    const handleError = () => {
      setAudioStatus('error');
      console.error("Audio loading failed");
    };

    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      cancelAnimationFrame(animationRef.current);
    };
  }, [currentRhyme]);

  // Calculate line timings based on audio duration
  const calculateLineTimings = () => {
    if (!audioRef.current) return;
    const duration = currentRhyme.duration * 1000; // ms
    const lineCount = currentRhyme.lyrics.length;
    return Array(lineCount).fill(duration / lineCount);
  };

  // Handle audio playback
  const playRhyme = () => {
    if (audioStatus !== 'ready') return;
    
    const audio = audioRef.current;
    audio.volume = volume;
    
    audio.play()
      .then(() => {
        setIsPlaying(true);
        setHighlightedLine(0);
        startLyricsSync();
      })
      .catch(error => {
        console.error("Playback failed:", error);
        setAudioStatus('error');
      });
  };

  // Sync lyrics with audio
  const startLyricsSync = () => {
    const lineTimings = calculateLineTimings();
    let startTime = Date.now();
    let lineIndex = 0;

    const updateHighlight = () => {
      const elapsed = Date.now() - startTime;
      
      if (lineIndex < lineTimings.length - 1 && elapsed > lineTimings[lineIndex]) {
        lineIndex++;
        setHighlightedLine(lineIndex);
        startTime = Date.now();
      }

      if (lineIndex < lineTimings.length - 1 || !audioRef.current.ended) {
        animationRef.current = requestAnimationFrame(updateHighlight);
      } else {
        setIsPlaying(false);
      }
    };

    animationRef.current = requestAnimationFrame(updateHighlight);
  };

  // Handle rhyme change
  const selectRhyme = (rhyme) => {
    if (isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
      setIsPlaying(false);
    }
    
    setCurrentRhyme(rhyme);
    setHighlightedLine(0);
    setProgress(0);
    setAudioStatus('loading');
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="rhymes-container" style={{ '--theme-color': currentRhyme.color }}>
      <audio
        ref={audioRef}
        src={currentRhyme.audio}
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      <header className="rhyme-header">
        <h1>Nursery Rhymes</h1>
        <button 
          onClick={() => setShowActions(!showActions)}
          className="toggle-button"
          aria-label={showActions ? 'Hide controls' : 'Show controls'}
        >
          {showActions ? '◼' : '▶'}
        </button>
      </header>

      {showActions && (
        <div className="rhyme-control-panel">
          <div className="rhyme-selector">
            {rhymes.map((rhyme) => (
              <button
                key={rhyme.id}
                onClick={() => selectRhyme(rhyme)}
                className={`rhyme-option ${currentRhyme.id === rhyme.id ? 'active' : ''}`}
                style={{ backgroundColor: rhyme.color }}
                aria-label={`Select ${rhyme.title}`}
              >
                <span className="emoji">{rhyme.image}</span>
                <span className="title">{rhyme.title}</span>
              </button>
            ))}
          </div>

          <div className="player-controls">
            <button
              onClick={isPlaying ? () => {
                audioRef.current.pause();
                setIsPlaying(false);
                cancelAnimationFrame(animationRef.current);
              } : playRhyme}
              disabled={audioStatus !== 'ready'}
              className={`play-button ${isPlaying ? 'playing' : ''}`}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <>
                  <span className="icon">❚❚</span>
                  <span className="text">Pause</span>
                </>
              ) : (
                <>
                  <span className="icon">▶</span>
                  <span className="text">
                    {audioStatus === 'loading' ? 'Loading...' : 'Play'}
                  </span>
                </>
              )}
            </button>

            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="volume-control">
              <label htmlFor="volume">Volume:</label>
              <input
                type="range"
                id="volume"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>

            <label className="toggle-scroll">
              <input
                type="checkbox"
                checked={autoScroll}
                onChange={() => setAutoScroll(!autoScroll)}
              />
              Auto-scroll lyrics
            </label>
          </div>
        </div>
      )}

      <main className="rhyme-display">
        <div className="rhyme-visual">
          <div className="image-container">
            <div className="animated-image">
              {currentRhyme.image}
            </div>
          </div>
        </div>

        <div className="rhyme-content">
          <h2 className="rhyme-title">{currentRhyme.title}</h2>
          
          <div 
            className="lyrics-container" 
            ref={lyricsRef}
            style={{ '--highlight-color': currentRhyme.color }}
          >
            {currentRhyme.lyrics.map((line, index) => (
              <p
                key={index}
                className={`lyric-line ${highlightedLine === index ? 'highlight' : ''}`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </main>

      <div className="sing-along">
        <h3>Sing Along!</h3>
        <div className="current-line">
          {currentRhyme.lyrics[highlightedLine]}
        </div>
      </div>

      {audioStatus === 'error' && (
        <div className="error-message">
          <p>Couldn't load the audio. Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default Rhymes;