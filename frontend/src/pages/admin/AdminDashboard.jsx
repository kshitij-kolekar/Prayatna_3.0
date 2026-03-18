import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import StatCard from '../../components/StatCard';
import { Building2, Ambulance, AlertOctagon, AlertTriangle, Users, RefreshCw, UserPlus, AlertCircle, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { hospitals, requests, updateRequestStatus } = useData();
  const [loading, setLoading] = useState(false);
  const [assigningId, setAssigningId] = useState(null);

  const fetchData = async () => {
    // Simulated refresh for UX
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleAssign = (requestId, doctorId) => {
    // In mock context we just update status to assigned and maybe add a response note
    updateRequestStatus(requestId, 'ASSIGNED', 'Assigned to doctor ' + doctorId);
    toast.success('Doctor assigned to case');
    setAssigningId(null);
  };

  if (loading) return (
    <div className="empty-state">
      <RefreshCw size={40} className="spin" style={{ color: 'var(--primary-500)' }} />
      <p>Loading platform overview...</p>
    </div>
  );

  const activeCases = requests.filter(r => 
    r.status?.toLowerCase() === 'pending' || 
    r.status?.toLowerCase() === 'assigned'
  );
  const criticalCases = activeCases.filter(r => r.priority === 'CRITICAL');

  const totalBeds = hospitals.reduce((acc, h) => acc + (h.beds?.total || 0), 0);
  const totalAvailableBeds = hospitals.reduce((acc, h) => acc + (h.beds?.available || 0), 0);
  const totalIcuBeds = hospitals.reduce((acc, h) => acc + (h.beds?.icu || 0), 0);
  const totalAvailableIcuBeds = hospitals.reduce((acc, h) => acc + (h.beds?.icuAvailable || 0), 0);
  const totalVentilators = hospitals.reduce((acc, h) => acc + (h.ventilators?.total || 0), 0);
  const totalAvailableVentilators = hospitals.reduce((acc, h) => acc + (h.ventilators?.available || 0), 0);

  return (
    <div>
      <div className="dashboard-page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Admin Overview</h1>
            <p>Platform-wide monitoring and conflict resolution</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={fetchData}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      <div className="dashboard-overview-grid">
        <StatCard icon={Building2} label="Hospitals" value={hospitals.length} color="primary" />
        <StatCard icon={AlertTriangle} label="Active Requests" value={activeCases.length} color="warning" />
        <StatCard icon={AlertOctagon} label="Critical Cases" value={criticalCases.length} color="danger" />
      </div>

      <div className="dashboard-section mt-8">
        <div className="dashboard-section-header">
          <h2><Activity size={20} /> Hospital Capacity Summary</h2>
          <span className="badge badge-primary">Network-wide</span>
        </div>
        
        <div className="grid-3 mt-4">
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Users size={16} className="text-primary" /> General Beds
              </span>
              <span style={{ fontSize: '0.85rem' }}>{Math.round((totalAvailableBeds/Math.max(1,totalBeds))*100)}%</span>
            </div>
            <div style={{ width: '100%', height: 8, backgroundColor: 'var(--bg-tertiary)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(totalAvailableBeds/Math.max(1,totalBeds))*100}%`, backgroundColor: 'var(--primary-500)' }} />
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 8 }}>{totalAvailableBeds} / {totalBeds} Available</p>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertTriangle size={16} style={{ color: 'var(--warning)' }} /> ICU Capacity
              </span>
              <span style={{ fontSize: '0.85rem' }}>{Math.round((totalAvailableIcuBeds/Math.max(1,totalIcuBeds))*100)}%</span>
            </div>
            <div style={{ width: '100%', height: 8, backgroundColor: 'var(--bg-tertiary)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(totalAvailableIcuBeds/Math.max(1,totalIcuBeds))*100}%`, backgroundColor: 'var(--warning)' }} />
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 8 }}>{totalAvailableIcuBeds} / {totalIcuBeds} Available</p>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Activity size={16} style={{ color: 'var(--danger)' }} /> Ventilators
              </span>
              <span style={{ fontSize: '0.85rem' }}>{Math.round((totalAvailableVentilators/Math.max(1,totalVentilators))*100)}%</span>
            </div>
            <div style={{ width: '100%', height: 8, backgroundColor: 'var(--bg-tertiary)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(totalAvailableVentilators/Math.max(1,totalVentilators))*100}%`, backgroundColor: 'var(--danger)' }} />
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 8 }}>{totalAvailableVentilators} / {totalVentilators} Units</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section mt-8">
        <div className="dashboard-section-header">
          <h2><AlertCircle size={20} /> Unresolved Conflicts</h2>
          <span className="badge badge-warning">{requests.filter(r => r.status?.toLowerCase() === 'pending').length} Pending</span>
        </div>

        <div className="request-list">
          {requests.filter(r => r.status?.toLowerCase() !== 'completed').map(req => (
            <div key={req.id} className="request-card" style={{ background: 'var(--bg-secondary)' }}>
              <div className="request-card-header">
                <div>
                  <h3 style={{ fontSize: '1.1rem' }}>{req.patientName}</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{req.type} • {req.hospital?.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge badge-${req.priority === 'CRITICAL' ? 'danger' : req.priority === 'HIGH' ? 'warning' : 'info'}`}>
                    {req.priority}
                  </span>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 4 }}>
                    Status: {req.status}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 12, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <strong>Condition:</strong> {req.condition}
              </div>

              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                  {req.status?.toLowerCase() === 'assigned' ? (
                    <span style={{ color: 'var(--success)', fontWeight: 600 }}>
                      Assigned
                    </span>
                  ) : 'Not Assigned'}
                </div>

                {assigningId === req.id ? (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <select
                      className="form-input"
                      style={{ padding: '4px 8px', fontSize: '0.8rem', width: 'auto', marginBottom: 0 }}
                      onChange={(e) => handleAssign(req.id, e.target.value)}
                      defaultValue=""
                    >
                      <option value="" disabled>Select Action...</option>
                      <option value="d1">Assign General Physician</option>
                      <option value="d2">Assign Specialist</option>
                    </select>
                    <button className="btn btn-ghost btn-sm" onClick={() => setAssigningId(null)}>Cancel</button>
                  </div>
                ) : (
                  <button className="btn btn-accent btn-sm" onClick={() => setAssigningId(req.id)}>
                    <UserPlus size={14} /> {req.status?.toLowerCase() === 'assigned' ? 'Reassign' : 'Process Request'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
