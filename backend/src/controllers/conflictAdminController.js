const prisma = require("../prisma/client");

exports.getConflicts = async (req, res) => {
  try {
    const conflicts = await prisma.admissionRequest.findMany({
      where: {
        status: "PENDING"
      },
      include: {
        patient: true,
        hospital: {
          include: {
            resources: true
          }
        }
      }
    });

    const filtered = conflicts.filter(r => {
      const icu = r.hospital.resources?.availableIcuBeds || 0;
      return icu <= 0;
    });

    res.json({
      status: "success",
      data: filtered
    });

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
};

exports.getConflictById = async (req, res) => {
  const { id } = req.params;

  try {
    const conflict = await prisma.admissionRequest.findUnique({
      where: { id },
      include: {
        patient: true,
        hospital: {
          include: {
            resources: true,
            admissionRequests: true
          }
        }
      }
    });

    if (!conflict) {
      return res.status(404).json({
        status: "error",
        message: "Conflict not found"
      });
    }

    res.json({
      status: "success",
      data: conflict
    });

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
};

exports.resolveConflict = async (req, res) => {
  const { id } = req.params;
  const { decision } = req.body;

  try {
    const validDecisions = ["ACCEPTED", "REJECTED", "CANCELLED"];

    if (!validDecisions.includes(decision)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid decision"
      });
    }

    const updated = await prisma.admissionRequest.update({
      where: { id },
      data: {
        status: decision
      }
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user.id,
        action: "CONFLICT_RESOLVED",
        entityType: "AdmissionRequest",
        entityId: id,
        description: `Decision: ${decision}`
      }
    });

    res.json({
      status: "success",
      data: updated
    });

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
};

exports.transferPatient = async (req, res) => {
  const { requestId, targetHospitalId } = req.body;

  try {
    const request = await prisma.admissionRequest.findUnique({
      where: { id: requestId }
    });

    if (!request) {
      return res.status(404).json({
        status: "error",
        message: "Request not found"
      });
    }

    const transfer = await prisma.hospitalTransferRequest.create({
      data: {
        senderHospitalId: request.hospitalId,
        receiverHospitalId: targetHospitalId,
        transferType: "PATIENT_TRANSFER",
        description: "Transfer due to resource conflict"
      }
    });

    await prisma.admissionRequest.update({
      where: { id: requestId },
      data: {
        status: "REJECTED"
      }
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user.id,
        action: "PATIENT_TRANSFER_INITIATED",
        entityType: "AdmissionRequest",
        entityId: requestId
      }
    });

    res.json({
      status: "success",
      data: transfer
    });

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
};

exports.getConflictHistory = async (req, res) => {
  try {
    const history = await prisma.admissionRequest.findMany({
      where: {
        status: {
          in: ["ACCEPTED", "REJECTED", "CANCELLED"]
        }
      },
      include: {
        patient: true,
        hospital: true
      },
      orderBy: {
        updatedAt: "desc"
      }
    });

    res.json({
      status: "success",
      data: history
    });

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
};