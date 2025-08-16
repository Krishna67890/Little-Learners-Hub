// src/components/Celebration.jsx
import { useEffect } from 'react'
import './Celebration.css'

const Celebration = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.querySelector('.celebration')
      if (element) element.style.display = 'none'
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="celebration">
      <div className="celebration-item">🎉</div>
      <div className="celebration-item">✨</div>
      <div className="celebration-item">🌟</div>
    </div>
  )
}

export default Celebration