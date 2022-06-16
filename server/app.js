import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { getComments } from "./controllers/comments.js";

const app = express();
const router = express.Router();

router.get("/", getComments);
app.use("/", router);
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("hello"));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
