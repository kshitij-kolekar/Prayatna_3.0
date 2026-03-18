import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { LayoutDashboard, AlertCircle, Building2, Ambulance, Activity, BarChart3, X, Shield } from 'lucide-react';
import '../Dashboard.css';

const adminLinks = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/emergency', label: 'Emergency Cases', icon: AlertCircle },
  { path: '/admin/hospitals', label: 'Hospitals', icon: Building2 },
  { path: '/admin/ambulances', label: 'Ambulances', icon: Ambulance },
  { path: '/admin/resources', label: 'Resource Monitor', icon: Activity },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="dashboard-layout">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

      {/* Custom Admin Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header" style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-color)', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '38px', 
              height: '38px', 
              background: 'linear-gradient(135deg, var(--danger), #dc2626)', 
              borderRadius: '10px', 
              color: 'white',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
              flexShrink: 0
            }}>
              <Shield size={22} />
            </div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Admin Panel</h2>
          </div>
          <button className="btn-icon btn-ghost mobile-close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="sidebar-nav">
          {adminLinks.map(link => {
            const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (window.innerWidth <= 768) setSidebarOpen(false);
                }}
              >
                <span className="sidebar-link-icon"><link.icon size={20} /></span>
                <span className="sidebar-link-text">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </aside>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
