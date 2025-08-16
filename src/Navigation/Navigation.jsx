import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
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

  // Navigation items
  const navItems = [
   { 
  id: 'home', 
  path: '/', 
  label: 'Home', 
  icon: '🏠', 
  sound: '/sounds/home.mp3',
  component: '/pages/Home/Home.jsx' 
},
{ 
  id: 'alphabet', 
  path: '/alphabet', 
  label: 'ABCs', 
  icon: '🔤', 
  sound: '/sounds/abc.mp3',
  component: '/pages/Alphabet/Alphabet.jsx' 
},
{ 
  id: 'numbers', 
  path: '/numbers', 
  label: '123s', 
  icon: '🔢', 
  sound: '/sounds/numbers.mp3',
  component: '/pages/Numbers/Numbers.jsx' 
},
{ 
  id: 'shapes-colors', 
  path: '/shapes-colors', 
  label: 'Shapes & Colors', 
  icon: '⭐', 
  sound: '/sounds/shapes.mp3',
  component: '/pages/ShapesColors/ShapesColors.jsx' 
},
{ 
  id: 'stories', 
  path: '/stories', 
  label: 'Stories', 
  icon: '📚', 
  sound: '/sounds/stories.mp3',
  component: '/pages/Stories/Stories.jsx' 
},
{ 
  id: 'games', 
  path: '/games', 
  label: 'Games', 
  icon: '🎮', 
  sound: '/sounds/games.mp3',
  component: '/pages/Games/Games.jsx' 
},
{ 
  id: 'songs', 
  path: '/songs', 
  label: 'Songs', 
  icon: '🎵', 
  sound: '/sounds/songs.mp3',
  component: '/pages/Songs/Songs.jsx' 
},
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