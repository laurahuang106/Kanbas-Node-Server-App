import express from 'express'
import mongoose from 'mongoose';
import UserRoutes from './Users/routes.js';
import Lab5 from "./Lab5.js";
import Hello from "./Hello.js"
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import cors from "cors";

mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const app = express()
app.use(cors());
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Hello(app)
Lab5(app);
UserRoutes(app)
app.listen(process.env.PORT || 4000);

