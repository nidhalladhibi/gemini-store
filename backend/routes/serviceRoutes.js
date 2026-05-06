import express from "express";
import { createService, deleteService, getServices, updateService } from "../controllers/serviceController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getServices).post(protect, admin, createService);
router.route("/:id").put(protect, admin, updateService).delete(protect, admin, deleteService);

export default router;
