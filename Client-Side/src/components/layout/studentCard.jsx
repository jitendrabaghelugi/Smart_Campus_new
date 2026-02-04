  import React, { useEffect, useRef } from 'react';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import '../../assets/css/studentCard.css';
  import studentImg from '../../assets/images/student.png';

  gsap.registerPlugin(ScrollTrigger);

  const StudentCard = () => {
    const mainRef = useRef(null);
    const photoRef = useRef(null);

    useEffect(() => {
      
      let ctx = gsap.context(() => {
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5, 
          }
        });

        
        tl.to(photoRef.current, {
          top: '40%',       
          right: '67%',    
          ease: "none"
        })
        
        .to(photoRef.current, {
          top: '73%',      
          right: '5%',      
          ease: "none"
        });

        

      }, mainRef);

      return () => ctx.revert(); 
    }, []);

    return (
      <div id="main" ref={mainRef}>
        
        <img 
          ref={photoRef}
          src={studentImg} 
          alt="Student" 
          className="floating-student-photo"
          style={{ top: '6%', right: '9%' }} 
        />

        <section className="scroll-section name-section">
          
          <div className="content-left">
          <div className="info-container">
            <p className="info-label">Bridging the gap between code and community.</p>

          </div>
            <div className="info-container">
              <p className="info-label">Student Name</p>
              <h2 className="info-value">Alex Johnson</h2>
              <p className="info-description">Engineering the future of campus tech.</p>
            </div>
            <div className="info-container">
              <p className="info-description">Currently developing autonomous transit solutions for urban environments.</p>

          </div>
          </div>
          
        </section>

        <section className="scroll-section class-section">
          <div className="content-right padding">
            
            <div className="info-container">
              <p className="info-label">Academic Info</p>
              <h2 className="info-value">Computer Science</h2>
              <div className="class-details">
                <div className="detail-item">
                  <span className="detail-label">Year</span>
                  <span className="detail-value">Senior</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">GPA</span>
                  <span className="detail-value">3.9</span>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        <section className="scroll-section ranking-section">
          <div className="content-left">
            <div className="ranking-container">
              <p className="info-label">Performance</p>
              <div className="rank-display">
                <div className="rank-number">
                  <span className="rank-hash">#</span>
                  <span className="rank-value">04</span>
                </div>
                <div className="rank-badge">Top 5% Student</div>
              </div>
              <div className="rank-stats">
                <div className="stat-item">
                  <span className="stat-value">98</span>
                  <span className="stat-label">Credits</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">A+</span>
                  <span className="stat-label">Grade</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  export default StudentCard;