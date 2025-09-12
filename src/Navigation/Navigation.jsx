import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showGradeLevels, setShowGradeLevels] = useState(false);
  const location = useLocation();

  // Play sound function
  const playSound = (soundFile) => {
    if (soundEnabled) {
      const audio = new Audio(soundFile);
      audio.volume = 0.3;
      audio.play().catch(e => console.log("Audio play prevented:", e));
    }
  };

  // Set active tab based on current route
  useEffect(() => {
    const path = location.pathname.split('/')[1];
    setActiveTab(path || 'home');
  }, [location]);

  // Toggle menu
  const toggleMenu = () => {
    playSound('/sounds/menu-toggle.mp3');
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle grade levels dropdown
  const toggleGradeLevels = () => {
    playSound('/sounds/grade-toggle.mp3');
    setShowGradeLevels(!showGradeLevels);
  };

  // Navigation items
  const navItems = [
    { 
      id: 'home', 
      path: '/', 
      label: 'Home', 
      icon: '🏠', 
      sound: '/sounds/home.mp3',
    },
    { 
      id: 'alphabet', 
      path: '/alphabet', 
      label: 'ABCs', 
      icon: '🔤', 
      sound: '/sounds/abc.mp3',
    },
    { 
      id: 'numbers', 
      path: '/numbers', 
      label: '123s', 
      icon: '🔢', 
      sound: '/sounds/numbers.mp3',
    },
    { 
      id: 'shapes-colors', 
      path: '/shapes-colors', 
      label: 'Shapes & Colors', 
      icon: '⭐', 
      sound: '/sounds/shapes.mp3',
    },
    { 
      id: 'stories', 
      path: '/stories', 
      label: 'Stories', 
      icon: '📚', 
      sound: '/sounds/stories.mp3',
    },
    { 
      id: 'games', 
      path: '/games', 
      label: 'Games', 
      icon: '🎮', 
      sound: '/sounds/games.mp3',
    },
    { 
      id: 'songs', 
      path: '/songs', 
      label: 'Songs', 
      icon: '🎵', 
      sound: '/sounds/songs.mp3',
    },
  ];

  // Grade level items
  const gradeLevels = [
    {
      id: 'first-std',
      path: '/first-std',
      label: 'First Standard',
      icon: '1️⃣',
      sound: '/sounds/first-grade.mp3',
      description: 'Beginner lessons for first graders'
    },
    {
      id: 'second-std',
      path: '/second-std',
      label: 'Second Standard',
      icon: '2️⃣',
      sound: '/sounds/second-grade.mp3',
      description: 'Intermediate lessons for second graders'
    },
    {
      id: 'third-std',
      path: '/third-std',
      label: 'Third Standard',
      icon: '3️⃣',
      sound: '/sounds/third-grade.mp3',
      description: 'Advanced lessons for third graders'
    }
  ];

  return (
    <nav className="child-nav" aria-label="Main navigation">
      {/* Mobile menu button */}
      <button 
        className="menu-toggle" 
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label="Toggle menu"
      >
        <span className="hamburger"></span>
        <span className="hamburger"></span>
        <span className="hamburger"></span>
      </button>

      {/* Logo/Home link */}
      <Link 
        to="/" 
        className="nav-logo"
        onClick={() => playSound('/sounds/home.mp3')}
        aria-label="Home"
      >
        <span role="img" aria-hidden="true">👶</span>
        <span>Little Learners</span>
      </Link>

      {/* Sound toggle */}
      <button 
        className={`sound-toggle ${soundEnabled ? 'on' : 'off'}`}
        onClick={() => setSoundEnabled(!soundEnabled)}
        aria-label={soundEnabled ? 'Turn sounds off' : 'Turn sounds on'}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>

      {/* Grade Levels Dropdown */}
      <div className="grade-levels-container">
        <button 
          className="grade-levels-toggle"
          onClick={toggleGradeLevels}
          aria-expanded={showGradeLevels}
          aria-label="Select grade level"
        >
          <span className="grade-icon">📚</span>
          <span className="grade-label">Grade Levels</span>
          <span className={`dropdown-arrow ${showGradeLevels ? 'up' : 'down'}`}>▼</span>
        </button>
        
        {showGradeLevels && (
          <div className="grade-levels-dropdown">
            {gradeLevels.map(grade => (
              <Link
                key={grade.id}
                to={grade.path}
                className="grade-link"
                onClick={() => {
                  playSound(grade.sound);
                  setShowGradeLevels(false);
                }}
              >
                <span className="grade-link-icon">{grade.icon}</span>
                <div className="grade-link-info">
                  <span className="grade-link-label">{grade.label}</span>
                  <span className="grade-link-desc">{grade.description}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Main navigation */}
      <div className={`nav-items ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          {navItems.map(item => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => playSound(item.sound)}
                aria-current={activeTab === item.id ? 'page' : undefined}
              >
                <span className="nav-icon" role="img" aria-hidden="true">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Progress indicator (optional) */}
        <div className="progress-indicator">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '65%' }}></div>
          </div>
          <span>65% Complete!</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;