import React, { useState, useEffect, useCallback } from 'react';
import './Games.css';

const Games = () => {
  const [activeGame, setActiveGame] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [level, setLevel] = useState(1);
  const [gameData, setGameData] = useState(null);

  // Sample games data
  const games = [
    { id: 1, name: 'Memory Match', icon: '🧠', color: '#FF9AA2', component: 'memory' },
    { id: 2, name: 'Math Puzzle', icon: '➗', color: '#FFB7B2', component: 'math' },
    { id: 3, name: 'Word Builder', icon: '🔠', color: '#FFDAC1', component: 'word' },
    { id: 4, name: 'Snake Game', icon: '🐍', color: '#E2F0CB', component: 'snake' },
    { id: 5, name: 'Color Match', icon: '🎨', color: '#B5EAD7', component: 'color' },
    { id: 6, name: 'Trivia Quiz', icon: '❓', color: '#C7CEEA', component: 'quiz' },
  ];

  // Timer effect
  useEffect(() => {
    if (activeGame && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, activeGame]);

  // Memory Game Logic
  const generateMemoryCards = useCallback((level) => {
    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'];
    const pairs = Math.min(level + 2, 8); // Limit to 8 pairs max
    const selectedEmojis = emojis.slice(0, pairs);
    const cards = [...selectedEmojis, ...selectedEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, id) => ({ id, emoji, flipped: false, matched: false }));
    
    return cards;
  }, []);

  // Math Game Logic
  const generateMathProblem = useCallback((level) => {
    const operations = ['+', '-', '*'];
    const num1 = Math.floor(Math.random() * (level * 5)) + 1;
    const num2 = Math.floor(Math.random() * (level * 5)) + 1;
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer;
    switch(operation) {
      case '+': answer = num1 + num2; break;
      case '-': answer = num1 - num2; break;
      case '*': answer = num1 * num2; break;
      default: answer = num1 + num2;
    }
    
    return {
      problem: `${num1} ${operation} ${num2}`,
      answer,
      options: generateOptions(answer, level)
    };
  }, []);

  const generateOptions = (correct, level) => {
    const options = [correct];
    while (options.length < 4) {
      const variance = Math.floor(Math.random() * level * 2) + 1;
      const option = correct + (Math.random() > 0.5 ? variance : -variance);
      if (option !== correct && !options.includes(option) && option > 0) {
        options.push(option);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  // Snake Game Logic
  const initializeSnakeGame = useCallback(() => {
    const gridSize = Math.min(10 + level * 2, 20); // Increase grid with level
    const initialSnake = [
      { x: Math.floor(gridSize/2), y: Math.floor(gridSize/2) },
      { x: Math.floor(gridSize/2), y: Math.floor(gridSize/2) + 1 },
      { x: Math.floor(gridSize/2), y: Math.floor(gridSize/2) + 2 }
    ];
    const food = generateFood(initialSnake, gridSize);
    
    return {
      gridSize,
      snake: initialSnake,
      direction: 'UP',
      food,
      gameOver: false,
      speed: Math.max(200 - (level * 10), 50) // Faster with higher levels but minimum 50ms
    };
  }, [level]);

  const generateFood = (snake, gridSize) => {
    let food;
    while (!food || snake.some(segment => segment.x === food.x && segment.y === food.y)) {
      food = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      };
    }
    return food;
  };

  // Start game handler
  const startGame = (gameId) => {
    const game = games.find(g => g.id === gameId);
    setActiveGame(game);
    setTimeLeft(60);
    setScore(0);
    setLevel(1);
    
    // Initialize game data based on type
    switch(game.component) {
      case 'memory':
        setGameData({ cards: generateMemoryCards(1), flippedCards: [] });
        break;
      case 'math':
        setGameData(generateMathProblem(1));
        break;
      case 'snake':
        setGameData(initializeSnakeGame());
        break;
      default:
        setGameData({ clicks: 0 }); // For simple games
    }
  };

  const endGame = () => {
    setActiveGame(null);
    setGameData(null);
  };

  const addScore = (points) => {
    setScore(prev => prev + points);
  };

  const nextLevel = () => {
    if (level < 10) {
      setLevel(prev => prev + 1);
      // Reinitialize game with new level
      switch(activeGame.component) {
        case 'memory':
          setGameData({ cards: generateMemoryCards(level + 1), flippedCards: [] });
          break;
        case 'math':
          setGameData(generateMathProblem(level + 1));
          break;
        case 'snake':
          setGameData(initializeSnakeGame());
          break;
        default:
          setGameData({ clicks: 0 });
      }
      setTimeLeft(60);
    } else {
      endGame();
    }
  };

  // Memory Game Handlers
  const handleMemoryClick = (cardId) => {
    if (!gameData || gameData.flippedCards.length >= 2 || 
        gameData.cards[cardId].flipped || gameData.cards[cardId].matched) {
      return;
    }

    const newCards = [...gameData.cards];
    newCards[cardId].flipped = true;
    const newFlippedCards = [...gameData.flippedCards, cardId];

    setGameData(prev => ({
      ...prev,
      cards: newCards,
      flippedCards: newFlippedCards
    }));

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      if (newCards[firstId].emoji === newCards[secondId].emoji) {
        // Match found
        newCards[firstId].matched = true;
        newCards[secondId].matched = true;
        addScore(50 * level);
        
        // Check if all cards are matched
        if (newCards.every(card => card.matched)) {
          setTimeout(nextLevel, 1000);
        }
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setGameData(prev => {
            const resetCards = [...prev.cards];
            resetCards[firstId].flipped = false;
            resetCards[secondId].flipped = false;
            return { ...prev, cards: resetCards, flippedCards: [] };
          });
        }, 1000);
      }
    }
  };

  // Math Game Handlers
  const handleMathAnswer = (selectedAnswer) => {
    if (selectedAnswer === gameData.answer) {
      addScore(20 * level);
      setGameData(generateMathProblem(level));
      if (score + (20 * level) >= 100 * level) {
        setTimeout(nextLevel, 500);
      }
    } else {
      addScore(-5);
    }
  };

  // Snake Game Handlers
  const handleSnakeDirection = useCallback((e) => {
    if (!gameData || gameData.gameOver) return;
    
    const key = e.key;
    let newDirection = gameData.direction;
    
    switch(key) {
      case 'ArrowUp': if (gameData.direction !== 'DOWN') newDirection = 'UP'; break;
      case 'ArrowDown': if (gameData.direction !== 'UP') newDirection = 'DOWN'; break;
      case 'ArrowLeft': if (gameData.direction !== 'RIGHT') newDirection = 'LEFT'; break;
      case 'ArrowRight': if (gameData.direction !== 'LEFT') newDirection = 'RIGHT'; break;
      default: return;
    }
    
    setGameData(prev => ({ ...prev, direction: newDirection }));
  }, [gameData]);

  useEffect(() => {
    if (activeGame?.component === 'snake' && gameData && !gameData.gameOver) {
      const moveSnake = setInterval(() => {
        setGameData(prev => {
          if (!prev) return prev;
          
          const head = { ...prev.snake[0] };
          
          // Move head based on direction
          switch(prev.direction) {
            case 'UP': head.y -= 1; break;
            case 'DOWN': head.y += 1; break;
            case 'LEFT': head.x -= 1; break;
            case 'RIGHT': head.x += 1; break;
          }
          
          // Check for collisions
          if (
            head.x < 0 || head.x >= prev.gridSize ||
            head.y < 0 || head.y >= prev.gridSize ||
            prev.snake.some((segment, index) => index > 0 && segment.x === head.x && segment.y === head.y)
          ) {
            return { ...prev, gameOver: true };
          }
          
          const newSnake = [head, ...prev.snake];
          let newFood = prev.food;
          let scored = false;
          
          // Check if snake ate food
          if (head.x === prev.food.x && head.y === prev.food.y) {
            addScore(10 * level);
            scored = true;
            newFood = generateFood(newSnake, prev.gridSize);
          } else {
            newSnake.pop(); // Remove tail if no food eaten
          }
          
          return {
            ...prev,
            snake: newSnake,
            food: newFood,
            ...(scored && newSnake.length % 5 === 0 ? { speed: Math.max(prev.speed - 5, 50) } : {})
          };
        });
      }, gameData.speed);
      
      window.addEventListener('keydown', handleSnakeDirection);
      return () => {
        clearInterval(moveSnake);
        window.removeEventListener('keydown', handleSnakeDirection);
      };
    }
  }, [activeGame, gameData, level, handleSnakeDirection]);

  // Simple click game handler
  const handleClickGame = () => {
    addScore(10);
    setGameData(prev => ({ ...prev, clicks: (prev?.clicks || 0) + 1 }));
  };

  // Render Game Components
  const renderGame = () => {
    if (!activeGame || !gameData) return null;
    
    switch(activeGame.component) {
      case 'memory':
        return (
          <div className="memory-game">
            <h3>Level {level} - Find all matching pairs!</h3>
            <div className="memory-grid">
              {gameData.cards.map((card, index) => (
                <div
                  key={index}
                  className={`memory-card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
                  onClick={() => handleMemoryClick(index)}
                >
                  <div className="card-front">?</div>
                  <div className="card-back">{card.emoji}</div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'math':
        return (
          <div className="math-game">
            <h3>Level {level} - Solve the problem!</h3>
            <div className="math-problem">{gameData.problem} = ?</div>
            <div className="math-options">
              {gameData.options.map((option, i) => (
                <button key={i} onClick={() => handleMathAnswer(option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
        
     case 'snake':
  return (
    <div className="snake-game">
      <h3>Level {level} - Eat the food (Use arrow keys)</h3>
      <div className="snake-game-container">
        <div 
          className="snake-board"
          style={{
            gridTemplateColumns: `repeat(${gameData.gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gameData.gridSize}, 1fr)`
          }}
        >
          {gameData.gameOver ? (
            <div className="game-over">
              <h4>Game Over!</h4>
              <p>Score: {score}</p>
              <div className="game-over-buttons">
                <button onClick={() => startGame(activeGame.id)}>Try Again</button>
                <button onClick={nextLevel}>Next Level</button>
              </div>
            </div>
          ) : (
            <>
              <div 
                className="snake-food" 
                style={{
                  gridColumn: gameData.food.x + 1,
                  gridRow: gameData.food.y + 1,
                  animation: 'pulse 0.5s infinite alternate'
                }}
              />
              {gameData.snake.map((segment, i) => (
                <div 
                  key={i}
                  className={`snake-segment ${i === 0 ? 'snake-head' : ''}`}
                  style={{
                    gridColumn: segment.x + 1,
                    gridRow: segment.y + 1,
                    transition: 'all 0.1s ease'
                  }}
                />
              ))}
            </>
          )}
        </div>
        
        {/* Mobile Controls */}
        <div className="mobile-controls">
          <button 
            className="arrow-btn up" 
            onClick={() => handleArrowClick('Up')}
            aria-label="Move up"
          >
            ↑
          </button>
          <div className="horizontal-arrows">
            <button 
              className="arrow-btn left" 
              onClick={() => handleArrowClick('Left')}
              aria-label="Move left"
            >
              ←
            </button>
            <button 
              className="arrow-btn down" 
              onClick={() => handleArrowClick('Down')}
              aria-label="Move down"
            >
              ↓
            </button>
            <button 
              className="arrow-btn right" 
              onClick={() => handleArrowClick('Right')}
              aria-label="Move right"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
        
      default:
        return (
          <div className="default-game">
            <h2>Playing: {activeGame.name}</h2>
            <div className="game-area">
              <p>Clicks: {gameData.clicks || 0}</p>
              <button className="score-button" onClick={handleClickGame}>
                Click for +10 Points!
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="games-container">
      {!activeGame ? (
        <>
          <h1 className="games-title">Learning Games</h1>
          <div className="games-grid">
            {games.map((game) => (
              <div 
                key={game.id}
                className="game-card"
                style={{ '--card-color': game.color }}
                onClick={() => startGame(game.id)}
              >
                <div className="game-icon">{game.icon}</div>
                <h3>{game.name}</h3>
                <div className="card-hover-effect"></div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="game-screen">
          <div className="game-header">
            <button className="back-button" onClick={endGame}>
              ← Back to Games
            </button>
            <div className="game-stats">
              <span className="score">Score: {score}</span>
              <span className="timer">Time: {timeLeft}s</span>
              <span className="level">Level: {level}/10</span>
            </div>
          </div>
          
          <div className="game-content">
            {renderGame()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;