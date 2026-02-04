import React, { useEffect, useState } from 'react'; 
import Particles, { initParticlesEngine } from "@tsparticles/react"; 
import { loadSlim } from "@tsparticles/slim";
import '../assets/css/home.css';
import StudentCard from '../components/layout/studentCard';

const Home = () => {
  const [init, setInit] = useState(false);

  
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particleOptions = {
    fullScreen: {
      enable: true,
      zIndex: 0
    },
    fpsLimit: 120,
    particles: {
      color: { value: "#38ef7d" }, 
      number: { value: 100, density: { enable: true, area: 900 } },
      opacity: {
        value: { min: 0.1, max: 0.7 },
        animation: { enable: true, speed: 1, sync: false }
      },
      shape: { type: "circle" },
      size: { value: { min: 3, max: 7 } },
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
    <>
      <div id="home">
        <div className="home-background">
          {init && (
            <Particles
              id="tsparticles"
              options={particleOptions}
              className="particles-canvas"
            />
          )}

          <div className="gradient-overlay">
            
            <div className="hero-content">
              <h1 className="hero-title">
                Your Campus.<br />
                Intelligent.<br />
                Connected.
              </h1>

              
              <p className="hero-description">
                The next-gen operating system for forward-thinking institutions. 
                AI-driven insights, seamless integration, and a unified 
                experience for all.
              </p>

              
              <div className="cta-container">
                <button className="btn btn-primary">
                  Explore the Platform
                </button>
                <button className="btn btn-secondary">
                  Watch Success Stories
                </button>
              </div>

              
              <div className="features-container">
                
                
                <div className="glass-card">
                  <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-4z"></path>
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-4z"></path>
                  </svg>
                  <span>AI Analytics</span>
                </div>
                
                
                <div className="glass-card">
                  <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                    <line x1="6" y1="6" x2="6" y2="6"></line>
                    <line x1="6" y1="18" x2="6" y2="18"></line>
                  </svg>
                  <span>Unified Hub</span>
                </div>

                
                <div className="glass-card">
                  <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                  <span>Mobile First</span>
                </div>

              </div>

            </div>

          </div>
        </div>
        <StudentCard/>

      </div>
    </>
  );
}

export default Home;