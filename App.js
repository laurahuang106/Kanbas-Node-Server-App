import "dotenv/config";
import session from "express-session";
import express from 'express'
import mongoose from 'mongoose';
import UserRoutes from './Users/routes.js';
import Lab5 from "./Lab5.js";
import Hello from "./Hello.js"
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import cors from "cors";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(express.json());

app.use(cors({
    credentials: true,  // support cookies
    origin: process.env.FRONTEND_URL
}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };  
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
}
app.use(session(sessionOptions));  

CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Hello(app)
Lab5(app);
UserRoutes(app)
app.listen(process.env.PORT || 4000);

