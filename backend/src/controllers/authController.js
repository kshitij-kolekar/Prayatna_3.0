/**
 * controllers/authController.js
 */
import prisma from '../config/db.js';
import { sendSuccess, sendError } from '../utils/responseHelper.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev_only';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(`[Login Attempt] Email: ${email}`);

    if (!email || !password) {
      return sendError(res, 'Email and password are required', 400);
    }

    let user = null;
    let role = null;
    let hospitalId = null;

    // 1. Try finding Hospital
    user = await prisma.hospital.findUnique({ where: { email } });
    if (user) {
      role = 'hospital';
      hospitalId = user.id;
    }

    // 2. Try finding SystemUser (Admin/Doctor)
    if (!user) {
      user = await prisma.systemUser.findUnique({ where: { email } });
      if (user) {
        role = user.role.toLowerCase(); // 'admin' or 'doctor'
      }
    }

    // 3. Try finding Patient
    if (!user) {
      user = await prisma.patient.findUnique({ where: { email } });
      if (user) {
        role = 'patient';
      }
    }

    // 4. Try finding Ambulance
    if (!user) {
      user = await prisma.ambulance.findUnique({ where: { email } });
      if (user) {
        role = 'ambulance';
        hospitalId = user.hospitalId;
      }
    }

    if (!user) {
      console.log(`[Login Failed] User not found for role: ${role}`);
      return sendError(res, 'Invalid credentials', 401);
    }

    console.log(`[Login Info] User found: ${user.name || user.driverName || user.email}, Role: ${role}`);

    if (user.password !== password) {
      console.log(`[Login Failed] Password mismatch for ${user.id}`);
      // Note: In production, password should be hashed with bcrypt
      return sendError(res, 'Invalid credentials', 401);
    }

    // JWT payload
    const payload = {
      id: user.id,
      name: user.name || user.driverName,
      role: role,
      ...(hospitalId && { hospitalId })
    };

    // Generate token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

    // Login successful
    sendSuccess(res, {
      role,
      token,
      name: user.name || user.driverName,
      ...(hospitalId && { hospitalId }),
      id: user.id
    }, 200, 'Login successful');
  } catch (error) {
    next(error);
  }
};
