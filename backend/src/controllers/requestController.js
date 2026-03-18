/**
 * controllers/requestController.js
 */
import * as requestService from '../services/requestService.js';
import { sendSuccess } from '../utils/responseHelper.js';

export const createRequest = async (req, res, next) => {
  try {
    const data = await requestService.createRequest(req.body);
    return sendSuccess(res, data, 201, 'Request created successfully');
  } catch (err) {
    next(err);
  }
};

export const getRequests = async (req, res, next) => {
  try {
    const { hospitalId, ambulanceId, patientId } = req.query;
    const data = await requestService.getAllRequests({ hospitalId, ambulanceId, patientId });
    return sendSuccess(res, data);
  } catch (err) {
    next(err);
  }
};

export const updateRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const data = await requestService.updateRequestStatus(id, status, notes);
    return sendSuccess(res, data);
  } catch (err) {
    next(err);
  }
};
