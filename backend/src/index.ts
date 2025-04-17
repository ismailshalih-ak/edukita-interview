import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from "./routes/UserRoutes";
import assignmentRouter from "./routes/AssignmentRoutes"
import gradeRouter from "./routes/GradeRoutes"
import { userService } from "./service/UserService";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Configure CORS with environment variables
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'userId']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const userId = parseInt(req.header('userId') || "");
  if (userId) {
      const user = userService.getUserById(userId);
      if (user !== null) {
          req.user = user;
      }
  }
  next();
});

app.get("/", (req, res) => {
    res.send("HELLO WORLD")
})

app.use("/users", userRouter);
app.use("/assignments", assignmentRouter);
app.use("/grades", gradeRouter);

app.listen(PORT, () => {
    console.log('listening to port ' + PORT)
})