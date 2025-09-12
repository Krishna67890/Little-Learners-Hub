import React, { useState, useEffect, useCallback } from 'react';
import './Games.css';

const Games = () => {
  const [activeGame, setActiveGame] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [level, setLevel] = useState(1);
  const [gameData, setGameData] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);

  // Sample games data with difficulty levels
  const games = [
    { 
      id: 1, 
      name: 'Memory Match', 
      icon: '🧠', 
      color: '#FF9AA2', 
      component: 'memory',
      description: 'Match the pairs of cards',
      difficulty: ['Preschool', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade']
    },
    { 
      id: 2, 
      name: 'Math Puzzle', 
      icon: '➗', 
      color: '#FFB7B2', 
      component: 'math',
      description: 'Solve simple math problems',
      difficulty: ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade']
    },
    { 
      id: 3, 
      name: 'Word Builder', 
      icon: '🔠', 
      color: '#FFDAC1', 
      component: 'word',
      description: 'Build words from letters',
      difficulty: ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade']
    },
    { 
      id: 4, 
      name: 'Snake Game', 
      icon: '🐍', 
      color: '#E2F0CB', 
      component: 'snake',
      description: 'Eat food with your snake',
      difficulty: ['Preschool', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade']
    },
    { 
      id: 5, 
      name: 'Color Match', 
      icon: '🎨', 
      color: '#B5EAD7', 
      component: 'color',
      description: 'Match colors and shapes',
      difficulty: ['Preschool', 'Kindergarten']
    },
    { 
      id: 6, 
      name: 'Trivia Quiz', 
      icon: '❓', 
      color: '#C7CEEA', 
      component: 'quiz',
      description: 'Answer fun questions',
      difficulty: ['1st Grade', '2nd Grade', '3rd Grade']
    },
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

  // Save game history
  useEffect(() => {
    if (!activeGame && gameHistory.length > 0) {
      localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
    }
  }, [activeGame, gameHistory]);

  // Memory Game Logic - Fixed with 10 levels
  const generateMemoryCards = useCallback((level) => {
    let emojis;
    let pairs;
    
    // Define emojis and pairs based on level
    if (level <= 3) {
      emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
      pairs = level + 2; // Levels 1-3: 3-5 pairs
    } else if (level <= 6) {
      emojis = ['🍎', '🍌', '🍇', '🍓', '🍊', '🍉', '🍒', '🥝', '🍑', '🍍'];
      pairs = level + 1; // Levels 4-6: 5-7 pairs
    } else {
      emojis = ['🚗', '🚂', '🚲', '🚀', '🚁', '🚢', '⛵', '🚜', '🏎️', '🚄', '🛸', '🚤'];
      pairs = level; // Levels 7-10: 7-10 pairs
    }
    
    // Ensure we don't request more pairs than available emojis
    pairs = Math.min(pairs, emojis.length);
    const selectedEmojis = emojis.slice(0, pairs);
    
    // Create cards with unique IDs
    const cards = [...selectedEmojis, ...selectedEmojis]
      .map((emoji, id) => ({ id: Math.random(), emoji, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);
    
    return cards;
  }, []);

  // Math Game Logic
  const generateMathProblem = useCallback((level) => {
    let num1, num2, operation, answer;
    
    if (level <= 2) {
      num1 = Math.floor(Math.random() * 5) + 1;
      num2 = Math.floor(Math.random() * 5) + 1;
      operation = '+';
      answer = num1 + num2;
    } else if (level <= 4) {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 5) + 1;
      operation = Math.random() > 0.5 ? '+' : '-';
      answer = operation === '+' ? num1 + num2 : num1 - num2;
    } else if (level <= 7) {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 5) + 1;
      operation = Math.random() > 0.3 ? '+' : '-';
      if (level > 5) operation = ['+', '-'][Math.floor(Math.random() * 2)];
      answer = operation === '+' ? num1 + num2 : num1 - num2;
    } else {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 5) + 1;
      const operations = ['+', '-', '*'];
      operation = operations[Math.floor(Math.random() * (level > 8 ? 3 : 2))];
      
      switch(operation) {
        case '+': answer = num1 + num2; break;
        case '-': answer = num1 - num2; break;
        case '*': answer = num1 * num2; break;
        default: answer = num1 + num2;
      }
    }
    
    return {
      problem: `${num1} ${operation} ${num2}`,
      answer,
      options: generateOptions(answer, level)
    };
  }, []);

  const generateOptions = (correct, level) => {
    const options = [correct];
    const range = Math.max(3, Math.floor(level / 2) + 2);
    
    while (options.length < 4) {
      const variance = Math.floor(Math.random() * range) + 1;
      const option = correct + (Math.random() > 0.5 ? variance : -variance);
      if (option !== correct && !options.includes(option) && option > 0) {
        options.push(option);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  // Word Game Logic
  const generateWordGame = useCallback((level) => {
    const wordsByLevel = {
      1: ['cat', 'dog', 'sun', 'hat', 'bug'],
      2: ['fish', 'bird', 'cake', 'ball', 'tree'],
      3: ['apple', 'house', 'water', 'smile', 'cloud'],
      4: ['school', 'friend', 'family', 'animal', 'garden'],
      5: ['elephant', 'butterfly', 'adventure', 'beautiful', 'mountain'],
      6: ['chocolate', 'education', 'rectangle', 'helicopter', 'volleyball'],
      7: ['architecture', 'communication', 'entertainment', 'organization', 'photography'],
      8: ['responsibility', 'determination', 'configuration', 'discrimination', 'transportation'],
      9: ['characteristic', 'representative', 'administration', 'environmental', 'understanding'],
      10: ['international', 'confrontation', 'recommendation', 'discrimination', 'entertainment']
    };
    
    const currentLevel = Math.min(level, 10);
    const wordList = wordsByLevel[currentLevel] || wordsByLevel[10];
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    const scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
    
    return {
      word,
      scrambled,
      hints: [
        `It has ${word.length} letters`,
        `It starts with "${word[0]}"`,
        `It rhymes with "${word.substring(0, 2)}..."`
      ],
      currentHint: 0
    };
  }, []);

  // Color Match Game Logic
  const generateColorGame = useCallback((level) => {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'black', 'white'];
    const shapes = ['circle', 'square', 'triangle', 'star', 'heart', 'diamond', 'pentagon', 'hexagon', 'octagon'];
    
    const targetColor = colors[Math.floor(Math.random() * colors.length)];
    const targetShape = shapes[Math.floor(Math.random() * shapes.length)];
    
    const options = [];
    const numOptions = Math.min(4 + Math.floor(level / 2), 9); // Increase options with level
    
    for (let i = 0; i < numOptions; i++) {
      options.push({
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }
    
    // Ensure the target is in options
    if (!options.some(opt => opt.color === targetColor && opt.shape === targetShape)) {
      options[0] = { color: targetColor, shape: targetShape };
    }
    
    return {
      target: { color: targetColor, shape: targetShape },
      options: options.sort(() => Math.random() - 0.5)
    };
  }, []);

  // Trivia Quiz Logic
  const generateQuiz = useCallback((level) => {
    const questionsByLevel = {
      1: [
        { question: 'What color is an apple?', options: ['Red', 'Blue', 'Green', 'Yellow'], answer: 'Red' },
        { question: 'How many legs does a dog have?', options: ['2', '4', '6', '8'], answer: '4' },
        { question: 'What do caterpillars turn into?', options: ['Birds', 'Butterflies', 'Fish', 'Flowers'], answer: 'Butterflies' }
      ],
      2: [
        { question: 'What is 5 + 3?', options: ['7', '8', '9', '10'], answer: '8' },
        { question: 'Which month comes after April?', options: ['March', 'May', 'June', 'July'], answer: 'May' },
        { question: 'How many sides does a triangle have?', options: ['2', '3', '4', '5'], answer: '3' }
      ],
      3: [
        { question: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Madrid'], answer: 'Paris' },
        { question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], answer: 'Mars' },
        { question: 'What is 7 x 6?', options: ['42', '36', '49', '56'], answer: '42' }
      ],
      4: [
        { question: 'How many continents are there?', options: ['5', '6', '7', '8'], answer: '7' },
        { question: 'What is the largest mammal?', options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippo'], answer: 'Blue Whale' },
        { question: 'Which is not a primary color?', options: ['Red', 'Blue', 'Green', 'Yellow'], answer: 'Green' }
      ],
      5: [
        { question: 'What is the chemical symbol for gold?', options: ['Go', 'Gd', 'Au', 'Ag'], answer: 'Au' },
        { question: 'Who painted the Mona Lisa?', options: ['Van Gogh', 'Picasso', 'Da Vinci', 'Monet'], answer: 'Da Vinci' },
        { question: 'What is the largest planet in our solar system?', options: ['Earth', 'Saturn', 'Jupiter', 'Neptune'], answer: 'Jupiter' }
      ],
      6: [
        { question: 'What is the hardest natural substance?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'], answer: 'Diamond' },
        { question: 'How many elements are in the periodic table?', options: ['108', '118', '128', '138'], answer: '118' },
        { question: 'Which animal sleeps standing up?', options: ['Horse', 'Dog', 'Cat', 'Cow'], answer: 'Horse' }
      ],
      7: [
        { question: 'What is the largest ocean?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 'Pacific' },
        { question: 'Who wrote "Romeo and Juliet"?', options: ['Dickens', 'Shakespeare', 'Twain', 'Hemingway'], answer: 'Shakespeare' },
        { question: 'What is the square root of 144?', options: ['12', '14', '16', '18'], answer: '12' }
      ],
      8: [
        { question: 'Which planet has the most moons?', options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'], answer: 'Saturn' },
        { question: 'What is the main gas in Earth\'s atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], answer: 'Nitrogen' },
        { question: 'How many bones are in the human body?', options: ['186', '206', '226', '246'], answer: '206' }
      ],
      9: [
        { question: 'What is the smallest country in the world?', options: ['Monaco', 'Maldives', 'Vatican City', 'San Marino'], answer: 'Vatican City' },
        { question: 'Who discovered penicillin?', options: ['Curie', 'Einstein', 'Fleming', 'Pasteur'], answer: 'Fleming' },
        { question: 'What is the currency of Japan?', options: ['Yuan', 'Won', 'Yen', 'Ringgit'], answer: 'Yen' }
      ],
      10: [
        { question: 'Which element has the chemical symbol "K"?', options: ['Potassium', 'Krypton', 'Calcium', 'Phosphorus'], answer: 'Potassium' },
        { question: 'What is the largest desert in the world?', options: ['Gobi', 'Sahara', 'Arabian', 'Antarctic'], answer: 'Antarctic' },
        { question: 'Who was the first woman to win a Nobel Prize?', options: ['Curie', 'Franklin', 'Goodall', 'Meitner'], answer: 'Curie' }
      ]
    };
    
    const currentLevel = Math.min(level, 10);
    const questions = questionsByLevel[currentLevel] || questionsByLevel[10];
    return questions[Math.floor(Math.random() * questions.length)];
  }, []);

  // Snake Game Logic
  const initializeSnakeGame = useCallback((level) => {
    const gridSize = Math.min(8 + level, 20);
    const initialSnake = [
      { x: Math.floor(gridSize/2), y: Math.floor(gridSize/2) },
      { x: Math.floor(gridSize/2), y: Math.floor(gridSize/2) + 1 }
    ];
    const food = generateFood(initialSnake, gridSize);
    
    return {
      gridSize,
      snake: initialSnake,
      direction: 'UP',
      food,
      gameOver: false,
      speed: Math.max(300 - (level * 20), 100)
    };
  }, []);

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
    
    switch(game.component) {
      case 'memory':
        setGameData({ cards: generateMemoryCards(1), flippedCards: [], lockBoard: false });
        break;
      case 'math':
        setGameData(generateMathProblem(1));
        break;
      case 'word':
        setGameData(generateWordGame(1));
        break;
      case 'snake':
        setGameData(initializeSnakeGame(1));
        break;
      case 'color':
        setGameData(generateColorGame(1));
        break;
      case 'quiz':
        setGameData(generateQuiz(1));
        break;
      default:
        setGameData({ clicks: 0 });
    }
  };

  const endGame = () => {
    if (activeGame && score > 0) {
      setGameHistory(prev => [...prev, {
        game: activeGame.name,
        score,
        level: Math.min(level, 10),
        date: new Date().toLocaleDateString()
      }]);
    }
    setActiveGame(null);
    setGameData(null);
  };

  const addScore = (points) => {
    setScore(prev => prev + points);
  };

  const nextLevel = () => {
    if (level < 10) {
      setLevel(prev => prev + 1);
      switch(activeGame.component) {
        case 'memory':
          setGameData({ cards: generateMemoryCards(level + 1), flippedCards: [], lockBoard: false });
          break;
        case 'math':
          setGameData(generateMathProblem(level + 1));
          break;
        case 'word':
          setGameData(generateWordGame(level + 1));
          break;
        case 'snake':
          setGameData(initializeSnakeGame(level + 1));
          break;
        case 'color':
          setGameData(generateColorGame(level + 1));
          break;
        case 'quiz':
          setGameData(generateQuiz(level + 1));
          break;
        default:
          setGameData({ clicks: 0 });
      }
      setTimeLeft(60);
    } else {
      endGame();
    }
  };

  // Memory Game Handlers - Fixed
  const handleMemoryClick = (cardId) => {
    if (!gameData || gameData.lockBoard || 
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
      // Lock the board while processing
      setGameData(prev => ({ ...prev, lockBoard: true }));
      
      const [firstId, secondId] = newFlippedCards;
      if (newCards[firstId].emoji === newCards[secondId].emoji) {
        // Match found
        newCards[firstId].matched = true;
        newCards[secondId].matched = true;
        
        setGameData(prev => ({
          ...prev,
          cards: newCards,
          flippedCards: [],
          lockBoard: false
        }));
        
        addScore(50 * level);
        
        // Check if all cards are matched
        if (newCards.every(card => card.matched)) {
          setTimeout(nextLevel, 1000);
        }
      } else {
        // No match, flip back after a delay
        setTimeout(() => {
          setGameData(prev => {
            const resetCards = [...prev.cards];
            resetCards[firstId].flipped = false;
            resetCards[secondId].flipped = false;
            return { ...prev, cards: resetCards, flippedCards: [], lockBoard: false };
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

  // Word Game Handlers
  const handleWordSubmit = (word) => {
    if (word.toLowerCase() === gameData.word.toLowerCase()) {
      addScore(30 * level);
      setGameData(generateWordGame(level));
      if (score + (30 * level) >= 150 * level) {
        setTimeout(nextLevel, 500);
      }
    }
  };

  const showHint = () => {
    if (gameData.currentHint < gameData.hints.length) {
      setGameData(prev => ({
        ...prev,
        currentHint: prev.currentHint + 1
      }));
      addScore(-10);
    }
  };

  // Color Game Handlers
  const handleColorSelect = (option) => {
    if (option.color === gameData.target.color && option.shape === gameData.target.shape) {
      addScore(25 * level);
      setGameData(generateColorGame(level));
      if (score + (25 * level) >= 120 * level) {
        setTimeout(nextLevel, 500);
      }
    }
  };

  // Quiz Game Handlers
  const handleQuizAnswer = (selectedAnswer) => {
    if (selectedAnswer === gameData.answer) {
      addScore(40 * level);
      setGameData(generateQuiz(level));
      if (score + (40 * level) >= 200 * level) {
        setTimeout(nextLevel, 500);
      }
    } else {
      addScore(-10);
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

  // Mobile arrow controls for snake game
  const handleArrowClick = (direction) => {
    if (!gameData || gameData.gameOver) return;
    
    let newDirection = gameData.direction;
    
    switch(direction) {
      case 'Up': if (gameData.direction !== 'DOWN') newDirection = 'UP'; break;
      case 'Down': if (gameData.direction !== 'UP') newDirection = 'DOWN'; break;
      case 'Left': if (gameData.direction !== 'RIGHT') newDirection = 'LEFT'; break;
      case 'Right': if (gameData.direction !== 'LEFT') newDirection = 'RIGHT'; break;
      default: return;
    }
    
    setGameData(prev => ({ ...prev, direction: newDirection }));
  };

  useEffect(() => {
    if (activeGame?.component === 'snake' && gameData && !gameData.gameOver) {
      const moveSnake = () => {
        setGameData(prev => {
          if (!prev) return prev;
          
          const head = { ...prev.snake[0] };
          
          switch(prev.direction) {
            case 'UP': head.y -= 1; break;
            case 'DOWN': head.y += 1; break;
            case 'LEFT': head.x -= 1; break;
            case 'RIGHT': head.x += 1; break;
          }
          
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
          
          if (head.x === prev.food.x && head.y === prev.food.y) {
            addScore(10 * level);
            scored = true;
            newFood = generateFood(newSnake, prev.gridSize);
          } else {
            newSnake.pop();
          }
          
          return {
            ...prev,
            snake: newSnake,
            food: newFood,
            ...(scored && newSnake.length % 5 === 0 ? { speed: Math.max(prev.speed - 5, 100) } : {})
          };
        });
      };
      
      const snakeInterval = setInterval(moveSnake, gameData.speed);
      window.addEventListener('keydown', handleSnakeDirection);
      
      return () => {
        clearInterval(snakeInterval);
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
            <div className="memory-grid" style={{ 
              gridTemplateColumns: `repeat(${Math.min(6, Math.ceil(Math.sqrt(gameData.cards.length)))}, 1fr)`
            }}>
              {gameData.cards.map((card, index) => (
                <div
                  key={card.id}
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
        
      case 'word':
        return (
          <div className="word-game">
            <h3>Level {level} - Unscramble the word!</h3>
            <div className="scrambled-word">{gameData.scrambled}</div>
            <div className="word-input-container">
              <input 
                type="text" 
                className="word-input"
                placeholder="Type the word here"
                onKeyPress={(e) => e.key === 'Enter' && handleWordSubmit(e.target.value)}
              />
              <button onClick={() => handleWordSubmit(document.querySelector('.word-input').value)}>
                Submit
              </button>
            </div>
            <div className="hint-section">
              <button onClick={showHint} className="hint-btn">
                Need a hint? (-10 points)
              </button>
              {gameData.currentHint > 0 && (
                <p className="hint-text">Hint: {gameData.hints[gameData.currentHint - 1]}</p>
              )}
            </div>
          </div>
        );
        
      case 'color':
        return (
          <div className="color-game">
            <h3>Level {level} - Find the matching color and shape!</h3>
            <div className="target-display">
              <div 
                className="target-shape" 
                style={{ 
                  backgroundColor: gameData.target.color,
                  clipPath: getShapeClipPath(gameData.target.shape)
                }}
              ></div>
              <p>Find the {gameData.target.color} {gameData.target.shape}</p>
            </div>
            <div className="color-options" style={{
              gridTemplateColumns: `repeat(${Math.min(4, Math.ceil(Math.sqrt(gameData.options.length)))}, 1fr)`
            }}>
              {gameData.options.map((option, i) => (
                <div
                  key={i}
                  className="color-option"
                  onClick={() => handleColorSelect(option)}
                >
                  <div 
                    className="option-shape"
                    style={{ 
                      backgroundColor: option.color,
                      clipPath: getShapeClipPath(option.shape)
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'quiz':
        return (
          <div className="quiz-game">
            <h3>Level {level} - Answer the question!</h3>
            <div className="quiz-question">{gameData.question}</div>
            <div className="quiz-options">
              {gameData.options.map((option, i) => (
                <button key={i} onClick={() => handleQuizAnswer(option)}>
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
                      <button onClick={endGame}>Back to Menu</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div 
                      className="snake-food" 
                      style={{
                        gridColumn: gameData.food.x + 1,
                        gridRow: gameData.food.y + 1
                      }}
                    />
                    {gameData.snake.map((segment, i) => (
                      <div 
                        key={i}
                        className={`snake-segment ${i === 0 ? 'snake-head' : ''}`}
                        style={{
                          gridColumn: segment.x + 1,
                          gridRow: segment.y + 1
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

  // Helper function for shape clip paths
  const getShapeClipPath = (shape) => {
    switch(shape) {
      case 'circle': return 'circle(50% at 50% 50%)';
      case 'square': return 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
      case 'triangle': return 'polygon(50% 0%, 0% 100%, 100% 100%)';
      case 'star': return 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
      case 'heart': return 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")';
      case 'diamond': return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      case 'pentagon': return 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
      case 'hexagon': return 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
      case 'octagon': return 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';
      default: return 'circle(50% at 50% 50%)';
    }
  };

  return (
    <div className="games-container">
      {!activeGame ? (
        <>
          <h1 className="games-title">Learning Games</h1>
          <p className="games-subtitle">Fun educational games for nursery to 3rd grade</p>
          
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
                <p className="game-description">{game.description}</p>
                <div className="game-difficulty">
                  {game.difficulty.map(level => (
                    <span key={level} className="difficulty-badge">{level}</span>
                  ))}
                </div>
                <div className="card-hover-effect"></div>
              </div>
            ))}
          </div>
          
          {gameHistory.length > 0 && (
            <div className="game-history">
              <h2>Your Recent Games</h2>
              <div className="history-list">
                {gameHistory.slice(-3).map((history, index) => (
                  <div key={index} className="history-item">
                    <span className="history-game">{history.game}</span>
                    <span className="history-score">Score: {history.score}</span>
                    <span className="history-level">Level: {history.level}</span>
                    <span className="history-date">{history.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
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