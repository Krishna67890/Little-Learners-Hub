import React, { useState, useEffect } from 'react';
import './ProgressTracker.css';

const ProgressTracker = () => {
  const [progress, setProgress] = useState({
    alphabet: 0,
    numbers: 0,
    shapes: 0,
    rhymes: 0,
    gk: 0
  });

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('learningProgress')) || {};
    setProgress(prev => ({ ...prev, ...savedProgress }));
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('learningProgress', JSON.stringify(progress));
  }, [progress]);

  const categories = [
    { id: 'alphabet', name: 'Alphabet', color: '#3498db', icon: '🔤' },
    { id: 'numbers', name: 'Numbers', color: '#e74c3c', icon: '🔢' },
    { id: 'shapes', name: 'Shapes & Colors', color: '#f1c40f', icon: '🟨' },
    { id: 'rhymes', name: 'Rhymes', color: '#2ecc71', icon: '🎵' },
    { id: 'gk', name: 'General Knowledge', color: '#9b59b6', icon: '🧠' }
  ];

  const updateProgress = (category, value) => {
    setProgress(prev => ({
      ...prev,
      [category]: Math.min(100, Math.max(0, value))
    }));
  };

  return (
    <div className="progress-tracker">
      <h2 className="tracker-title">Learning Progress</h2>
      <div className="progress-grid">
        {categories.map(category => (
          <div key={category.id} className="progress-category">
            <div className="category-header">
              <span className="category-icon">{category.icon}</span>
              <h3>{category.name}</h3>
              <span className="percentage">{progress[category.id]}%</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar"
                style={{
                  width: `${progress[category.id]}%`,
                  backgroundColor: category.color
                }}
              ></div>
            </div>
            <div className="progress-controls">
              <button 
                onClick={() => updateProgress(category.id, progress[category.id] - 10)}
                disabled={progress[category.id] <= 0}
              >
                -
              </button>
              <button 
                onClick={() => updateProgress(category.id, progress[category.id] + 10)}
                disabled={progress[category.id] >= 100}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="overall-progress">
        <h3>Overall Completion</h3>
        <div className="circular-progress">
          <svg viewBox="0 0 100 100">
            <circle 
              className="progress-circle-bg"
              cx="50" 
              cy="50" 
              r="45"
            />
            <circle 
              className="progress-circle"
              cx="50" 
              cy="50" 
              r="45"
              strokeDasharray={`${Object.values(progress).reduce((a, b) => a + b, 0) / categories.length} 100`}
            />
          </svg>
          <div className="progress-text">
            {Math.round(Object.values(progress).reduce((a, b) => a + b, 0) / categories.length)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;