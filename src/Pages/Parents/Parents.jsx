import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import './Parents.css';

const Parents = () => {
  const [activeTab, setActiveTab] = useState('progress');
  const [children, setChildren] = useState([
    { id: 1, name: 'Emma', age: 5, avatar: '👧', lastActive: '2 hours ago' },
    { id: 2, name: 'Liam', age: 4, avatar: '👦', lastActive: '30 minutes ago' },
    { id: 3, name: 'Olivia', age: 6, avatar: '👧', lastActive: '1 day ago' }
  ]);
  
  const [selectedChild, setSelectedChild] = useState(1);
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState('');
  
  // Progress data for each child
  const [progressData, setProgressData] = useState({
    1: [
      ['Subject', 'Completion', { role: 'annotation' }],
      ['Alphabet', 75, '75%'],
      ['Numbers', 60, '60%'],
      ['Shapes', 45, '45%'],
      ['Rhymes', 85, '85%'],
      ['General Knowledge', 30, '30%']
    ],
    2: [
      ['Subject', 'Completion', { role: 'annotation' }],
      ['Alphabet', 65, '65%'],
      ['Numbers', 70, '70%'],
      ['Shapes', 55, '55%'],
      ['Rhymes', 75, '75%'],
      ['General Knowledge', 40, '40%']
    ],
    3: [
      ['Subject', 'Completion', { role: 'annotation' }],
      ['Alphabet', 90, '90%'],
      ['Numbers', 85, '85%'],
      ['Shapes', 80, '80%'],
      ['Rhymes', 95, '95%'],
      ['General Knowledge', 70, '70%']
    ]
  });

  const [resources] = useState([
    {
      id: 1,
      title: "Early Learning Guide",
      description: "Complete guide to preschool education milestones",
      link: "#",
      icon: "📚",
      category: "Guides",
      favorite: false
    },
    {
      id: 2,
      title: "Activity Planner",
      description: "Weekly learning activity suggestions",
      link: "#",
      icon: "🗓️",
      category: "Tools",
      favorite: true
    },
    {
      id: 3,
      title: "Printable Worksheets",
      description: "Downloadable practice sheets",
      link: "#",
      icon: "🖨️",
      category: "Materials",
      favorite: false
    },
    {
      id: 4,
      title: "Progress Report",
      description: "Generate detailed progress PDF",
      link: "#",
      icon: "📊",
      category: "Reports",
      favorite: true
    },
    {
      id: 5,
      title: "Reading List",
      description: "Age-appropriate book recommendations",
      link: "#",
      icon: "📖",
      category: "Guides",
      favorite: false
    },
    {
      id: 6,
      title: "Behavior Tips",
      description: "Managing preschooler behavior",
      link: "#",
      icon: "🧠",
      category: "Guides",
      favorite: false
    }
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "Ms. Johnson",
      text: "Emma is doing great with letter recognition! She's one of the first to complete the alphabet matching game.",
      date: "2023-05-15",
      time: "10:30 AM",
      read: true,
      type: "teacher"
    },
    {
      id: 2,
      from: "System",
      text: "New learning activity added: Number Tracing. Complete by Friday for extra stars!",
      date: "2023-05-10",
      time: "3:15 PM",
      read: false,
      type: "system"
    },
    {
      id: 3,
      from: "Mr. Davis",
      text: "Reminder: Parent-Teacher conferences next week. Please schedule your time slot.",
      date: "2023-05-08",
      time: "9:45 AM",
      read: false,
      type: "teacher"
    }
  ]);

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Emma's favorite books",
      content: "She loves 'The Very Hungry Caterpillar' and asks to read it every night.",
      date: new Date('2023-05-12').toISOString().split('T')[0],
      color: "#ffecb3",
      childId: 1
    },
    {
      id: 2,
      title: "Questions for teacher",
      content: "Ask about progress with numbers and any extra practice we can do at home.",
      date: new Date('2023-05-05').toISOString().split('T')[0],
      color: "#c8e6c9",
      childId: 1
    },
    {
      id: 3,
      title: "Liam's learning style",
      content: "Liam responds well to visual aids and hands-on activities.",
      date: new Date('2023-05-10').toISOString().split('T')[0],
      color: "#bbdefb",
      childId: 2
    }
  ]);

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [noteForm, setNoteForm] = useState({
    title: '',
    content: '',
    color: '#ffffff',
    childId: selectedChild
  });

  const [resourceFilter, setResourceFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate progress update
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressData(prev => {
        const newData = {...prev};
        for (const childId in newData) {
          for (let i = 1; i < newData[childId].length; i++) {
            // Random progress increase (0-5%)
            const currentProgress = newData[childId][i][1];
            const newProgress = Math.min(100, currentProgress + Math.floor(Math.random() * 5));
            newData[childId][i][1] = newProgress;
            newData[childId][i][2] = `${newProgress}%`;
          }
        }
        return newData;
      });
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleAddChild = () => {
    if (newChildName && newChildAge) {
      const newChild = {
        id: children.length > 0 ? Math.max(...children.map(c => c.id)) + 1 : 1,
        name: newChildName,
        age: parseInt(newChildAge),
        avatar: '👶',
        lastActive: 'Just now'
      };
      
      setChildren([...children, newChild]);
      setProgressData({
        ...progressData,
        [newChild.id]: [
          ['Subject', 'Completion', { role: 'annotation' }],
          ['Alphabet', 0, '0%'],
          ['Numbers', 0, '0%'],
          ['Shapes', 0, '0%'],
          ['Rhymes', 0, '0%'],
          ['General Knowledge', 0, '0%']
        ]
      });
      
      setNewChildName('');
      setNewChildAge('');
      setShowAddChildModal(false);
    }
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (noteForm.title && noteForm.content) {
      if (editingNote) {
        // Update existing note
        setNotes(notes.map(note => 
          note.id === editingNote.id ? { ...noteForm, id: editingNote.id } : note
        ));
      } else {
        // Add new note
        const newNote = {
          ...noteForm,
          id: notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1,
          date: new Date().toISOString().split('T')[0]
        };
        setNotes([...notes, newNote]);
      }
      setShowNoteModal(false);
      setEditingNote(null);
      setNoteForm({
        title: '',
        content: '',
        color: '#ffffff',
        childId: selectedChild
      });
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setNoteForm({
      title: note.title,
      content: note.content,
      color: note.color,
      childId: note.childId
    });
    setShowNoteModal(true);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const markMessageAsRead = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? {...msg, read: true} : msg
    ));
  };

  const toggleResourceFavorite = (id) => {
    setResources(resources.map(resource => 
      resource.id === id ? {...resource, favorite: !resource.favorite} : resource
    ));
  };

  const filteredResources = resources.filter(resource => {
    const matchesFilter = resourceFilter === 'all' || resource.category === resourceFilter;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const currentChild = children.find(child => child.id === selectedChild);
  const childNotes = notes.filter(note => note.childId === selectedChild);

  return (
    <div className="parents-container">
      {/* Header Section */}
      <div className="parents-header">
        <div className="header-left">
          <h1>Parent Dashboard</h1>
          <p className="welcome-message">Welcome back! Here's your child's progress.</p>
        </div>
        
        <div className="header-right">
          <div className="user-profile">
            <span className="avatar">👩</span>
            <span className="name">Parent</span>
            <span className="notification-badge">3</span>
          </div>
        </div>
      </div>

      {/* Child Selector Section */}
      <div className="child-selector-section">
        <div className="child-cards">
          {children.map(child => (
            <div 
              key={child.id}
              className={`child-card ${selectedChild === child.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedChild(child.id);
                setNoteForm(prev => ({ ...prev, childId: child.id }));
              }}
            >
              <span className="child-avatar">{child.avatar}</span>
              <div className="child-info">
                <h3>{child.name}</h3>
                <p>Age {child.age}</p>
                <small>Last active: {child.lastActive}</small>
              </div>
            </div>
          ))}
          
          <div 
            className="child-card add-child"
            onClick={() => setShowAddChildModal(true)}
          >
            <span className="child-avatar">➕</span>
            <div className="child-info">
              <h3>Add Child</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Navigation Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            <button 
              className={activeTab === 'progress' ? 'active' : ''}
              onClick={() => setActiveTab('progress')}
            >
              <i className="tab-icon">📊</i> Progress
            </button>
            <button 
              className={activeTab === 'resources' ? 'active' : ''}
              onClick={() => setActiveTab('resources')}
            >
              <i className="tab-icon">📚</i> Resources
            </button>
            <button 
              className={activeTab === 'messages' ? 'active' : ''}
              onClick={() => setActiveTab('messages')}
            >
              <i className="tab-icon">✉️</i> Messages
              {messages.filter(m => !m.read).length > 0 && (
                <span className="unread-badge">{messages.filter(m => !m.read).length}</span>
              )}
            </button>
            <button 
              className={activeTab === 'notes' ? 'active' : ''}
              onClick={() => setActiveTab('notes')}
            >
              <i className="tab-icon">📝</i> Notes
            </button>
          </div>
          
          <div className="quick-actions">
            <button className="print-btn" onClick={() => window.print()}>
              <i className="icon">🖨️</i> Print Report
            </button>
            <button className="contact-btn">
              <i className="icon">📧</i> Contact Teacher
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'progress' && (
            <div className="progress-section">
              <div className="chart-container">
                <div className="chart-header">
                  <h2>{currentChild.name}'s Learning Progress</h2>
                  <div className="chart-actions">
                    <button className="time-filter active">Weekly</button>
                    <button className="time-filter">Monthly</button>
                    <button className="time-filter">All Time</button>
                  </div>
                </div>
                
                <div className="chart-grid">
                  <div className="main-chart">
                    <Chart
                      width={'100%'}
                      height={'400px'}
                      chartType="BarChart"
                      loader={<div>Loading Chart...</div>}
                      data={progressData[selectedChild]}
                      options={{
                        title: 'Subject Completion',
                        chartArea: { width: '60%' },
                        hAxis: {
                          title: 'Completion (%)',
                          minValue: 0,
                          maxValue: 100
                        },
                        vAxis: {
                          title: 'Subject'
                        },
                        colors: ['#4CAF50'],
                        backgroundColor: 'transparent',
                        legend: { position: 'none' },
                        titleTextStyle: {
                          color: '#2c3e50',
                          fontSize: 18
                        },
                        animation: {
                          duration: 1000,
                          easing: 'out',
                          startup: true
                        }
                      }}
                    />
                  </div>
                  
                  <div className="side-chart">
                    <Chart
                      width={'100%'}
                      height={'400px'}
                      chartType="PieChart"
                      loader={<div>Loading Chart...</div>}
                      data={progressData[selectedChild]}
                      options={{
                        title: 'Progress Distribution',
                        pieHole: 0.4,
                        colors: ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6'],
                        backgroundColor: 'transparent',
                        legend: { position: 'labeled' },
                        titleTextStyle: {
                          color: '#2c3e50',
                          fontSize: 18
                        },
                        pieSliceText: 'value',
                        tooltip: { trigger: 'focus' }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="progress-details">
                <div className="details-header">
                  <h3>Detailed Progress</h3>
                  <div className="export-options">
                    <button className="export-btn">
                      <i className="icon">📊</i> Export as PDF
                    </button>
                    <button className="export-btn">
                      <i className="icon">📝</i> Email Report
                    </button>
                  </div>
                </div>
                
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Completion</th>
                        <th>Last Activity</th>
                        <th>Milestones</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {progressData[selectedChild].slice(1).map(([subject, completion, annotation]) => (
                        <tr key={subject}>
                          <td>
                            <div className="subject-info">
                              <span className="subject-icon">
                                {subject === 'Alphabet' ? '🔤' : 
                                 subject === 'Numbers' ? '🔢' : 
                                 subject === 'Shapes' ? '🟦' : 
                                 subject === 'Rhymes' ? '🎵' : '🧠'}
                              </span>
                              {subject}
                            </div>
                          </td>
                          <td>
                            <div className="progress-container">
                              <div className="progress-bar">
                                <div 
                                  className="progress-fill"
                                  style={{ width: `${completion}%`, backgroundColor: 
                                    completion < 30 ? '#e74c3c' : 
                                    completion < 70 ? '#f1c40f' : '#2ecc71'
                                  }}
                                ></div>
                              </div>
                              <span className="progress-text">{completion}%</span>
                            </div>
                          </td>
                          <td>Today</td>
                          <td>
                            {completion < 30 ? 'Beginning' : 
                             completion < 70 ? 'Developing' : 'Mastered'}
                          </td>
                          <td>
                            <button 
                              className="action-btn small"
                              onClick={() => {
                                setNoteForm({
                                  title: `${subject} Notes`,
                                  content: '',
                                  color: '#ffffff',
                                  childId: selectedChild
                                });
                                setShowNoteModal(true);
                              }}
                            >
                              <i className="icon">📝</i> Note
                            </button>
                            <button className="action-btn small">
                              <i className="icon">➕</i> Practice
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="resources-section">
              <div className="resources-header">
                <h2>Learning Resources</h2>
                <div className="resources-controls">
                  <div className="search-box">
                    <input 
                      type="text" 
                      placeholder="Search resources..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className="search-icon">🔍</i>
                  </div>
                  
                  <select 
                    value={resourceFilter}
                    onChange={(e) => setResourceFilter(e.target.value)}
                    className="filter-dropdown"
                  >
                    <option value="all">All Categories</option>
                    <option value="Guides">Guides</option>
                    <option value="Tools">Tools</option>
                    <option value="Materials">Materials</option>
                    <option value="Reports">Reports</option>
                  </select>
                </div>
              </div>
              
              <div className="resources-grid">
                {filteredResources.length > 0 ? (
                  filteredResources.map((resource) => (
                    <div key={resource.id} className="resource-card">
                      <div className="resource-header">
                        <div className="resource-icon">{resource.icon}</div>
                        <button 
                          className={`favorite-btn ${resource.favorite ? 'active' : ''}`}
                          onClick={() => toggleResourceFavorite(resource.id)}
                        >
                          {resource.favorite ? '★' : '☆'}
                        </button>
                      </div>
                      <div className="resource-body">
                        <h3>{resource.title}</h3>
                        <p>{resource.description}</p>
                        <span className="resource-category">{resource.category}</span>
                      </div>
                      <div className="resource-footer">
                        <a href={resource.link} className="resource-link">
                          View Resource <i className="arrow">→</i>
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    <p>No resources found matching your criteria.</p>
                    <button 
                      className="clear-filters"
                      onClick={() => {
                        setResourceFilter('all');
                        setSearchTerm('');
                      }}
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="messages-section">
              <div className="messages-header">
                <h2>Messages</h2>
                <button className="compose-btn">
                  <i className="icon">✏️</i> Compose New
                </button>
              </div>
              
              <div className="messages-list">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`message-card ${message.read ? '' : 'unread'} ${message.type}`}
                      onClick={() => markMessageAsRead(message.id)}
                    >
                      <div className="message-header">
                        <div className="sender-info">
                          <span className="sender-avatar">
                            {message.type === 'teacher' ? '👩‍🏫' : '🤖'}
                          </span>
                          <span className="sender-name">{message.from}</span>
                          {!message.read && <span className="unread-dot">•</span>}
                        </div>
                        <span className="message-date">
                          {message.date} • {message.time}
                        </span>
                      </div>
                      <div className="message-content">
                        <p>{message.text}</p>
                      </div>
                      <div className="message-actions">
                        <button className="action-btn">
                          <i className="icon">↩️</i> Reply
                        </button>
                        <button className="action-btn">
                          <i className="icon">🗑️</i> Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-messages">
                    <p>No messages to display.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="notes-section">
              <div className="notes-header">
                <h2>Your Notes for {currentChild.name}</h2>
                <button 
                  className="add-note-btn"
                  onClick={() => {
                    setEditingNote(null);
                    setNoteForm({
                      title: '',
                      content: '',
                      color: '#ffffff',
                      childId: selectedChild
                    });
                    setShowNoteModal(true);
                  }}
                >
                  <i className="icon">➕</i> Add Note
                </button>
              </div>
              
              {childNotes.length > 0 ? (
                <div className="notes-grid">
                  {childNotes.map((note) => (
                    <div 
                      key={note.id} 
                      className="note-card"
                      style={{ backgroundColor: note.color }}
                    >
                      <div className="note-header">
                        <h3>{note.title}</h3>
                        <span className="note-date">{new Date(note.date).toLocaleDateString()}</span>
                      </div>
                      <div className="note-content">
                        <p>{note.content}</p>
                      </div>
                      <div className="note-actions">
                        <button 
                          className="note-btn"
                          onClick={() => handleEditNote(note)}
                        >
                          <i className="icon">✏️</i>
                        </button>
                        <button 
                          className="note-btn"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          <i className="icon">🗑️</i>
                        </button>
                        <button className="note-btn">
                          <i className="icon">📤</i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-notes">
                  <p>You haven't created any notes for {currentChild.name} yet.</p>
                  <button 
                    className="add-first-note"
                    onClick={() => {
                      setEditingNote(null);
                      setNoteForm({
                        title: '',
                        content: '',
                        color: '#ffffff',
                        childId: selectedChild
                      });
                      setShowNoteModal(true);
                    }}
                  >
                    Create Your First Note
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Child Modal */}
      {showAddChildModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Child</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddChildModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Child's Name</label>
                <input 
                  type="text" 
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  placeholder="Enter child's name"
                />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input 
                  type="number" 
                  value={newChildAge}
                  onChange={(e) => setNewChildAge(e.target.value)}
                  placeholder="Enter age"
                  min="2"
                  max="8"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowAddChildModal(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-btn"
                onClick={handleAddChild}
                disabled={!newChildName || !newChildAge}
              >
                Add Child
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Note Modal */}
      {showNoteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingNote ? 'Edit Note' : 'Add New Note'}</h3>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowNoteModal(false);
                  setEditingNote(null);
                }}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleNoteSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Title</label>
                  <input 
                    type="text" 
                    value={noteForm.title}
                    onChange={(e) => setNoteForm({...noteForm, title: e.target.value})}
                    placeholder="Note title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <textarea 
                    value={noteForm.content}
                    onChange={(e) => setNoteForm({...noteForm, content: e.target.value})}
                    placeholder="Write your note here..."
                    rows="5"
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Color</label>
                  <div className="color-picker">
                    {['#ffffff', '#ffecb3', '#c8e6c9', '#bbdefb', '#d1c4e9', '#ffcdd2'].map(color => (
                      <div 
                        key={color}
                        className={`color-option ${noteForm.color === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setNoteForm({...noteForm, color})}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>For Child</label>
                  <select
                    value={noteForm.childId}
                    onChange={(e) => setNoteForm({...noteForm, childId: parseInt(e.target.value)})}
                    className="child-select"
                  >
                    {children.map(child => (
                      <option key={child.id} value={child.id}>
                        {child.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowNoteModal(false);
                    setEditingNote(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="confirm-btn"
                  disabled={!noteForm.title || !noteForm.content}
                >
                  {editingNote ? 'Update Note' : 'Save Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Parents;