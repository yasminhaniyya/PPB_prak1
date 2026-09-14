import express from "express";
import { ReportController } from "../controllers/reportController.js";

const router = express.Router();

// Endpoint: GET /api/reports/total
router.get("/total", ReportController.getTotalCustomers);

export default router;
