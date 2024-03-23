import express from 'express'
import Lab5 from "./Lab5.js";
import Hello from "./Hello.js"
const app = express()
Hello(app)
Lab5(app);
app.listen(4000)

