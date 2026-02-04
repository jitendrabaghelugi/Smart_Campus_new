import React, { useState, useEffect } from 'react';
import '../assets/css/student.css';
import { Send } from 'lucide-react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import io from 'socket.io-client';
const socket = io.connect("http://localhost:5000");


const teachers = [
  { id: 'JD', name: 'John Doe', roll: '2024001', attendance: '95%', marks: '88%' },
  { id: 'JS', name: 'Jane Smith', roll: '2024002', attendance: '92%', marks: '91%' },
  { id: 'MJ', name: 'Mike Johnson', roll: '2024003', attendance: '88%', marks: '85%' },
  { id: 'SW', name: 'Sarah Williams', roll: '2024004', attendance: '97%', marks: '94%' },
  { id: 'TB', name: 'Tom Brown', roll: '2024005', attendance: '90%', marks: '87%' },
];

const DashboardView = () => (
  <div className="view-container">
    <h2 className="view-title">Student Dashboard</h2>
    <div className="stats-grid">
      <div className="stat-card">
        <div className="card-header">
          <span>Overall Attendance</span>
          <i className="text-cyan"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar w-6 h-6 text-cyan-400" data-fg-6vs23="31.47:31.15426:/src/app/components/StudentDashboard.tsx:106:23:4277:46:e:Calendar::::::CjND"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg></i>
        </div>
        <div className="stat-value">91.75%</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '91.75%', background: 'linear-gradient(90deg, #22d3ee, #9333ea)' }}></div>
        </div>
      </div>
      <div className="stat-card">
        <div className="card-header">
          <span>Average Marks</span>
          <i className="text-purple"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy w-6 h-6 text-purple-400" data-fg-6vs32="31.47:31.15426:/src/app/components/StudentDashboard.tsx:125:23:5264:46:e:Trophy::::::WUn"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg></i>
        </div>
        <div className="stat-value">91.75%</div>
        <div className="stat-trend">
          <span className="trend-up">↑ +5% from last month</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="card-header">
          <span>Pending Tasks</span>
          <i className="text-orange"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text w-6 h-6 text-orange-400" data-fg-6vs43="31.47:31.15426:/src/app/components/StudentDashboard.tsx:140:23:6041:48:e:FileText::::::C86E"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg></i>
        </div>
        <div className="stat-value">5</div>
        <div className="stat-sub">2 due this week</div>
      </div>
    </div>
  </div>
);

const AttendanceView = () => (
  <div className="view-container">
    <h2 className="view-title">Attendance Overview</h2>
    <div className="list-stack">
      {[
        { label: 'Mathematics', val: '93%', sub: '28 / 30 classes', color: '#10b981' },
        { label: 'Physics', val: '87%', sub: '26 / 30 classes', color: '#3b82f6' },
        { label: 'Chemistry', val: '97%', sub: '29 / 30 classes', color: '#10b981' }
      ].map((item, i) => (
        <div key={i} className="list-card">

          <div className="list-info">
            <div>
              <div className="list-label">{item.label}</div>
              <div className="list-sub">{item.sub}</div>
            </div>
            <div className="list-value">{item.val}</div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: item.val, backgroundColor: item.color }}></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MarksView = () => (
  <div className="view-container">
    <h2 className="view-title">Academic Performance</h2>
    <div className="list-stack">
      {[{ s: 'Mathematics', m: '92/100' }, { s: 'Physics', m: '85/100' }, { s: 'Chemistry', m: '94/100' }].map((item, i) => (
        <div key={i} className="list-card">

          <div className="list-info">
            <div>
              <div className="list-label">{item.s}</div>
              <div className="list-sub">Latest Assigment </div>

            </div>
            <div className="list-value">{item.m}</div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill purple-gradient" style={{ width: item.m.split('/')[0] + '%' }}></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TeachersView = () => (
  <div className="teacher-view-fade">
    <h2 className="teacher-dash-title">Teachers List</h2>
    <div className="teacher-list-stack">
      {teachers.map((teacher) => (
        <div key={teacher.roll} className="teacher-glass-item">
          <div className="teacher-student-info">
            <div className="teacher-avatar"><span>{teacher.id}</span></div>
            <div>
              <div className="teacher-student-name">{teacher.name}</div>
              <div className="teacher-student-roll">Roll No: {teacher.roll}</div>
            </div>
          </div>
          <div className="teacher-student-stats">
            <div className="teacher-stat-group"><div className="teacher-small-label">Attendance</div><div className="teacher-small-value">{teacher.attendance}</div></div>
            <div className="teacher-stat-group"><div className="teacher-small-label">Avg. Marks</div><div className="teacher-small-value">{teacher.marks}</div></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ChatView = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    socket.emit('join', 'student');
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const messageData = {
        sender: 'Student',
        role: 'student',
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      socket.emit('send_message', messageData);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-section">
      <div className="view-container">
        <h2 className="view-title">Chat with Teachers</h2>
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div key={index} className={`msg-wrapper ${msg.role === 'student' ? 'student' : 'teacher'}`}>
              <div className="msg-bubble">
                <span className="sender-name">{msg.sender}</span>
                <p className="msg-text">{msg.text}</p>
                <span className="timestamp">{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Type your message..."
            className="chat-input"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="send-icon-btn" onClick={sendMessage}>
            <Send size={25} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Dashboard Shell ---


const DashboardIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>

);
const AttendanceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>
);
const MarksIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
);
const AssignmentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"> <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path> <path d="M16 3.128a4 4 0 0 1 0 7.744"></path> <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path> <circle cx="9" cy="7" r="4"></circle>

  </svg>

);

const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
);



export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const tabs = [
    { id: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'Teachers', icon: <AssignmentIcon /> },
    { id: 'Attendance', icon: <AttendanceIcon /> },
    { id: 'Marks', icon: <MarksIcon /> },
    { id: 'Chat', icon: <ChatIcon /> },

  ];

  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  const particleOptions = {
    fpsLimit: 120,
    particles: {
      color: { value: "#37b6ff" },
      number: { value: 100, density: { enable: true, area: 900 } },
      opacity: {
        value: { min: 0.1, max: 0.7 },
        animation: { enable: true, speed: 1, sync: false }
      },
      shape: { type: "circle" },
      size: { value: { min: 3, max: 5 } },
      links: { enable: false },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" } },
      modes: { repulse: { distance: 100, duration: 0.4 } },
    },
    detectRetina: true,
  };




  return (
    <div id='student'>
      <div className="bg-layers">
        <div className="bg-base"></div>
        <div className="glow-purple"></div>
        <div className="glow-cyan"></div>
      </div>
      {init && (
        <Particles
          id="tsparticles"
          options={particleOptions}
          className="particles-canvas"
        />
      )}
      <div className="dashboard-wrapper">
        <div className="dashboard-container">
          {/* Sidebar */}
          <aside className="sidebar">
            <nav className="nav-menu">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <span className="nav-icon">{tab.icon}</span>
                  {tab.id}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content Area */}
          <main className="main-content">
            {activeTab === 'Dashboard' && <DashboardView />}
            {activeTab === 'Attendance' && <AttendanceView />}
            {activeTab === 'Marks' && <MarksView />}
            {activeTab === 'Teachers' && <TeachersView />}
            {activeTab === 'Chat' && <ChatView />}
          </main>
        </div>
      </div>
    </div>
  );
}