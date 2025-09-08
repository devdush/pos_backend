import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { usersRoutes } from "./Routes/user.route";
import { tableRoutes } from "./Routes/table.route";
import { categoryRoutes } from "./Routes/category.route";
import fileUpload from "./middlewares/file-handler";
import { itemRoutes } from "./Routes/item.route";
import { stuartRequestRoutes } from "./Routes/stuartRequest.route";
import { kitchenOrderTicketRoutes } from "./Routes/kitchenOrderTicket.route";
import { barOrderTicketRoutes } from "./Routes/barOrderTicket.route";
import { orderRoutes } from "./Routes/order.route";
import { customerRoutes } from "./Routes/customer.route";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://bakerypos.s3-website.eu-north-1.amazonaws.com",
        "http://bakeryposneedlu.s3-website.eu-north-1.amazonaws.com",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(
          new Error("CORS policy does not allow access from this origin")
        );
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(fileUpload);

app.use("/api/users", usersRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/stuartRequests", stuartRequestRoutes);
app.use("/api/kot", kitchenOrderTicketRoutes);
app.use("/api/bot", barOrderTicketRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);


const MONGO_URI = process.env.MONGO_URI || "";
console.log("MONGO_URI:", MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

export default app;
