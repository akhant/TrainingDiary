import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import * as route from "./controllers";


dotenv.config();
// express
const app = express();
app.set("port", process.env.PORT || 3000);

// mongodb
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost:27017/training",
  error => {
    if (error) {
      console.error("Please make sure Mongodb is installed and running!"); // eslint-disable-line no-console
      throw error;
    }
  }
);

// middlewares
app.use(morgan("dev"));
app.use(express.errorHandler());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/api/data", route.getData);
app.post("/api/data", route.addExercise);
app.post("/api/drop", route.dropDatabase);
app.post("/api/deleteEx", route.deleteExercise);
app.post("/api/changeName", route.changeName);
app.post("/api/addApproach", route.addApproach);
app.post("/api/deleteApproach", route.deleteApproach);
app.post("/api/changeApproach", route.changeApproach);
app.post("/api/workoutStart", route.workoutStart);
app.post("/api/workoutFinish", route.workoutFinish);
app.post("/api/users", route.userSignup);
app.post("/api/auth", route.userLogin);
// server
app.listen(app.get("port"), () =>
  console.log(`Express server listening on port ${app.get("port")}`)
);
