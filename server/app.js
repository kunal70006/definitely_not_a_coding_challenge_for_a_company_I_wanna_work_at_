import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

import {
  getComments,
  createComments,
  updateUpvotes,
} from "./controllers/comments.js";

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
router.get("/", getComments);
router.post("/", createComments);
router.patch("/", updateUpvotes);
app.use("/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("hello"));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
