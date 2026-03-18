import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, Ambulance, Users, Shield, Activity, Stethoscope, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import './Auth.css';

const roles = [
  { id: 'hospital', label: 'Hospital', icon: Building2, color: 'primary' },
  { id: 'admin', label: 'Admin', icon: Shield, color: 'danger' },
  { id: 'doctor', label: 'Doctor', icon: Stethoscope, color: 'accent' },
  { id: 'ambulance', label: 'Ambulance', icon: Ambulance, color: 'warning' },
  { id: 'patient', label: 'Patient', icon: Users, color: 'success' },
];

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/${user.role}`, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter your Email and Password');
      return;
    }

    setIsLoading(true);
    try {
      const credentials = { email, password };
      const result = await login(credentials);
      if (result.success) {
        toast.success(`Welcome back, ${result.name || 'Member'}!`);
        // AuthContext now handles the role-based redirect via useEffect above
      } else {
        toast.error(result.message || 'Invalid credentials');
      }
    } catch (err) {
      toast.error('An unexpected error occurred during Login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg animated-gradient">
        <div className="auth-bg-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>
      </div>
      <div className="auth-container">
        <div className="auth-card card-glass">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <div className="logo-icon"><Activity size={24} /></div>
              <span className="logo-text">Medi<span className="logo-highlight">Link</span></span>
            </Link>
            <h1>Welcome Back</h1>
            <p>Sign in with your email account</p>
          </div>

          <form onSubmit={handleLogin} className="auth-form mt-4">
            <div className="form-grid">
              <div className="form-group grid-full">
                <label className="form-label"><Mail size={14} /> Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group grid-full" style={{ marginTop: '1rem' }}>
                <label className="form-label"><Shield size={14} /> Password</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary auth-submit btn-lg" disabled={isLoading} style={{ width: '100%', marginTop: '1rem' }}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Create one</Link></p>
          </div>

          <div className="auth-demo-info mt-4">
            <p className="demo-title">Example Credentials</p>
            <p>Admin: <strong>admin@medilink.com</strong></p>
            <p>Hospital: <strong>info@apollohyd.com</strong></p>
            <p>Patient: <strong>amit@gmail.com</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
