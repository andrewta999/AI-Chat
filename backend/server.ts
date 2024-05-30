import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
// import socketHandler from './socket';
import cors from "cors";
import rateLimit from 'express-rate-limit';


// Load environment variables from .env file
const mongoURI = process.env.MONGODB_URI as string;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
        dbName: "ai-chatbot"
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};
connectDB();

// apply rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use(apiLimiter);

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

// io.on('connection', (socket) => {
//   console.log('New client connected');
//   socketHandler(socket);
// });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
