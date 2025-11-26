import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// ------------------- SOCKET.IO -------------------
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on("sendMessage", ({ roomId, message, sender }) => {
    io.to(roomId).emit("receiveMessage", { message, sender });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ------------------- MIDDLEWARES -------------------
app.use(cors());
app.use(express.json());  // IMPORTANT: allows JSON body parsing

// ------------------- ROUTES -------------------
app.use("/api/auth", authRoutes);         // login/register
app.use("/api/profile", profileRoutes);   // profile/me
app.use("/api/match", matchRoutes);       // matching

// ------------------- DATABASE + SERVER START -------------------
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    )
  )
  .catch((err) => console.error("MongoDB Connection Error:", err));
