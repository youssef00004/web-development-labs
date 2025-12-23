const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

const courseRouter = require("./Routers/Course");

const MONGO_URI = "mongodb://localhost:27017/Courses";

const databaseConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

databaseConnect();

app.use(express.json());

app.use("/course", courseRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
