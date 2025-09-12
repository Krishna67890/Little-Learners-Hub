import React, { useState, useEffect } from 'react';
import './FirstStd.css';

const FirstStd = () => {
  const [activeSubject, setActiveSubject] = useState('english');
  const [activeTopic, setActiveTopic] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const subjects = [
    {
      id: 'english',
      title: 'English',
      description: 'Learn basic English vocabulary, reading, and writing',
      icon: '📚',
      color: '#4CAF50',
      topics: [
        {
          title: 'Alphabet',
          content: 'Learn all 26 letters of the alphabet with fun examples!',
          lessons: [
            { type: 'text', content: 'A is for Apple 🍎' },
            { type: 'text', content: 'B is for Ball ⚽' },
            { type: 'text', content: 'C is for Cat 🐱' },
            { type: 'image', content: 'https://source.unsplash.com/random/300x200/?alphabet' }
          ]
        },
        {
          title: 'Simple Words',
          content: 'Start reading simple three-letter words.',
          lessons: [
            { type: 'text', content: 'CAT' },
            { type: 'text', content: 'DOG' },
            { type: 'text', content: 'SUN' },
            { type: 'audio', content: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }
          ]
        },
        {
          title: 'Basic Sentences',
          content: 'Form simple sentences with the words you know.',
          lessons: [
            { type: 'text', content: 'I see a cat.' },
            { type: 'text', content: 'The sun is hot.' },
            { type: 'text', content: 'My dog runs fast.' }
          ]
        },
        {
          title: 'Phonics',
          content: 'Learn the sounds that letters make.',
          lessons: [
            { type: 'text', content: 'The letter "A" says /a/ as in apple.' },
            { type: 'text', content: 'The letter "B" says /b/ as in ball.' },
            { type: 'text', content: 'The letter "C" says /c/ as in cat.' }
          ]
        }
      ]
    },
    {
      id: 'math',
      title: 'Mathematics',
      description: 'Introduction to numbers and basic operations',
      icon: '➕',
      color: '#2196F3',
      topics: [
        {
          title: 'Numbers 1-100',
          content: 'Count from 1 to 100 with fun activities!',
          lessons: [
            { type: 'text', content: '1, 2, 3, 4, 5...' },
            { type: 'text', content: 'Counting objects around us' },
            { type: 'game', content: 'Count the apples: 🍎🍎🍎 (How many?)' }
          ]
        },
        {
          title: 'Addition',
          content: 'Learn to add numbers together.',
          lessons: [
            { type: 'text', content: '2 + 3 = 5' },
            { type: 'text', content: 'Using objects to add: 🍎 + 🍎🍎 = 🍎🍎🍎' },
            { type: 'interactive', content: 'Drag and drop numbers to solve problems' }
          ]
        },
        {
          title: 'Subtraction',
          content: 'Learn to take away numbers.',
          lessons: [
            { type: 'text', content: '5 - 2 = 3' },
            { type: 'text', content: 'Using objects: 🍎🍎🍎🍎🍎 - 🍎🍎 = 🍎🍎🍎' },
            { type: 'game', content: 'How many are left?' }
          ]
        },
        {
          title: 'Shapes',
          content: 'Identify different shapes in your environment.',
          lessons: [
            { type: 'text', content: 'Circle ⭕, Square ◼️, Triangle 🔺' },
            { type: 'image', content: 'https://source.unsplash.com/random/300x200/?shapes' },
            { type: 'game', content: 'Find shapes around you!' }
          ]
        }
      ]
    },
    {
      id: 'evs',
      title: 'Environmental Science',
      description: 'Learn about the world around us',
      icon: '🌳',
      color: '#FF9800',
      topics: [
        {
          title: 'My Family',
          content: 'Learn about different family members and relationships.',
          lessons: [
            { type: 'text', content: 'Mother, Father, Brother, Sister' },
            { type: 'text', content: 'How families help each other' },
            { type: 'activity', content: 'Draw your family tree' }
          ]
        },
        {
          title: 'Plants',
          content: 'Discover how plants grow and why they are important.',
          lessons: [
            { type: 'text', content: 'Parts of a plant: roots, stem, leaves, flowers' },
            { type: 'image', content: 'https://source.unsplash.com/random/300x200/?plants' },
            { type: 'activity', content: 'Grow a bean plant' }
          ]
        },
        {
          title: 'Animals',
          content: 'Learn about different animals and their habitats.',
          lessons: [
            { type: 'text', content: 'Farm animals: cow, pig, chicken' },
            { type: 'text', content: 'Wild animals: lion, elephant, monkey' },
            { type: 'audio', content: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }
          ]
        },
        {
          title: 'Seasons',
          content: 'Understand the four seasons and their characteristics.',
          lessons: [
            { type: 'text', content: 'Spring 🌸, Summer ☀️, Autumn 🍂, Winter ⛄' },
            { type: 'image', content: 'https://source.unsplash.com/random/300x200/?seasons' },
            { type: 'activity', content: 'Create a season wheel' }
          ]
        }
      ]
    }
  ];

  const quizzes = {
    english: [
      {
        question: "Which letter does 'Apple' start with?",
        options: ["A", "B", "C", "D"],
        correctAnswer: 0
      },
      {
        question: "What is this word: C-A-T?",
        options: ["Dog", "Cat", "Rat", "Bat"],
        correctAnswer: 1
      },
      {
        question: "Complete the sentence: The ___ is shining.",
        options: ["moon", "sun", "star", "cloud"],
        correctAnswer: 1
      }
    ],
    math: [
      {
        question: "What is 2 + 3?",
        options: ["4", "5", "6", "7"],
        correctAnswer: 1
      },
      {
        question: "How many sides does a triangle have?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 1
      },
      {
        question: "What is 5 - 2?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 1
      }
    ],
    evs: [
      {
        question: "Which animal gives us milk?",
        options: ["Lion", "Cow", "Tiger", "Elephant"],
        correctAnswer: 1
      },
      {
        question: "Which season comes after winter?",
        options: ["Spring", "Summer", "Autumn", "Monsoon"],
        correctAnswer: 0
      },
      {
        question: "Which part of plant is under the ground?",
        options: ["Stem", "Leaf", "Flower", "Root"],
        correctAnswer: 3
      }
    ]
  };

  const currentSubject = subjects.find(subject => subject.id === activeSubject);
  const currentTopic = currentSubject.topics[activeTopic];

  const handleAnswerClick = (optionIndex) => {
    if (optionIndex === quizzes[activeSubject][currentQuestion].correctAnswer) {
      setQuizScore(quizScore + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizzes[activeSubject].length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setShowScore(false);
    setShowQuiz(false);
  };

  return (
    <div className="first-std">
      <div className="std-header">
        <h1>First Standard Learning</h1>
        <p>Fun and interactive lessons for young learners</p>
      </div>

      <div className="learning-container">
        <div className="subjects-sidebar">
          {subjects.map(subject => (
            <button
              key={subject.id}
              onClick={() => {
                setActiveSubject(subject.id);
                setActiveTopic(0);
                setShowQuiz(false);
              }}
              className={`subject-btn ${activeSubject === subject.id ? 'active' : ''}`}
              style={{ backgroundColor: subject.color }}
            >
              <span className="subject-icon">{subject.icon}</span>
              <span className="subject-title">{subject.title}</span>
            </button>
          ))}
        </div>

        <div className="main-content">
          <div className="topic-selector">
            {currentSubject.topics.map((topic, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveTopic(index);
                  setShowQuiz(false);
                }}
                className={`topic-btn ${activeTopic === index ? 'active' : ''}`}
              >
                {topic.title}
              </button>
            ))}
            <button
              onClick={() => {
                setShowQuiz(true);
                resetQuiz();
              }}
              className="quiz-btn"
            >
              Take Quiz
            </button>
          </div>

          {showQuiz ? (
            <div className="quiz-container">
              {showScore ? (
                <div className="score-section">
                  <h2>Quiz Completed!</h2>
                  <p>You scored {quizScore} out of {quizzes[activeSubject].length}</p>
                  <div className="score-circle">
                    <span>{Math.round((quizScore / quizzes[activeSubject].length) * 100)}%</span>
                  </div>
                  <button onClick={resetQuiz} className="retry-btn">
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <div className="question-section">
                    <div className="question-count">
                      <span>Question {currentQuestion + 1}</span>/{quizzes[activeSubject].length}
                    </div>
                    <div className="question-text">
                      {quizzes[activeSubject][currentQuestion].question}
                    </div>
                  </div>
                  <div className="answer-section">
                    {quizzes[activeSubject][currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        className="answer-btn"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="lesson-container">
              <h2 className="topic-title">{currentTopic.title}</h2>
              <p className="topic-description">{currentTopic.content}</p>
              
              <div className="lessons">
                {currentTopic.lessons.map((lesson, index) => (
                  <div key={index} className="lesson-card">
                    {lesson.type === 'text' && (
                      <div className="text-lesson">
                        <p>{lesson.content}</p>
                      </div>
                    )}
                    {lesson.type === 'image' && (
                      <div className="image-lesson">
                        <img src={lesson.content} alt="Lesson visual" />
                      </div>
                    )}
                    {lesson.type === 'audio' && (
                      <div className="audio-lesson">
                        <p>Listen to the audio:</p>
                        <audio controls>
                          <source src={lesson.content} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}
                    {lesson.type === 'game' && (
                      <div className="game-lesson">
                        <p>{lesson.content}</p>
                        <button className="play-btn">Play Game</button>
                      </div>
                    )}
                    {lesson.type === 'interactive' && (
                      <div className="interactive-lesson">
                        <p>{lesson.content}</p>
                        <button className="interactive-btn">Try It</button>
                      </div>
                    )}
                    {lesson.type === 'activity' && (
                      <div className="activity-lesson">
                        <p>{lesson.content}</p>
                        <button className="activity-btn">Start Activity</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="activities-section">
        <h2>Fun Activities</h2>
        <div className="activities">
          <div className="activity">
            <span className="activity-icon">🎨</span>
            <h3>Coloring Pages</h3>
            <p>Color and learn about different objects</p>
          </div>
          <div className="activity">
            <span className="activity-icon">🧩</span>
            <h3>Puzzles</h3>
            <p>Solve fun educational puzzles</p>
          </div>
          <div className="activity">
            <span className="activity-icon">🎵</span>
            <h3>Learning Songs</h3>
            <p>Sing along with educational songs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstStd;