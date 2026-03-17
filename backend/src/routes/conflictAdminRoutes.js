const express = require("express");
const router = express.Router();

const controller = require("../controllers/conflictAdminController");
const requireRole = require("../middleware/requireRole");

router.get(
  "/admin/conflicts",
  requireRole("CONFLICT_ADMIN"),
  controller.getConflicts
);

router.get(
  "/admin/conflicts/:id",
  requireRole("CONFLICT_ADMIN"),
  controller.getConflictById
);

router.patch(
  "/admin/conflicts/:id/resolve",
  requireRole("CONFLICT_ADMIN"),
  controller.resolveConflict
);

router.post(
  "/admin/conflicts/transfer",
  requireRole("CONFLICT_ADMIN"),
  controller.transferPatient
);

router.get(
  "/admin/conflicts/history",
  requireRole("CONFLICT_ADMIN"),
  controller.getConflictHistory
);

module.exports = router;