import React, { useState, useEffect, useRef } from 'react';
import './Songs.css';

const Songs = () => {
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
      image: "https://source.unsplash.com/random/300x300/?stars",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      color: "#FFD700",
      duration: 30
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
      image: "https://source.unsplash.com/random/300x300/?sheep",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
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
      image: "https://source.unsplash.com/random/300x300/?egg",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
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
      image: "https://source.unsplash.com/random/300x300/?hill",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      color: "#E74C3C",
      duration: 18
    },
    {
      id: 'itsybitsy',
      title: "Itsy Bitsy Spider",
      lyrics: [
        "The itsy bitsy spider climbed up the water spout.",
        "Down came the rain and washed the spider out.",
        "Out came the sun and dried up all the rain,",
        "And the itsy bitsy spider climbed up the spout again."
      ],
      image: "https://source.unsplash.com/random/300x300/?spider",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      color: "#FF6B6B",
      duration: 22
    },
    {
      id: 'hickory',
      title: "Hickory Dickory Dock",
      lyrics: [
        "Hickory dickory dock,",
        "The mouse ran up the clock.",
        "The clock struck one,",
        "The mouse ran down,",
        "Hickory dickory dock."
      ],
      image: "https://source.unsplash.com/random/300x300/?clock",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      color: "#8E44AD",
      duration: 18
    }
  ];

  // State management
  const [currentRhyme, setCurrentRhyme] = useState(rhymes[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedLine, setHighlightedLine] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const [showActions, setShowActions] = useState(true);
  const [audioStatus, setAudioStatus] = useState('idle');
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
    };

    const handleError = () => {
      setAudioStatus('error');
      console.error("Audio loading failed");
    };

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        
        // Calculate which line should be highlighted based on current time
        const lineDuration = audio.duration / currentRhyme.lyrics.length;
        const currentLine = Math.floor(audio.currentTime / lineDuration);
        setHighlightedLine(Math.min(currentLine, currentRhyme.lyrics.length - 1));
      }
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

  // Auto-scroll to highlighted line
  useEffect(() => {
    if (autoScroll && lyricsRef.current) {
      const lines = lyricsRef.current.querySelectorAll('.lyric-line');
      if (lines[highlightedLine]) {
        lines[highlightedLine].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [highlightedLine, autoScroll]);

  // Handle audio playback
  const togglePlay = () => {
    if (audioStatus !== 'ready') return;
    
    const audio = audioRef.current;
    audio.volume = volume;
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      cancelAnimationFrame(animationRef.current);
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.error("Playback failed:", error);
          setAudioStatus('error');
        });
    }
  };

  // Handle rhyme change
  const selectRhyme = (rhyme) => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    
    setCurrentRhyme(rhyme);
    setHighlightedLine(0);
    setProgress(0);
    setAudioStatus('loading');
    
    // Force audio reload with new source
    if (audioRef.current) {
      audioRef.current.src = rhyme.audio;
      audioRef.current.load();
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

  // Handle progress bar click
  const handleProgressClick = (e) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const percentage = clickPosition / progressBar.offsetWidth;
    
    audioRef.current.currentTime = percentage * audioRef.current.duration;
    setProgress(percentage * 100);
  };

  return (
    <div className="rhymes-container" style={{ '--theme-color': currentRhyme.color }}>
      <audio
        ref={audioRef}
        src={currentRhyme.audio}
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
        onCanPlay={() => setAudioStatus('ready')}
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
                <span className="title">{rhyme.title}</span>
              </button>
            ))}
          </div>

          <div className="player-controls">
            <button
              onClick={togglePlay}
              disabled={audioStatus !== 'ready'}
              className={`play-button ${isPlaying ? 'playing' : ''}`}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>

            <div 
              className="progress-container"
              onClick={handleProgressClick}
            >
              <div 
                className="progress-bar" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>

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

            <label className="toggle-scroll">
              <input
                type="checkbox"
                checked={autoScroll}
                onChange={() => setAutoScroll(!autoScroll)}
              />
              Auto-scroll
            </label>
          </div>
        </div>
      )}

      <main className="rhyme-display">
        <div className="rhyme-visual">
          <div className="image-container">
            <img src={currentRhyme.image} alt={currentRhyme.title} />
            {isPlaying && <div className="playing-animation"></div>}
          </div>
        </div>

        <div className="rhyme-content">
          <h2 className="rhyme-title">{currentRhyme.title}</h2>
          
          <div 
            className="lyrics-container" 
            ref={lyricsRef}
          >
            {currentRhyme.lyrics.map((line, index) => (
              <p
                key={index}
                className={`lyric-line ${highlightedLine === index ? 'highlight' : ''}`}
                style={{ 
                  color: highlightedLine === index ? currentRhyme.color : 'inherit',
                  fontWeight: highlightedLine === index ? 'bold' : 'normal'
                }}
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

export default Songs;