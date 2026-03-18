import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { initialHospitals, initialAmbulances, initialRequests } from '../data/mockData';
import { getAllHospitals } from '../api/hospitalApi';
import { getAllAmbulances } from '../api/ambulanceApi';
import { createRequest as apiCreateReq, getAllRequests, updateRequestStatus as apiUpdateReqStatus } from '../api/requestApi';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [hospitals, setHospitals] = useState(() => initialHospitals.filter(Boolean));
  const [ambulances, setAmbulances] = useState(() => initialAmbulances.filter(Boolean));
  const [requests, setRequests] = useState(() => initialRequests.filter(Boolean));
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sync with backend
  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [hospData, ambData, reqData] = await Promise.all([
        getAllHospitals(),
        getAllAmbulances(),
        getAllRequests()
      ]);
      
      if (hospData) setHospitals(hospData);
      if (ambData) setAmbulances(ambData);
      if (reqData) setRequests(reqData);
      console.log('✅ Data synchronized with backend');
    } catch (err) {
      console.warn('⚠️ Failed to sync with backend, using mock data:', err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Hospital resource updates
  const updateHospitalResource = useCallback((hospitalId, field, value) => {
    setHospitals(prev => prev.filter(Boolean).map(h => {
      if (!h || h.id !== hospitalId) return h;
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return { ...h, [parent]: { ...h[parent], [child]: value } };
      }
      return { ...h, [field]: value };
    }));
  }, []);

  const updateBloodBank = useCallback((hospitalId, bloodType, units) => {
    setHospitals(prev => prev.map(h => {
      if (h.id !== hospitalId) return h;
      return { ...h, bloodBank: { ...h.bloodBank, [bloodType]: units } };
    }));
  }, []);

  const updateSpecialist = useCallback((hospitalId, index, updates) => {
    setHospitals(prev => prev.map(h => {
      if (h.id !== hospitalId) return h;
      const specialists = [...h.specialists];
      specialists[index] = { ...specialists[index], ...updates };
      return { ...h, specialists };
    }));
  }, []);

  const addSpecialist = useCallback((hospitalId, specialist) => {
    setHospitals(prev => prev.map(h => {
      if (h.id !== hospitalId) return h;
      return { ...h, specialists: [...h.specialists, specialist] };
    }));
  }, []);

  // Ambulance updates
  const updateAmbulanceStatus = useCallback((ambulanceId, status) => {
    setAmbulances(prev => prev.map(a =>
      a.id === ambulanceId ? { ...a, status } : a
    ));
  }, []);

  // Notifications
  const addNotification = useCallback((notification) => {
    const notif = { ...notification, id: 'n' + Date.now(), createdAt: new Date().toISOString(), read: false };
    setNotifications(prev => [notif, ...prev]);
  }, []);

  const markNotificationRead = useCallback((notifId) => {
    setNotifications(prev => prev.map(n =>
      n.id === notifId ? { ...n, read: true } : n
    ));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  // Request management
  const createRequest = useCallback(async (request) => {
    try {
      const newReq = await apiCreateReq(request);
      setRequests(prev => [newReq, ...prev]);
      addNotification({
        title: 'New Request',
        message: `New ${request.type} request received`,
        type: 'info',
        targetRole: request.type === 'ambulance-request' ? 'ambulance' : 'hospital',
        targetId: request.toHospitalId || request.toAmbulanceId,
      });
      return newReq;
    } catch (err) {
      console.error('Failed to create request:', err);
      // Optional: keep local fallback if desired, but here we expect backend
      const fallbackReq = { ...request, id: 'req' + Date.now(), createdAt: new Date().toISOString(), status: 'pending' };
      setRequests(prev => [fallbackReq, ...prev]);
      return fallbackReq;
    }
  }, [addNotification]);

  const updateRequestStatus = useCallback(async (requestId, status, notes) => {
    try {
      const updatedReq = await apiUpdateReqStatus(requestId, status, notes);
      setRequests(prev => prev.map(r => r.id === requestId ? updatedReq : r));
    } catch (err) {
      console.error('Failed to update request:', err);
      // Local fallback for UI snappiness
      setRequests(prev => prev.map(r =>
        r.id === requestId ? { ...r, status, ...(notes ? { responseNotes: notes } : {}) } : r
      ));
    }
  }, []);


  const getHospital = useCallback((id) => hospitals.find(h => h.id === id), [hospitals]);
  const getAmbulance = useCallback((id) => ambulances.find(a => a.id === id), [ambulances]);

  const getHospitalRequests = useCallback((hospitalId) => {
    return requests.filter(r => r.toHospitalId === hospitalId);
  }, [requests]);

  const getAmbulanceRequests = useCallback((ambulanceId) => {
    return requests.filter(r => r.toAmbulanceId === ambulanceId);
  }, [requests]);

  const getPatientRequests = useCallback((patientId) => {
    return requests.filter(r => r.from?.patientId === patientId);
  }, [requests]);

  const getAmbulancesByHospital = useCallback((hospitalId) => {
    return ambulances.filter(a => a.hospitalId === hospitalId);
  }, [ambulances]);

  return (
    <DataContext.Provider value={{
      hospitals, ambulances, requests, notifications, isLoading,
      updateHospitalResource, updateBloodBank, updateSpecialist, addSpecialist,
      updateAmbulanceStatus,
      createRequest, updateRequestStatus,
      addNotification, markNotificationRead, clearNotifications,
      getHospital, getAmbulance,
      getHospitalRequests, getAmbulanceRequests, getPatientRequests,
      getAmbulancesByHospital, refreshData,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
