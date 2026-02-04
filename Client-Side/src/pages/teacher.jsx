import React, { useState, useEffect } from 'react';
import '../assets/css/teacher.css';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {
  LayoutDashboard, Users, ClipboardCheck,
  BookOpen, MessageSquare, User, CheckCircle, XCircle, Send
} from 'lucide-react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5000");

const Teacher = () => {
  const [messages, setMessages] = useState([]);
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    // Join as teacher
    socket.emit('join', 'teacher');

    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
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

  const [activeTab, setActiveTab] = useState('Dashboard');
  const [messageText, setMessageText] = useState("");

  const [attendanceRecord, setAttendanceRecord] = useState({
    '2024001': 'present', '2024002': 'present', '2024003': 'absent',
    '2024004': 'present', '2024005': 'present',
  });

  const students = [
    { id: 'JD', name: 'Deepak Kumar', roll: '2024001', attendance: '95%', marks: '88%' },
    { id: 'JS', name: 'Jitnedra Baghel', roll: '2024002', attendance: '92%', marks: '91%' },
    { id: 'MJ', name: 'Akash Rajput', roll: '2024003', attendance: '88%', marks: '85%' },
    { id: 'SW', name: 'Dev Sharma', roll: '2024004', attendance: '97%', marks: '94%' },
    { id: 'TB', name: 'Harshita Kuari', roll: '2024005', attendance: '90%', marks: '87%' },
  ];

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { icon: <Users size={20} />, label: 'Students' },
    { icon: <ClipboardCheck size={20} />, label: 'Attendance' },
    { icon: <BookOpen size={20} />, label: 'Marks' },
    { icon: <MessageSquare size={20} />, label: 'Chat' },

  ];

  return (
    <div className="teacher-container">
      {init && (
        <Particles
          id="tsparticles"
          options={particleOptions}
          className="particles-canvas"
        />
      )}
      <div className="teacher-content">
        <div className="teacher-layout">

          <aside className="teacher-sidebar">
            <nav className="teacher-nav-wrapper">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`teacher-nav-btn ${activeTab === item.label ? 'is-active' : ''}`}
                >
                  <span className="teacher-nav-icon">{item.icon}</span>
                  <span className="teacher-nav-label">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          <main className="teacher-main-section">

            {/* 1. DASHBOARD */}
            {activeTab === 'Dashboard' && (
              <div className="teacher-view-fade">
                <h2 className="teacher-dash-title">Teacher Dashboard</h2>
                <div className="teacher-stats-grid">
                  <div className="teacher-stat-card">
                    <div className="teacher-card-header">
                      <span className="teacher-card-label">Total Students</span>
                      <Users className="teacher-icon-cyan" size={24} />
                    </div>
                    <div className="teacher-card-value">245</div>
                    <div className="teacher-card-subtext">Across 5 classes</div>
                  </div>
                  <div className="teacher-stat-card">
                    <div className="teacher-card-header">
                      <span className="teacher-card-label">Avg. Attendance</span>
                      <ClipboardCheck className="teacher-icon-purple" size={24} />
                    </div>
                    <div className="teacher-card-value">92.4%</div>
                    <div className="teacher-card-trend">+2.5% from last week</div>
                  </div>
                  <div className="teacher-stat-card">
                    <div className="teacher-card-header">
                      <span className="teacher-card-label">Pending Tasks</span>
                      <BookOpen className="teacher-icon-orange" size={24} />
                    </div>
                    <div className="teacher-card-value">12</div>
                    <div className="teacher-card-subtext">Assignments to grade</div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. STUDENTS LIST */}
            {activeTab === 'Students' && (
              <div className="teacher-view-fade">
                <h2 className="teacher-dash-title">Student List</h2>
                <div className="teacher-list-stack">
                  {students.map((student) => (
                    <div key={student.roll} className="teacher-glass-item">
                      <div className="teacher-student-info">
                        <div className="teacher-avatar"><span>{student.id}</span></div>
                        <div>
                          <div className="teacher-student-name">{student.name}</div>
                          <div className="teacher-student-roll">Roll No: {student.roll}</div>
                        </div>
                      </div>
                      <div className="teacher-student-stats">
                        <div className="teacher-stat-group"><div className="teacher-small-label">Attendance</div><div className="teacher-small-value">{student.attendance}</div></div>
                        <div className="teacher-stat-group"><div className="teacher-small-label">Avg. Marks</div><div className="teacher-small-value">{student.marks}</div></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. ATTENDANCE */}
            {activeTab === 'Attendance' && (
              <div className="teacher-view-fade">
                <div className="teacher-header-flex">
                  <h2 className="teacher-dash-title">Mark Attendance</h2>
                  <button className="teacher-submit-btn">Submit Attendance</button>
                </div>
                <div className="teacher-list-stack">
                  {students.map((student) => (
                    <div key={student.roll} className="teacher-glass-item">
                      <div className="teacher-student-info-simple">
                        <div className="teacher-student-name">{student.name}</div>
                        <div className="teacher-student-roll">Roll No: {student.roll}</div>
                      </div>
                      <div className="teacher-attendance-actions">
                        <button onClick={() => setAttendanceRecord({ ...attendanceRecord, [student.roll]: 'present' })} className={`teacher-pill-btn present ${attendanceRecord[student.roll] === 'present' ? 'active' : ''}`}><CheckCircle size={18} /><span>Present</span></button>
                        <button onClick={() => setAttendanceRecord({ ...attendanceRecord, [student.roll]: 'absent' })} className={`teacher-pill-btn absent ${attendanceRecord[student.roll] === 'absent' ? 'active' : ''}`}><XCircle size={18} /><span>Absent</span></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. MARKS */}
            {activeTab === 'Marks' && (activeTab === 'Marks' && (
              <div className="teacher-view-fade">
                <h2 className="teacher-dash-title">Enter Marks</h2>
                <div className="teacher-list-stack">
                  {students.map((student) => (
                    <div key={student.roll} className="teacher-glass-item">
                      <div className="teacher-student-info-simple">
                        <div className="teacher-student-name">{student.name}</div>
                        <div className="teacher-student-roll">Roll No: {student.roll}</div>
                      </div>
                      <div className="teacher-marks-actions">
                        <input type="number" placeholder="Enter marks" className="teacher-marks-input" />
                        <span className="teacher-marks-total">/ 100</span>
                        <button className="teacher-submit-small-btn">Submit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* 5. CHAT WITH STUDENTS */}
            {activeTab === 'Chat' && (
              <div className="teacher-view-fade">
                <div className="teacher-chat-container">
                  <h2 className="teacher-dash-title">Chat with Students</h2>

                  <div className="teacher-chat-box">
                    {messages.map((msg, index) => (
                      <div key={index} className={`teacher-msg-wrapper ${msg.role === 'teacher' ? 'sent' : 'received'}`}>
                        <div className={`teacher-msg-bubble ${msg.role === 'teacher' ? 'gradient' : ''}`}>
                          <div className="teacher-msg-user">{msg.sender}</div>
                          <div className="teacher-msg-text">{msg.text}</div>
                          <div className="teacher-msg-time">{msg.timestamp}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Area */}
                  <div className="teacher-chat-input-row">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="teacher-chat-field"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && messageText.trim()) {
                          const messageData = {
                            sender: 'Teacher',
                            role: 'teacher',
                            text: messageText,
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          };
                          socket.emit('send_message', messageData);
                          setMessageText('');
                        }
                      }}
                    />
                    <button
                      className="teacher-send-btn"
                      onClick={() => {
                        if (messageText.trim()) {
                          const messageData = {
                            sender: 'Teacher',
                            role: 'teacher',
                            text: messageText,
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          };
                          socket.emit('send_message', messageData);
                          setMessageText('');
                        }
                      }}
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for Profile */}

          </main>
        </div>
      </div>
    </div>
  );
};

export default Teacher;