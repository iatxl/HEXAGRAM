import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { generateMemory } from "../controllers/ai.controllers.js";
import { upload } from "../middlewares/multer.js";

const aiRouter = express.Router();

aiRouter.post(
  "/generate",
  isAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  generateMemory
);

export default aiRouter;
