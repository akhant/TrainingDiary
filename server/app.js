//express
var express = require("express"),
  path = require("path");

const app = express();
app.set("port", process.env.PORT || 3000);

//mongodb
import mongoose from "mongoose";

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


//middlewares
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";


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

//routes
import {
  getData,
  addExercise,
  dropDatabase,
  deleteExercise,
  changeName,
  addApproach,
  deleteApproach,
  changeApproach,
  workoutFinish,
  workoutStart
} from "./controllers";

app.get("/api/data", getData);
app.post("/api/data", addExercise);
app.post("/api/drop", dropDatabase);
app.post("/api/deleteEx", deleteExercise);
app.post("/api/changeName", changeName);
app.post("/api/addApproach", addApproach);
app.post("/api/deleteApproach", deleteApproach);
app.post("/api/changeApproach", changeApproach);
app.post("/api/workoutStart", workoutStart);
app.post("/api/workoutFinish", workoutFinish);

//server
app.listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
