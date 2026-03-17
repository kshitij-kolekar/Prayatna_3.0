const prisma = require("../prisma/client");

exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await prisma.hospital.findMany({
      include: {
        resources: true,
        ambulances: true
      }
    });

    res.json({ status: "success", data: hospitals });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getHospitalById = async (req, res) => {
  const { id } = req.params;

  try {
    const hospital = await prisma.hospital.findUnique({
      where: { id },
      include: {
        resources: true,
        bloodInventory: true,
        specialists: true,
        equipments: true
      }
    });

    if (!hospital) {
      return res.status(404).json({
        status: "error",
        message: "Hospital not found"
      });
    }

    res.json({ status: "success", data: hospital });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.disableHospital = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.auditLog.create({
      data: {
        userId: req.user.id,
        action: "HOSPITAL_DISABLED",
        entityType: "Hospital",
        entityId: id
      }
    });

    res.json({ status: "success", message: "Hospital disabled" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        phoneNumber: true,
        role: true,
        createdAt: true
      }
    });

    res.json({ status: "success", data: users });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });

    res.json({ status: "success", data: user });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.suspendUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.auditLog.create({
      data: {
        userId: req.user.id,
        action: "USER_SUSPENDED",
        entityType: "User",
        entityId: id
      }
    });

    res.json({ status: "success", message: "User suspended" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id }
    });

    res.json({ status: "success", message: "User deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getAmbulances = async (req, res) => {
  try {
    const ambulances = await prisma.ambulance.findMany({
      include: {
        hospital: true
      }
    });

    res.json({ status: "success", data: ambulances });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getAmbulanceById = async (req, res) => {
  const { id } = req.params;

  try {
    const ambulance = await prisma.ambulance.findUnique({
      where: { id },
      include: {
        hospital: true
      }
    });

    res.json({ status: "success", data: ambulance });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getAllResources = async (req, res) => {
  try {
    const resources = await prisma.hospitalResource.findMany({
      include: {
        hospital: true
      }
    });

    res.json({ status: "success", data: resources });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getResourcesByHospital = async (req, res) => {
  const { hospitalId } = req.params;

  try {
    const resources = await prisma.hospitalResource.findUnique({
      where: { hospitalId }
    });

    res.json({ status: "success", data: resources });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const hospitals = await prisma.hospital.count();
    const patients = await prisma.patient.count();
    const ambulances = await prisma.ambulance.count();
    const requests = await prisma.admissionRequest.count();

    res.json({
      status: "success",
      data: {
        hospitals,
        patients,
        ambulances,
        requests
      }
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await prisma.auditLog.findMany({
      include: {
        user: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json({ status: "success", data: logs });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.sendNotification = async (req, res) => {
  const { userId, message, type } = req.body;

  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        message,
        type
      }
    });

    res.json({ status: "success", data: notification });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json({ status: "success", data: notifications });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getTransfers = async (req, res) => {
  try {
    const transfers = await prisma.hospitalTransferRequest.findMany({
      include: {
        senderHospital: true,
        receiverHospital: true
      }
    });

    res.json({ status: "success", data: transfers });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getAllAdmissions = async (req, res) => {
  try {
    const admissions = await prisma.admissionRequest.findMany({
      include: {
        patient: true,
        hospital: true
      }
    });

    res.json({ status: "success", data: admissions });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};