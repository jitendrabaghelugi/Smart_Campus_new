import React,{ useState,useEffect }  from 'react';
import {
  Brain, Target, Sparkles, TrendingUp, CircleAlert, ArrowRight
} from 'lucide-react';
import Particles, { initParticlesEngine } from "@tsparticles/react"; 
import { loadSlim } from "@tsparticles/slim";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import "../assets/css/dashboard.css";

const Dashboard = () => {

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

  // Data matching your screenshots
  const lineData = [
    { name: 'Jan', students: 85, marks: 78, trend: 82 },
    { name: 'Feb', students: 88, marks: 82, trend: 85 },
    { name: 'Mar', students: 92, marks: 85, trend: 88 },
    { name: 'Apr', students: 90, marks: 88, trend: 90 },
    { name: 'May', students: 94, marks: 90, trend: 92 },
    { name: 'Jun', students: 96, marks: 92, trend: 94 },
  ];

  const barData = [
    { name: 'CS', students: 450, marks: 85 },
    { name: 'EE', students: 380, marks: 78 },
    { name: 'ME', students: 420, marks: 82 },
    { name: 'CE', students: 350, marks: 80 },
  ];
  return (
    
    <div className="analytics-container">
       {init && (
            <Particles
              id="tsparticles"
              options={particleOptions}
              className="particles-canvas"
            />
          )}
      <div className="analytics-content">
        {/* Header Section */}
        <header className="analytics-header">
          <div className="header-title-row">
            <div className="brain-icon-box">
              <Brain className="text-white" size={24} />
            </div>
            <h2>AI Analytics Dashboard</h2>
          </div>
          <p>Advanced insights powered by artificial intelligence</p>
        </header>

        {/* Top Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card cyan-theme">
            <div className="stat-header">
              <span>Prediction Accuracy</span>
              <Target size={24} className="text-cyan" />
            </div>
            <div className="stat-value">94%</div>
            <div className="stat-label">AI Model Performance</div>
          </div>

          <div className="stat-card purple-theme">
            <div className="stat-header">
              <span>Success Prediction</span>
              <Sparkles size={24} className="text-purple" />
            </div>
            <div className="stat-value">87%</div>
            <div className="stat-label">Students on track</div>
          </div>

          <div className="stat-card green-theme">
            <div className="stat-header">
              <span>Improvement Rate</span>
              <TrendingUp size={24} className="text-green" />
            </div>
            <div className="stat-value">+12%</div>
            <div className="stat-label">This semester</div>
          </div>
        </div>

        {/* Charts Section Placeholder (Visual Representation) */}
        <div className="charts-container">
          {/* Performance Trends Line Chart */}
          <div className="chart-box">
            <h3>Performance Trends</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.5)" axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="students" stroke="#00E5FF" strokeWidth={3} dot={{ r: 4, fill: '#00E5FF' }} />
                  <Line type="monotone" dataKey="marks" stroke="#7B61FF" strokeWidth={3} dot={{ r: 4, fill: '#7B61FF' }} />
                  <Line type="monotone" dataKey="trend" stroke="#10B981" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Performance Bar Chart */}
          <div className="chart-box">
            <h3>Department Performance</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00E5FF" stopOpacity={1} />
                      <stop offset="100%" stopColor="#00E5FF" stopOpacity={0.3} />
                    </linearGradient>
                    <linearGradient id="colorMarks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7B61FF" stopOpacity={1} />
                      <stop offset="100%" stopColor="#7B61FF" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.5)" axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Bar dataKey="students" fill="url(#colorStudents)" radius={[6, 6, 0, 0]} barSize={35} />
                  <Bar dataKey="marks" fill="url(#colorMarks)" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI-Powered Insights */}
        <section className="insights-section">
          <h3>AI-Powered Insights</h3>
          <div className="insights-grid">
            <div className="insight-item green-grad">
              <div className="insight-icon"><TrendingUp size={24} /></div>
              <h4>Performance Trend</h4>
              <p>Overall student performance has improved by 12% this semester</p>
            </div>
            <div className="insight-item orange-grad">
              <div className="insight-icon"><CircleAlert size={24} /></div>
              <h4>Attention Required</h4>
              <p>5 students need additional support in Mathematics</p>
            </div>
            <div className="insight-item blue-grad">
              <div className="insight-icon"><Target size={24} /></div>
              <h4>Goal Achievement</h4>
              <p>87% of students are on track to meet their academic goals</p>
            </div>
          </div>
        </section>

        {/* Attendance Heatmap */}
        <section className="heatmap-section">
          <h3>Attendance Heatmap</h3>
          <div className="heatmap-container">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
              <div key={day} className="heatmap-row">
                <div className="day-label">{day}</div>
                <div className="heatmap-cells">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`heatmap-cell cell-color-${(i % 4) + 1}`}></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="heatmap-legend">
            <span>Low</span>
            <div className="legend-colors">
              <div className="legend-box red"></div>
              <div className="legend-box purple"></div>
              <div className="legend-box cyan"></div>
              <div className="legend-box green"></div>
            </div>
            <span>High</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;