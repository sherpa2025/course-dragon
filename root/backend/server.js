import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import UserItem from "./api/user/userModel.js";

//--------------- List of Route Resources (add new file paths to routes here) ---------------
import homeRoutes from "./api/home/homeRoutes.js"
import userRoutes from "./api/user/userRoutes.js"
import creditsRoutes from "./api/credits/creditsRoutes.js"
import courseRoutes from "./api/course/courseRoutes.js"
import instructorScoreRoutes from "./api/instructor-score/instructorScoreRoutes.js"
import semesterRoutes from "./api/semester/semesterRoutes.js"
import degreeMapRoutes from "./api/degree-map/degreeMapRoutes.js"
import addCatalogRoutes from "./api/admin/addCatalogRoutes.js"
import userRoute from "./api/user/userRoutes.js"
import curriculumRoutes from "./api/curriculum/curriculumRoutes.js";
import colorRoutes from "./api/color/colorRoutes.js";
import categoryRoutes from "./api/category/categoryRoutes.js";
import descriptionRoutes from "./api/description/descriptionRoutes.js";


//Load config
dotenv.config({ path: "./config/config.env" });

//Create express app
const app = express();

//Grab port number from /config/config.env or defaultly use 4000
const PORT = process.env.PORT || 4000;

//making the server accessible to any domain that requests a resource from your server via a browser
// https://stackoverflow.com/questions/46024363/what-does-app-usecors-do
app.use(cors());

//make the server parse incoming messages as json payloads
app.use(express.json());

//--------------- List of our Routes (add new routes here) ---------------
app.use("/", homeRoutes);
app.use("/users", userRoutes);
app.use("/credits", creditsRoutes);
app.use("/course",courseRoutes);
app.use("/instructor-score", instructorScoreRoutes);
app.use("/semester", semesterRoutes);
app.use("/degree-map", degreeMapRoutes);
app.use("/add-catalog", addCatalogRoutes);
app.use("/curriculum", curriculumRoutes);
app.use("/colors", colorRoutes);
app.use("/category", categoryRoutes);
app.use("/description", descriptionRoutes);
app.use("/user", userRoute);
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// example of a route defined here
/*app.get("/", (req, res) => {
  res.send("employee backende erisildi");
});*/

// Begin listening on the server
app.listen(PORT, () => {
  connectDB(); //Connect to MongoDB
  console.log(`Server is running on port: ${PORT}`);
});