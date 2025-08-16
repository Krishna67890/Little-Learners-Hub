import React, { useState, useEffect } from 'react';
import './GK.css';

const GK = () => {
  const categories = [
    {
      name: "Animals",
      icon: "🦁",
      color: "#FF9F43",
      questions: [
        {
          question: "Which animal is called the 'King of the Jungle'?",
          options: ["Elephant", "Lion", "Giraffe"],
          answer: "Lion",
          image: "🦁",
          sound: "/sounds/lion.mp3"
        },
        {
          question: "Which animal gives us milk?",
          options: ["Dog", "Cat", "Cow"],
          answer: "Cow",
          image: "🐄",
          sound: "/sounds/cow.mp3"
        },
        {
          question: "Which bird can fly backwards?",
          options: ["Eagle", "Hummingbird", "Owl"],
          answer: "Hummingbird",
          image: "🐦",
          sound: "/sounds/hummingbird.mp3"
        },
        {
          question: "What do you call a baby dog?",
          options: ["Cub", "Puppy", "Kitten"],
          answer: "Puppy",
          image: "🐕",
          sound: "/sounds/puppy.mp3"
        },
        {
          question: "Which animal has a long trunk?",
          options: ["Giraffe", "Elephant", "Rhino"],
          answer: "Elephant",
          image: "🐘",
          sound: "/sounds/elephant.mp3"
        },
        {
          question: "Which animal hops on two legs?",
          options: ["Kangaroo", "Bear", "Deer"],
          answer: "Kangaroo",
          image: "🦘",
          sound: "/sounds/kangaroo.mp3"
        },
        {
          question: "Which animal is the tallest in the world?",
          options: ["Elephant", "Giraffe", "Polar Bear"],
          answer: "Giraffe",
          image: "🦒",
          sound: "/sounds/giraffe.mp3"
        },
        {
          question: "Which animal is known for its black and white stripes?",
          options: ["Tiger", "Zebra", "Cheetah"],
          answer: "Zebra",
          image: "🦓",
          sound: "/sounds/zebra.mp3"
        },
        {
          question: "Which animal lives in the ocean and has eight arms?",
          options: ["Starfish", "Octopus", "Shark"],
          answer: "Octopus",
          image: "🐙",
          sound: "/sounds/octopus.mp3"
        },
        {
          question: "Which animal is known as 'man's best friend'?",
          options: ["Cat", "Dog", "Parrot"],
          answer: "Dog",
          image: "🐶",
          sound: "/sounds/dog.mp3"
        }
      ]
    },
    {
      name: "Fruits",
      icon: "🍎",
      color: "#ED5565",
      questions: [
        {
          question: "Which fruit is red and grows on trees?",
          options: ["Banana", "Apple", "Grapes"],
          answer: "Apple",
          image: "🍎",
          sound: "/sounds/apple.mp3"
        },
        {
          question: "Which fruit is yellow and monkeys love it?",
          options: ["Orange", "Banana", "Pear"],
          answer: "Banana",
          image: "🍌",
          sound: "/sounds/banana.mp3"
        },
        {
          question: "Which fruit is small, red, and has seeds on the outside?",
          options: ["Blueberry", "Strawberry", "Raspberry"],
          answer: "Strawberry",
          image: "🍓",
          sound: "/sounds/strawberry.mp3"
        },
        {
          question: "Which fruit is orange and good for your eyes?",
          options: ["Apple", "Carrot", "Orange"],
          answer: "Carrot",
          image: "🥕",
          sound: "/sounds/carrot.mp3"
        },
        {
          question: "Which fruit is green on the outside and red on the inside?",
          options: ["Kiwi", "Watermelon", "Pear"],
          answer: "Watermelon",
          image: "🍉",
          sound: "/sounds/watermelon.mp3"
        },
        {
          question: "Which fruit is known as the 'king of fruits'?",
          options: ["Apple", "Mango", "Banana"],
          answer: "Mango",
          image: "🥭",
          sound: "/sounds/mango.mp3"
        },
        {
          question: "Which fruit is small, round, and comes in bunches?",
          options: ["Grapes", "Cherries", "Blueberries"],
          answer: "Grapes",
          image: "🍇",
          sound: "/sounds/grapes.mp3"
        },
        {
          question: "Which fruit is sour and yellow?",
          options: ["Lemon", "Banana", "Peach"],
          answer: "Lemon",
          image: "🍋",
          sound: "/sounds/lemon.mp3"
        },
        {
          question: "Which fruit is fuzzy and has a large pit inside?",
          options: ["Peach", "Pear", "Plum"],
          answer: "Peach",
          image: "🍑",
          sound: "/sounds/peach.mp3"
        },
        {
          question: "Which fruit is used to make wine?",
          options: ["Apple", "Grape", "Orange"],
          answer: "Grape",
          image: "🍇",
          sound: "/sounds/grape.mp3"
        }
      ]
    },
    {
      name: "Vehicles",
      icon: "🚗",
      color: "#5D9CEC",
      questions: [
        {
          question: "What do we call a vehicle that flies in the sky?",
          options: ["Car", "Airplane", "Boat"],
          answer: "Airplane",
          image: "✈️",
          sound: "/sounds/airplane.mp3"
        },
        {
          question: "Which vehicle has two wheels and pedals?",
          options: ["Car", "Bicycle", "Bus"],
          answer: "Bicycle",
          image: "🚲",
          sound: "/sounds/bicycle.mp3"
        },
        {
          question: "Which vehicle travels on tracks?",
          options: ["Train", "Car", "Truck"],
          answer: "Train",
          image: "🚂",
          sound: "/sounds/train.mp3"
        },
        {
          question: "Which vehicle is used by firefighters?",
          options: ["Police Car", "Fire Truck", "Ambulance"],
          answer: "Fire Truck",
          image: "🚒",
          sound: "/sounds/firetruck.mp3"
        },
        {
          question: "Which vehicle floats on water?",
          options: ["Car", "Boat", "Airplane"],
          answer: "Boat",
          image: "🚤",
          sound: "/sounds/boat.mp3"
        },
        {
          question: "Which vehicle has flashing lights and takes sick people to hospital?",
          options: ["Police Car", "Ambulance", "Taxi"],
          answer: "Ambulance",
          image: "🚑",
          sound: "/sounds/ambulance.mp3"
        },
        {
          question: "Which vehicle is used to carry many passengers in cities?",
          options: ["Bus", "Car", "Bicycle"],
          answer: "Bus",
          image: "🚌",
          sound: "/sounds/bus.mp3"
        },
        {
          question: "Which vehicle is used to dig big holes?",
          options: ["Tractor", "Digger", "Crane"],
          answer: "Digger",
          image: "🚜",
          sound: "/sounds/digger.mp3"
        },
        {
          question: "Which vehicle has a siren and catches bad people?",
          options: ["Ambulance", "Police Car", "Fire Truck"],
          answer: "Police Car",
          image: "🚓",
          sound: "/sounds/police.mp3"
        },
        {
          question: "Which vehicle carries astronauts to space?",
          options: ["Airplane", "Rocket", "Helicopter"],
          answer: "Rocket",
          image: "🚀",
          sound: "/sounds/rocket.mp3"
        }
      ]
    },
    {
      name: "Shapes",
      icon: "🟨",
      color: "#A0D468",
      questions: [
        {
          question: "Which shape has 3 sides?",
          options: ["Circle", "Square", "Triangle"],
          answer: "Triangle",
          image: "🔺",
          sound: "/sounds/triangle.mp3"
        },
        {
          question: "Which shape is round with no corners?",
          options: ["Square", "Circle", "Rectangle"],
          answer: "Circle",
          image: "🔵",
          sound: "/sounds/circle.mp3"
        },
        {
          question: "Which shape has 4 equal sides?",
          options: ["Rectangle", "Square", "Oval"],
          answer: "Square",
          image: "🟥",
          sound: "/sounds/square.mp3"
        },
        {
          question: "Which shape looks like an egg?",
          options: ["Circle", "Oval", "Star"],
          answer: "Oval",
          image: "🥚",
          sound: "/sounds/oval.mp3"
        },
        {
          question: "Which shape has 5 sides?",
          options: ["Hexagon", "Pentagon", "Square"],
          answer: "Pentagon",
          image: "⬟",
          sound: "/sounds/pentagon.mp3"
        },
        {
          question: "Which shape has 6 sides?",
          options: ["Pentagon", "Hexagon", "Octagon"],
          answer: "Hexagon",
          image: "⬢",
          sound: "/sounds/hexagon.mp3"
        },
        {
          question: "Which shape is like a stretched circle?",
          options: ["Oval", "Square", "Triangle"],
          answer: "Oval",
          image: "🏉",
          sound: "/sounds/oval.mp3"
        },
        {
          question: "Which shape has 4 sides with two longer and two shorter sides?",
          options: ["Square", "Rectangle", "Diamond"],
          answer: "Rectangle",
          image: "📏",
          sound: "/sounds/rectangle.mp3"
        },
        {
          question: "Which shape has points like a star in the sky?",
          options: ["Circle", "Star", "Square"],
          answer: "Star",
          image: "⭐",
          sound: "/sounds/star.mp3"
        },
        {
          question: "Which shape looks like a diamond?",
          options: ["Square", "Rhombus", "Triangle"],
          answer: "Rhombus",
          image: "💠",
          sound: "/sounds/rhombus.mp3"
        }
      ]
    }
  ];

  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [progress, setProgress] = useState(0);

  const playSound = (soundFile) => {
    if (!soundEnabled) return;
    
    const audio = new Audio(soundFile);
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio play prevented:", e));
  };

  const speak = (text) => {
    if (speaking) return;
    
    setSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswer = (option) => {
    if (showResult) return;
    
    setSelectedOption(option);
    const correct = option === currentCategory.questions[currentQuestion].answer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
      speak("Correct! Good job!");
    } else {
      speak(`Oops! The correct answer is ${currentCategory.questions[currentQuestion].answer}`);
    }
    
    setShowResult(true);
    playSound(correct ? "/sounds/correct.mp3" : "/sounds/wrong.mp3");
  };

  const nextQuestion = () => {
    if (currentQuestion < currentCategory.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Return to category selection
      setCurrentCategory(null);
    }
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const startCategory = (category) => {
    setCurrentCategory(category);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setProgress(0);
    speak(`Let's learn about ${category.name}!`);
  };

  useEffect(() => {
    if (currentCategory) {
      const newProgress = ((currentQuestion + (showResult ? 1 : 0)) / currentCategory.questions.length) * 100;
      setProgress(newProgress);
    }
  }, [currentQuestion, showResult, currentCategory]);

  return (
    <div className="gk-container">
      {!currentCategory ? (
        <div className="category-selection">
          <h1>General Knowledge</h1>
          <p>Choose a category to learn!</p>
          
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="category-card"
                onClick={() => startCategory(category)}
                style={{ backgroundColor: category.color }}
              >
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <div className="question-count">{category.questions.length} questions</div>
              </div>
            ))}
          </div>
          
          <div className="sound-toggle">
            <button onClick={() => setSoundEnabled(!soundEnabled)}>
              {soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
            </button>
          </div>
        </div>
      ) : (
        <div className="question-section">
          <div className="quiz-header">
            <button 
              className="back-button"
              onClick={() => {
                setCurrentCategory(null);
                playSound("/sounds/back.mp3");
              }}
            >
              ← Back
            </button>
            <h2>{currentCategory.name} Quiz</h2>
            <div className="score">Score: {score}/{currentCategory.questions.length}</div>
          </div>
          
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          
          <div className="question-card">
            <div className="question-image" onClick={() => playSound(currentCategory.questions[currentQuestion].sound)}>
              {currentCategory.questions[currentQuestion].image}
              <div className="play-sound">🔊</div>
            </div>
            
            <div className="question-text">
              <h3>{currentCategory.questions[currentQuestion].question}</h3>
              <button 
                className="speak-button"
                onClick={() => speak(currentCategory.questions[currentQuestion].question)}
                disabled={speaking}
              >
                {speaking ? 'Speaking...' : '🔊 Hear Question'}
              </button>
            </div>
            
            <div className="options-grid">
              {currentCategory.questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${
                    selectedOption === option 
                      ? isCorrect 
                        ? 'correct' 
                        : 'incorrect'
                      : ''
                  } ${
                    showResult && option === currentCategory.questions[currentQuestion].answer 
                      ? 'show-correct' 
                      : ''
                  }`}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {showResult && (
              <div className="result-feedback">
                {isCorrect ? (
                  <div className="correct-feedback">
                    <span>✅</span> Correct! Well done!
                  </div>
                ) : (
                  <div className="incorrect-feedback">
                    <span>❌</span> The correct answer is: {currentCategory.questions[currentQuestion].answer}
                  </div>
                )}
                <button className="next-button" onClick={nextQuestion}>
                  {currentQuestion < currentCategory.questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GK;