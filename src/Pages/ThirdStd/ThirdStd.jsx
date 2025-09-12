import React, { useState, useEffect } from 'react';
import './ThirdStd.css';

const ThirdStd = () => {
  const [activeSubject, setActiveSubject] = useState('english');
  const [activeTopic, setActiveTopic] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [progress, setProgress] = useState({ english: 0, math: 0, science: 0, social: 0 });
  const [showCertificate, setShowCertificate] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Student Name',
    avatar: '👦',
    points: 0,
    badges: []
  });
  const [showBadge, setShowBadge] = useState(false);
  const [newBadge, setNewBadge] = useState(null);

  const subjects = [
    {
      id: 'english',
      title: 'English',
      description: 'Advanced grammar, reading, and writing skills',
      icon: '📚',
      color: '#4CAF50',
      topics: [
        {
          title: 'Advanced Grammar',
          content: 'Parts of speech, tenses, and sentence structure',
          lessons: [
            { type: 'text', content: 'Nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions, and interjections.' },
            { type: 'text', content: 'Present, past, and future tenses with examples.' },
            { type: 'interactive', content: 'Sentence structure builder' },
            { type: 'game', content: 'Grammar challenge game' }
          ]
        },
        {
          title: 'Reading Comprehension',
          content: 'Analyzing texts and extracting information',
          lessons: [
            { type: 'text', content: 'Reading strategies: predicting, questioning, clarifying, and summarizing.' },
            { type: 'text', content: 'Main idea, supporting details, and inference skills.' },
            { type: 'image', content: 'https://source.unsplash.com/random/400x300/?reading' }
          ]
        },
        {
          title: 'Creative Writing',
          content: 'Developing stories and expressing ideas',
          lessons: [
            { type: 'text', content: 'Story elements: characters, setting, plot, conflict, and resolution.' },
            { type: 'text', content: 'Writing process: prewriting, drafting, revising, editing, and publishing.' },
            { type: 'activity', content: 'Story building with prompts' }
          ]
        }
      ]
    },
    {
      id: 'math',
      title: 'Mathematics',
      description: 'Multiplication, division, fractions, and geometry',
      icon: '➕',
      color: '#2196F3',
      topics: [
        {
          title: 'Multiplication & Division',
          content: 'Advanced operations and problem solving',
          lessons: [
            { type: 'text', content: 'Multiplication tables up to 12.' },
            { type: 'text', content: 'Division as equal sharing and repeated subtraction.' },
            { type: 'game', content: 'Multiplication and division challenge' },
            { type: 'interactive', content: 'Visualizing multiplication with arrays' }
          ]
        },
        {
          title: 'Fractions',
          content: 'Understanding and working with fractions',
          lessons: [
            { type: 'text', content: 'Parts of a fraction: numerator and denominator.' },
            { type: 'text', content: 'Equivalent fractions and comparing fractions.' },
            { type: 'image', content: 'https://source.unsplash.com/random/400x300/?fractions' },
            { type: 'activity', content: 'Fraction pizza game' }
          ]
        },
        {
          title: 'Geometry',
          content: 'Shapes, angles, and measurements',
          lessons: [
            { type: 'text', content: 'Polygons: triangles, quadrilaterals, pentagons, hexagons.' },
            { type: 'text', content: 'Lines, line segments, rays, and angles.' },
            { type: 'game', content: 'Shape identification challenge' }
          ]
        }
      ]
    },
    {
      id: 'science',
      title: 'Science',
      description: 'Earth science, life science, and physical science',
      icon: '🔬',
      color: '#FF9800',
      topics: [
        {
          title: 'Earth Science',
          content: 'Rocks, minerals, and the water cycle',
          lessons: [
            { type: 'text', content: 'Types of rocks: igneous, sedimentary, and metamorphic.' },
            { type: 'text', content: 'The water cycle: evaporation, condensation, precipitation, and collection.' },
            { type: 'image', content: 'https://source.unsplash.com/random/400x300/?rocks' },
            { type: 'activity', content: 'Create a water cycle model' }
          ]
        },
        {
          title: 'Life Science',
          content: 'Ecosystems, food chains, and adaptations',
          lessons: [
            { type: 'text', content: 'Producers, consumers, and decomposers in food chains.' },
            { type: 'text', content: 'Animal adaptations for survival.' },
            { type: 'interactive', content: 'Build a food web' },
            { type: 'experiment', content: 'Observe plant growth under different conditions' }
          ]
        },
        {
          title: 'Physical Science',
          content: 'Matter, energy, and simple machines',
          lessons: [
            { type: 'text', content: 'States of matter: solid, liquid, gas, and plasma.' },
            { type: 'text', content: 'Simple machines: lever, pulley, wheel and axle, inclined plane, wedge, and screw.' },
            { type: 'image', content: 'https://source.unsplash.com/random/400x300/?machines' },
            { type: 'game', content: 'Simple machines matching game' }
          ]
        }
      ]
    },
    {
      id: 'social',
      title: 'Social Studies',
      description: 'Communities, geography, and history',
      icon: '🌎',
      color: '#E91E63',
      topics: [
        {
          title: 'Communities',
          content: 'Types of communities and community helpers',
          lessons: [
            { type: 'text', content: 'Urban, suburban, and rural communities.' },
            { type: 'text', content: 'Community helpers: firefighters, police officers, teachers, doctors, etc.' },
            { type: 'interactive', content: 'Community map builder' }
          ]
        },
        {
          title: 'Geography',
          content: 'Maps, landforms, and continents',
          lessons: [
            { type: 'text', content: 'Map skills: cardinal directions, map key, scale, and symbols.' },
            { type: 'text', content: 'Major landforms: mountains, valleys, plains, plateaus, islands, and peninsulas.' },
            { type: 'image', content: 'https://source.unsplash.com/random/400x300/?map' },
            { type: 'activity', content: 'Create a map of your neighborhood' }
          ]
        },
        {
          title: 'History',
          content: 'Historical figures and events',
          lessons: [
            { type: 'text', content: 'Important historical figures and their contributions.' },
            { type: 'text', content: 'Timelines and chronological order.' },
            { type: 'game', content: 'Historical events matching game' }
          ]
        }
      ]
    }
  ];

  const quizzes = {
    english: [
      {
        question: "Which word is an adverb?",
        options: ["Run", "Beautiful", "School", "Quickly"],
        correctAnswer: 3
      },
      {
        question: "What is the past tense of 'write'?",
        options: ["Writed", "Writes", "Writing", "Wrote"],
        correctAnswer: 3
      },
      {
        question: "Which sentence contains a simile?",
        options: [
          "The sky is blue.",
          "He is as brave as a lion.",
          "She ran quickly.",
          "They ate pizza."
        ],
        correctAnswer: 1
      }
    ],
    math: [
      {
        question: "What is 12 × 9?",
        options: ["108", "98", "118", "128"],
        correctAnswer: 0
      },
      {
        question: "Which fraction is equivalent to 2/3?",
        options: ["4/6", "3/6", "5/8", "1/3"],
        correctAnswer: 0
      },
      {
        question: "How many sides does a pentagon have?",
        options: ["4", "5", "6", "7"],
        correctAnswer: 1
      }
    ],
    science: [
      {
        question: "Which rock type is formed from cooled lava?",
        options: ["Sedimentary", "Metamorphic", "Igneous", "Mineral"],
        correctAnswer: 2
      },
      {
        question: "What is the first stage of the water cycle?",
        options: ["Condensation", "Precipitation", "Evaporation", "Collection"],
        correctAnswer: 2
      },
      {
        question: "Which simple machine is a ramp?",
        options: ["Lever", "Pulley", "Inclined Plane", "Wedge"],
        correctAnswer: 2
      }
    ],
    social: [
      {
        question: "Which is an example of a rural community?",
        options: ["Skyscrapers", "Subdivision", "Farm", "Shopping mall"],
        correctAnswer: 2
      },
      {
        question: "What are the cardinal directions?",
        options: [
          "North, South, East, West",
          "Up, Down, Left, Right",
          "Top, Bottom, Side, Middle",
          "Front, Back, Side, End"
        ],
        correctAnswer: 0
      },
      {
        question: "What does a historian study?",
        options: ["Plants", "Animals", "Rocks", "Past events"],
        correctAnswer: 3
      }
    ]
  };

  const badges = [
    { id: 1, name: 'Grammar Master', icon: '🏆', description: 'Completed English with excellence' },
    { id: 2, name: 'Math Whiz', icon: '⭐', description: 'Aced all Math quizzes' },
    { id: 3, name: 'Science Explorer', icon: '🔍', description: 'Explored all Science topics' },
    { id: 4, name: 'History Buff', icon: '📜', description: 'Mastered Social Studies' },
    { id: 5, name: 'Quick Learner', icon: '⚡', description: 'Completed a topic in record time' },
    { id: 6, name: 'Quiz Champion', icon: '🎯', description: 'Perfect score on a difficult quiz' }
  ];

  const currentSubject = subjects.find(subject => subject.id === activeSubject);
  const currentTopic = currentSubject.topics[activeTopic];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!showQuiz) {
        const newProgress = { ...progress };
        if (!newProgress[activeSubject]) {
          newProgress[activeSubject] = 0;
        }
        if (newProgress[activeSubject] < (activeTopic + 1) * 30) {
          newProgress[activeSubject] = (activeTopic + 1) * 30;
          setProgress(newProgress);
          
          // Award badge if subject is completed
          if (newProgress[activeSubject] >= 100 && !userData.badges.includes(activeSubject + '-badge')) {
            const badgeToAward = badges.find(b => b.name.includes(currentSubject.title));
            if (badgeToAward) {
              setNewBadge(badgeToAward);
              setShowBadge(true);
              setUserData(prev => ({
                ...prev,
                badges: [...prev.badges, badgeToAward.id],
                points: prev.points + 50
              }));
              setTimeout(() => setShowBadge(false), 3000);
            }
          }
        }
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [activeSubject, activeTopic, showQuiz]);

  const handleAnswerClick = (optionIndex) => {
    if (optionIndex === quizzes[activeSubject][currentQuestion].correctAnswer) {
      setQuizScore(quizScore + 1);
      setUserData(prev => ({ ...prev, points: prev.points + 10 }));
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizzes[activeSubject].length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      const newProgress = { ...progress };
      newProgress[activeSubject] = 100;
      setProgress(newProgress);
      
      // Award points for quiz completion
      setUserData(prev => ({ ...prev, points: prev.points + 50 }));
      
      // Award badge for perfect score
      if (quizScore + 1 === quizzes[activeSubject].length) {
        const perfectBadge = badges.find(b => b.name === 'Quiz Champion');
        if (perfectBadge && !userData.badges.includes(perfectBadge.id)) {
          setNewBadge(perfectBadge);
          setShowBadge(true);
          setUserData(prev => ({
            ...prev,
            badges: [...prev.badges, perfectBadge.id],
            points: prev.points + 100
          }));
          setTimeout(() => setShowBadge(false), 3000);
        }
      }
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
    <div className="third-std">
      {showBadge && newBadge && (
        <div className="badge-notification">
          <div className="badge-popup">
            <div className="badge-icon">{newBadge.icon}</div>
            <h3>Congratulations!</h3>
            <p>You earned the {newBadge.name} badge!</p>
            <p>{newBadge.description}</p>
          </div>
        </div>
      )}
      
      <div className="std-header">
        <div className="header-top">
          <h1>Third Standard Advanced Learning Platform</h1>
          <div className="user-profile">
            <div className="user-avatar">{userData.avatar}</div>
            <div className="user-info">
              <span className="user-name">{userData.name}</span>
              <span className="user-points">{userData.points} points</span>
            </div>
          </div>
        </div>
        <p>Interactive lessons and activities for third grade students</p>
        <div className="progress-indicator">
          <span>Overall Progress</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(progress.english + progress.math + progress.science + progress.social) / 4}%` }}
            ></div>
          </div>
          <span>{Math.round((progress.english + progress.math + progress.science + progress.social) / 4)}%</span>
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
                  <h3>{userData.name}</h3>
                  <p>has successfully completed the Third Standard course with excellence</p>
                  <div className="score-display">
                    Overall Score: {Math.round((progress.english + progress.math + progress.science + progress.social) / 4)}%
                  </div>
                  <div className="badges-earned">
                    <h4>Badges Earned:</h4>
                    <div className="badges-list">
                      {badges.filter(badge => userData.badges.includes(badge.id)).map(badge => (
                        <div key={badge.id} className="badge-item">
                          <span className="badge-icon">{badge.icon}</span>
                          <span className="badge-name">{badge.name}</span>
                        </div>
                      ))}
                    </div>
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
                    {(progress.english + progress.math + progress.science + progress.social) / 4 >= 100 && (
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

export default ThirdStd;