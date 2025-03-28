import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
dotenv.config();

const app = express();
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://challan-frontend.vercel.app",
    "http://localhost:3001",
    "https://ircc-portal.com",
    "https://www.ircc-portal.com",
    "https://admin.ircc-portal.com"
  ],
};

app.use(cors(corsOptions));
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

import AuthRoute from "./routes/Auth.route.js";
import clientRoute from "./routes/Client.route.js";
import challanRoute from "./routes/Challan.route.js";
import pdfRoute from "./routes/pdf.route.js";
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/client", clientRoute);
app.use("/api/v1/challan", challanRoute);
app.use("/api/v1/pdf", pdfRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
