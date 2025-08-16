// src/Components/AgeGroupSelector/AgeGroupSelector.jsx
import React from 'react'
import './AgeGroupSelector.css'

// Only one component definition exists in this file
const AgeGroupSelector = () => {
  const handleChange = (e) => {
    console.log('Age group selected:', e.target.value)
    // Add your state management logic here
  }

  return (
    <div className="age-selector">
      <label htmlFor="age-group">Select Age Group:</label>
      <select 
        id="age-group"
        onChange={handleChange} 
        defaultValue="Nursery"
        className="age-select"
      >
        <option value="Nursery">Nursery</option>
        <option value="LKG">LKG (Lower Kindergarten)</option>
        <option value="UKG">UKG (Upper Kindergarten)</option>
        <option value="1st Std">1st Standard</option>
      </select>
    </div>
  )
}

// Only one export statement at the end
export default AgeGroupSelector