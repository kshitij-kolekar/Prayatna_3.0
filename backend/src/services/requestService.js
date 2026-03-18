/**
 * services/requestService.js
 * Logic for Patient/Hospital/Ambulance requests.
 */
import prisma from '../config/db.js';

export const createRequest = async (data) => {
  // Map common frontend fields to backend schema
  const created = await prisma.patientRequest.create({
    data: {
      hospitalId: data.toHospitalId || data.hospitalId || undefined,
      toAmbulanceId: data.toAmbulanceId || undefined,
      patientId: data.from?.patientId || data.patientId || undefined,
      fromHospitalId: data.from?.hospitalId || data.fromHospitalId || undefined,
      patientName: data.from?.name || data.patientName || 'Unknown',
      patientPhone: data.from?.phone || data.patientPhone || '',
      type: data.type,
      condition: data.condition || '',
      urgency: data.urgency || 'normal',
      facility: data.facility,
      bloodType: data.bloodType,
      units: data.units ? parseInt(data.units) : undefined,
      transferReason: data.transferReason || data.notes,
      pickupLocation: data.pickupLocation,
      notes: data.notes,
      priority: (data.urgency?.toUpperCase() === 'CRITICAL' || data.urgency === 'critical') ? 'CRITICAL' : 
                (data.urgency?.toUpperCase() === 'HIGH' || data.urgency === 'high') ? 'HIGH' : 'MEDIUM',
      status: 'PENDING'
    }
  });

  return {
    ...created,
    status: created.status.toLowerCase()
  };
};

export const getAllRequests = async (filters = {}) => {
  const { hospitalId, ambulanceId, patientId } = filters;
  
  const where = {};
  if (hospitalId) {
    where.OR = [
      { hospitalId },
      { fromHospitalId: hospitalId }
    ];
  }
  if (ambulanceId) where.toAmbulanceId = ambulanceId;
  if (patientId) where.patientId = patientId;

  const requests = await prisma.patientRequest.findMany({
    where,
    include: {
      hospital: { select: { name: true } },
      ambulance: { select: { driverName: true, vehicleNo: true } },
      patient: { select: { name: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return requests.map(r => ({
    ...r,
    status: r.status.toLowerCase()
  }));
};

export const updateRequestStatus = async (id, status, responseNotes) => {
  // Status comes as 'accepted'/'rejected' from frontend, prisma expects 'ACCEPTED'/'REJECTED'
  const prismaStatus = status.toUpperCase();
  
  const updated = await prisma.patientRequest.update({
    where: { id },
    data: { 
      status: prismaStatus, 
      ...(responseNotes && { responseNotes }) 
    }
  });

  return {
    ...updated,
    status: updated.status.toLowerCase()
  };
};
