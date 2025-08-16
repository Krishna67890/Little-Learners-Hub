import React from 'react';
import './ActivityCard.css';

const ActivityCard = ({ title, icon, color, onClick, isActive }) => {
  return (
    <div 
      className={`activity-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
      style={{ backgroundColor: color }}
      aria-label={`Activity: ${title}`}
      role="button"
      tabIndex="0"
    >
      <div className="activity-icon">{icon}</div>
      <h3 className="activity-title">{title}</h3>
    </div>
  );
};

ActivityCard.defaultProps = {
  color: '#3498db',
  isActive: false
};

export default ActivityCard;