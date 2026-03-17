const express = require("express");
const router = express.Router();

const controller = require("../controllers/systemAdminController");
const requireRole = require("../middleware/requireRole");

router.use(requireRole("SYSTEM_ADMIN"));


router.get("/admin/hospitals", controller.getHospitals);

router.get("/admin/hospitals/:id", controller.getHospitalById);

router.patch("/admin/hospitals/:id/disable", controller.disableHospital);


router.get("/admin/users", controller.getUsers);

router.get("/admin/users/:id", controller.getUserById);

router.patch("/admin/users/:id/suspend", controller.suspendUser);

router.delete("/admin/users/:id", controller.deleteUser);


router.get("/admin/ambulances", controller.getAmbulances);

router.get("/admin/ambulances/:id", controller.getAmbulanceById);


router.get("/admin/resources", controller.getAllResources);

router.get("/admin/resources/:hospitalId", controller.getResourcesByHospital);


router.get("/admin/stats", controller.getStats);

router.get("/admin/audit-logs", controller.getAuditLogs);


router.post("/admin/notifications", controller.sendNotification);

router.get("/admin/notifications", controller.getNotifications);


router.get("/admin/transfers", controller.getTransfers);

router.get("/admin/admission-requests", controller.getAllAdmissions);


module.exports = router;