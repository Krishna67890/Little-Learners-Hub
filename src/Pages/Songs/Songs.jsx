import React, { useState } from 'react';
import './songs.css';

const SongsPage = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const songsData = [
    {
      id: 1,
      title: "ABC Song",
      description: "Learn the alphabet with this fun song!",
      image: "/images/abc-song.jpg",
      audio: "/sounds/abc-song.mp3",
      duration: "1:45",
      category: "Educational"
    },
    {
      id: 2,
      title: "Counting 1-10",
      description: "Count along with happy animals",
      image: "/images/counting-song.jpg",
      audio: "/sounds/counting-song.mp3",
      duration: "2:10",
      category: "Numbers"
    },
    {
      id: 3,
      title: "Twinkle Twinkle",
      description: "Classic lullaby for little ones",
      image: "/images/twinkle-song.jpg",
      audio: "/sounds/twinkle-song.mp3",
      duration: "1:30",
      category: "Lullaby"
    },
    {
      id: 4,
      title: "The Color Song",
      description: "Learn colors with this catchy tune",
      image: "/images/color-song.jpg",
      audio: "/sounds/color-song.mp3",
      duration: "2:05",
      category: "Colors"
    }
  ];

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    // In a real app, you would play the audio here
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real app, you would control audio playback here
  };

  return (
    <div className="songs-page">
      <h1>Fun Songs for Little Learners</h1>
      
      {!currentSong ? (
        <div className="songs-grid">
          {songsData.map(song => (
            <div 
              key={song.id} 
              className="song-card"
              onClick={() => playSong(song)}
            >
              <div className="song-image">
                <img src={song.image} alt={song.title} />
                <span className="song-duration">{song.duration}</span>
              </div>
              <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.description}</p>
                <span className="song-category">{song.category}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="song-player">
          <button 
            className="back-button" 
            onClick={() => setCurrentSong(null)}
          >
            ← Back to Songs
          </button>
          
          <div className="current-song">
            <div className="song-cover">
              <img src={currentSong.image} alt={currentSong.title} />
            </div>
            
            <div className="song-details">
              <h2>{currentSong.title}</h2>
              <p>{currentSong.description}</p>
              <span className="song-meta">{currentSong.category} • {currentSong.duration}</span>
              
              <div className="player-controls">
                <button 
                  className="play-button"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>
                
                <div className="progress-bar">
                  <div className="progress" style={{ width: '35%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongsPage;