import React, { useState, useEffect } from 'react';
import './SecondStd.css';

const SecondStd = () => {
  const [activeSubject, setActiveSubject] = useState('english');
  const [activeTopic, setActiveTopic] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [progress, setProgress] = useState({ english: 0, math: 0, science: 0 });
  const [showCertificate, setShowCertificate] = useState(false);

  const subjects = [
    {
      id: 'english',
      title: 'English',
      description: 'Grammar, reading comprehension, and writing skills',
      icon: '📚',
      color: '#4CAF50',
      topics: [
        {
          title: 'Grammar Basics',
          content: 'Learn about nouns, verbs, adjectives, and adverbs',
          lessons: [
            { type: 'text', content: 'Nouns are naming words (e.g., dog, city, love).' },
            { type: 'text', content: 'Verbs are action words (e.g., run, think, create).' },
            { type: 'interactive', content: 'Drag words to the correct category' },
            { type: 'game', content: 'Grammar treasure hunt' }
          ]
        },
        {
          title: 'Reading Comprehension',
          content: 'Understand and interpret short stories',
          lessons: [
            { type: 'text', content: 'Read the story and answer questions.' },
            { type: 'text', content: 'The Ant and the Grasshopper: A fable about hard work' },
            { type: 'image', content: 'https://source.unsplash.com/random/400x300/?storybook' }
          ]
        },
        {
          title: 'Creative Writing',
          content: 'Express ideas through short paragraphs and stories',
          lessons: [
            { type: 'text', content: 'Write about your favorite animal.' },
            { type: 'text', content: 'Describe a memorable day in your life.' },
            { type: 'activity', content: 'Story building with picture prompts' }
          ]
        }
      ]
    },
    {
      id: 'math',
      title: 'Mathematics',
      description: 'Advanced arithmetic, geometry, and problem solving',
      icon: '➕',
      color: '#2196F3',
      topics: [
        {
          title: 'Multiplication',
          content: 'Learn multiplication tables and techniques',
          lessons: [
            { type: 'text', content: 'Multiplication is repeated addition.' },
            { type: 'text', content: '2 × 3 = 2 + 2 + 2 = 6' },
            { type: 'game', content: 'Multiplication table challenge' },
            { type: 'interactive', content: 'Array visualization of multiplication' }
          ]
        },
        {
          title: 'Basic Geometry',
          content: 'Shapes, angles, and their properties',
          lessons: [
            { type: 'text', content: 'Triangles have 3 sides and 3 angles.' },
            { type: 'text', content: 'Rectangles have 4 right angles.' },
            { type: 'image', content: 'https://source.unsplash.com/random/400x300/?geometry' },
            { type: 'activity', content: 'Shape scavenger hunt' }
          ]
        },
        {
          title: 'Word Problems',
          content: 'Apply math skills to solve real-world problems',
          lessons: [
            { type: 'text', content: 'If Sarah has 5 apples and gives 2 to John, how many does she have left?' },
            { type: 'text', content: 'A classroom has 12 rows with 8 desks each. How many desks total?' },
            { type: 'game', content: 'Problem-solving adventure' }
          ]
        }
      ]
    },
    {
      id: 'science',
      title: 'Science',
      description: 'Explore the natural world through experiments and observation',
      icon: '🔬',
      color: '#FF9800',
      topics: [
        {
          title: 'Plants and Photosynthesis',
          content: 'How plants make their own food',
          lessons: [
            { type: 'text', content: 'Plants use sunlight to convert CO₂ and water into glucose.' },
            { type: 'text', content: 'Chlorophyll gives plants their green color.' },
            { type: 'image', content: 'https://source.unsplash.com/random/400x300/?plants' },
            { type: 'activity', content: 'Grow a plant and observe its growth' }
          ]
        },
        {
          title: 'States of Matter',
          content: 'Solids, liquids, and gases',
          lessons: [
            { type: 'text', content: 'Solids have fixed shape and volume.' },
            { type: 'text', content: 'Liquids take the shape of their container.' },
            { type: 'interactive', content: 'Change states of matter with temperature' },
            { type: 'experiment', content: 'Ice melting and water evaporation' }
          ]
        },
        {
          title: 'Solar System',
          content: 'Planets, stars, and space exploration',
          lessons: [
            { type: 'text', content: 'Our solar system has 8 planets orbiting the Sun.' },
            { type: 'text', content: 'Earth is the only planet known to support life.' },
            { type: 'image', content: 'https://source.unsplash.com/random/400x300/?solar-system' },
            { type: 'game', content: 'Planet matching game' }
          ]
        }
      ]
    }
  ];

  const quizzes = {
    english: [
      {
        question: "Which word is a noun?",
        options: ["Run", "Beautiful", "School", "Quickly"],
        correctAnswer: 2
      },
      {
        question: "What is the past tense of 'play'?",
        options: ["Played", "Plays", "Playing", "Play"],
        correctAnswer: 0
      },
      {
        question: "Which sentence is correctly punctuated?",
        options: [
          "I like apples oranges and bananas.",
          "I like apples, oranges and bananas.",
          "I like apples, oranges, and bananas.",
          "I like apples oranges, and bananas."
        ],
        correctAnswer: 2
      }
    ],
    math: [
      {
        question: "What is 7 × 8?",
        options: ["54", "56", "64", "72"],
        correctAnswer: 1
      },
      {
        question: "How many sides does a hexagon have?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 1
      },
      {
        question: "If a pizza is divided into 8 equal slices and you eat 3, what fraction remains?",
        options: ["3/8", "5/8", "3/5", "5/3"],
        correctAnswer: 1
      }
    ],
    science: [
      {
        question: "What process do plants use to make food?",
        options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"],
        correctAnswer: 1
      },
      {
        question: "Which of these is a gas?",
        options: ["Water", "Oxygen", "Rock", "Ice"],
        correctAnswer: 1
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Jupiter", "Mars", "Saturn"],
        correctAnswer: 2
      }
    ]
  };

  const currentSubject = subjects.find(subject => subject.id === activeSubject);
  const currentTopic = currentSubject.topics[activeTopic];

  useEffect(() => {
    // Simulate loading progress
    const timer = setTimeout(() => {
      if (!showQuiz) {
        const newProgress = { ...progress };
        if (!newProgress[activeSubject]) {
          newProgress[activeSubject] = 0;
        }
        if (newProgress[activeSubject] < (activeTopic + 1) * 30) {
          newProgress[activeSubject] = (activeTopic + 1) * 30;
          setProgress(newProgress);
        }
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [activeSubject, activeTopic, showQuiz]);

  const handleAnswerClick = (optionIndex) => {
    if (optionIndex === quizzes[activeSubject][currentQuestion].correctAnswer) {
      setQuizScore(quizScore + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizzes[activeSubject].length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      // Update progress when quiz is completed
      const newProgress = { ...progress };
      newProgress[activeSubject] = 100;
      setProgress(newProgress);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setShowScore(false);
    setShowQuiz(false);
  };

  const completeCourse = () => {
    setShowCertificate(true);
  };

  return (
    <div className="second-std">
      <div className="std-header">
        <h1>Second Standard Learning Platform</h1>
        <p>Advanced interactive lessons for second grade students</p>
        <div className="progress-indicator">
          <span>Overall Progress</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(progress.english + progress.math + progress.science) / 3}%` }}
            ></div>
          </div>
          <span>{(progress.english + progress.math + progress.science) / 3}%</span>
        </div>
      </div>

      <div className="learning-container">
        <div className="subjects-sidebar">
          {subjects.map(subject => (
            <div key={subject.id} className="subject-item">
              <button
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
              <div className="subject-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress[subject.id] || 0}%` }}
                  ></div>
                </div>
                <span>{progress[subject.id] || 0}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="main-content">
          <div className="topic-navigation">
            <div className="topic-buttons">
              {currentSubject.topics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveTopic(index);
                    setShowQuiz(false);
                  }}
                  className={`topic-btn ${activeTopic === index ? 'active' : ''}`}
                >
                  <span className="topic-number">0{index + 1}</span>
                  <span className="topic-name">{topic.title}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setShowQuiz(true);
                resetQuiz();
              }}
              className="quiz-btn"
            >
              <span className="quiz-icon">✏️</span>
              Take Quiz
            </button>
          </div>

          {showCertificate ? (
            <div className="certificate-container">
              <div className="certificate">
                <h2>Certificate of Achievement</h2>
                <div className="certificate-content">
                  <p>This certifies that</p>
                  <h3>Student Name</h3>
                  <p>has successfully completed the Second Standard course with excellence</p>
                  <div className="score-display">
                    Overall Score: {Math.round((progress.english + progress.math + progress.science) / 3)}%
                  </div>
                  <div className="certificate-footer">
                    <div className="signature">Teacher's Signature</div>
                    <div className="date">Date: {new Date().toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
              <button onClick={() => setShowCertificate(false)} className="back-btn">
                Back to Lessons
              </button>
            </div>
          ) : showQuiz ? (
            <div className="quiz-container">
              {showScore ? (
                <div className="score-section">
                  <h2>Quiz Completed!</h2>
                  <p>You scored {quizScore} out of {quizzes[activeSubject].length}</p>
                  <div className="score-circle">
                    <span>{Math.round((quizScore / quizzes[activeSubject].length) * 100)}%</span>
                  </div>
                  <div className="quiz-actions">
                    <button onClick={resetQuiz} className="retry-btn">
                      Try Again
                    </button>
                    <button onClick={() => setShowQuiz(false)} className="back-btn">
                      Back to Lessons
                    </button>
                    {(progress.english + progress.math + progress.science) / 3 >= 100 && (
                      <button onClick={completeCourse} className="certificate-btn">
                        Get Certificate
                      </button>
                    )}
                  </div>
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
              <div className="lesson-header">
                <h2 className="topic-title">{currentTopic.title}</h2>
                <p className="topic-description">{currentTopic.content}</p>
              </div>
              
              <div className="lessons">
                {currentTopic.lessons.map((lesson, index) => (
                  <div key={index} className="lesson-card">
                    <div className="lesson-number">Lesson {index + 1}</div>
                    {lesson.type === 'text' && (
                      <div className="text-lesson">
                        <p>{lesson.content}</p>
                      </div>
                    )}
                    {lesson.type === 'image' && (
                      <div className="image-lesson">
                        <img src={lesson.content} alt="Lesson visual" />
                        <div className="image-caption">Visual Learning Aid</div>
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
                        <h4>Interactive Game</h4>
                        <p>{lesson.content}</p>
                        <button className="play-btn">Play Game</button>
                      </div>
                    )}
                    {lesson.type === 'interactive' && (
                      <div className="interactive-lesson">
                        <h4>Interactive Activity</h4>
                        <p>{lesson.content}</p>
                        <button className="interactive-btn">Try It</button>
                      </div>
                    )}
                    {lesson.type === 'activity' && (
                      <div className="activity-lesson">
                        <h4>Hands-on Activity</h4>
                        <p>{lesson.content}</p>
                        <button className="activity-btn">Start Activity</button>
                      </div>
                    )}
                    {lesson.type === 'experiment' && (
                      <div className="experiment-lesson">
                        <h4>Science Experiment</h4>
                        <p>{lesson.content}</p>
                        <button className="experiment-btn">Begin Experiment</button>
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
        <h2>Enrichment Activities</h2>
        <div className="activities">
          <div className="activity">
            <span className="activity-icon">🧪</span>
            <h3>Science Lab</h3>
            <p>Virtual experiments and discoveries</p>
          </div>
          <div className="activity">
            <span className="activity-icon">🧮</span>
            <h3>Math Challenges</h3>
            <p>Problem-solving games and puzzles</p>
          </div>
          <div className="activity">
            <span className="activity-icon">📖</span>
            <h3>Reading Corner</h3>
            <p>Interactive stories and comprehension</p>
          </div>
          <div className="activity">
            <span className="activity-icon">🌎</span>
            <h3>World Explorer</h3>
            <p>Learn about countries and cultures</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondStd;