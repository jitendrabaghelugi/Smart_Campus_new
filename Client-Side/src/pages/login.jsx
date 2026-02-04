import React, { useState, useEffect } from 'react';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import "../assets/css/login.css";
import { login as loginAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();

  const [init, setInit] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

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

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginAPI(formData.email, formData.password);

      // Use auth context to set user and token
      login(response.user, response.token);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {init && (
        <Particles
          id="tsparticles"
          options={particleOptions}
          className="particles-canvas"
        />
      )}
      {/* Background Decorative Blurs */}
      <div className="bg-blur top-right"></div>
      <div className="bg-blur bottom-left"></div>

      <div className="login-card">
        {/* Inner Radial Glow */}
        <div className="inner-glow"></div>

        <div className="card-content">
          <header className="header">
            <div className="logo-container">
              <Sparkles className="logo-icon" size={40} strokeWidth={2} />
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to access your NEOS account</p>
          </header>

         

          {/* Error Message */}
          {error && (
            <div style={{
              backgroundColor: '#ff4444',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-field">
              <label>Email Address</label>
              <div className="input-box">
                <Mail className="field-icon" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="input-field">
              <label>Password</label>
              <div className="input-box">
                <Lock className="field-icon" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="pw-toggle"
                  onClick={togglePasswordVisibility}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-utils">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
              <button type="button" className="link-btn">Forgot password?</button>
            </div>

            <button type="submit" className="signin-btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'} <ArrowRight size={20} />
            </button>
          </form>

          <p className="signup-footer">
            Don't have an account? <button className="link-btn highlight">Sign up for free</button>
          </p>

          <div className="legal-footer">
            By signing in, you agree to our <button className="link-btn highlight">Terms of Service</button> and <button className="link-btn highlight">Privacy Policy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;