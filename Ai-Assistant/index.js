import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected....");
    app.listen(PORT, () => console.log("Server Is Running At Port 3000"));
  })
  .catch((err) => console.error("MongoDB Error: ", err));
