import express from "express";
import statusController from "./status-controller.js";

const router = express.Router();
router.get('/status/:cityName', statusController.getCityStatus)

export default router;
