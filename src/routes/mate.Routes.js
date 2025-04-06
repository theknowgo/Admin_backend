import upload from "../config/multer.Config.js";
import express from "express";
import {
  createLocalmate,
  getAllLocalmates,
} from "../controllers/mate.Controller.js";
const router = express.Router();

// POST /create-localmate
router.post("/", upload.single("image"), createLocalmate);
// GET /localmates
router.get("/", getAllLocalmates);

export default router;
