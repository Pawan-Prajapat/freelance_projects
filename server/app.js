import express from "express";
import { config } from "dotenv";
import cors from "cors";
import paymentRoute from "./routes/paymentRoutes.js";
import buyerRoute from "./routes/buyerRoutes.js";
import productRoute from "./routes/productRoutes.js";
import authRoute from "./routes/authRoutes.js";
import categroiesRoute from "./routes/categroiesRoutes.js";

config({ path: "./config/config.env" });

export const app = express();

const corsOptions = {
  origin: process.env.FRONT_SITE, // Replace with your allowed origin(s)
  methods: 'GET, POST, PUT, DELETE, OPTIONS', // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", paymentRoute);
app.use("/api", buyerRoute);
app.use("/api", productRoute);
app.use("/api", authRoute);
app.use("/api", categroiesRoute);
app.use(express.static('public'));

app.get("/api/getkey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});

app.get('*', (req, res, next) => {
  res.status(200).json({
    message: 'bad request'
  });
});
