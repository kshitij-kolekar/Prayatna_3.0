import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { LayoutDashboard, Stethoscope, ClipboardList, Settings, X } from 'lucide-react';
import '../Dashboard.css';

const doctorLinks = [
  { path: '/doctor', label: 'Assigned Requests', icon: ClipboardList },
];

export default function DoctorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="dashboard-layout">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header" style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-color)', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '38px', 
              height: '38px', 
              background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))', 
              borderRadius: '10px', 
              color: 'white',
              boxShadow: '0 4px 12px rgba(0, 178, 205, 0.25)',
              flexShrink: 0
            }}>
              <Stethoscope size={22} />
            </div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Doc Panel</h2>
          </div>
          <button className="btn-icon btn-ghost mobile-close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="sidebar-nav">
          {doctorLinks.map(link => {
            const isActive = location.pathname === link.path;
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
