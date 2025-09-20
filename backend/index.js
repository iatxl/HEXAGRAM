import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import loopRouter from "./routes/loop.routes.js";
import storyRouter from "./routes/story.routes.js";
import messageRouter from "./routes/message.routes.js";
import aiRouter from "./routes/ai.routes.js";

import { app, server } from "./socket.js";

dotenv.config();

const port = process.env.PORT || 5000;

// ✅ Fixed CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",             // local dev
      "https://hexagram-nsf9.onrender.com" // deployed frontend
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/loop", loopRouter);
app.use("/api/story", storyRouter);
app.use("/api/message", messageRouter);
app.use("/api/ai", aiRouter);

// Start server
server.listen(port, () => {
  connectDb();
  console.log(`🚀 Server running on port ${port}`);
});
