import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { usersRoutes } from "./Routes/user.route";
import { tableRoutes } from "./Routes/table.route";
import { categoryRoutes } from "./Routes/category.route";
import fileUpload from "./middlewares/file-handler";
import { itemRoutes } from "./Routes/item.route";
import { stuartRequestRoutes } from "./Routes/stuartRequest.route";
// import { usersRoutes } from "./routes/users.routes";
// import fileUpload from "./middlewares/file-handler";
// import { tasksRoutes } from "./routes/tasks.routes";
// import { categoriesRoutes } from "./routes/Needlu/categories.routes";
// import { productsRoutes } from "./routes/Needlu/products.routes";
// import { cashiersRoutes } from "./routes/Needlu/cashier.routes";
// import { bakeryOrders } from "./routes/Needlu/bakeryOrders.routes";
// import { loginRoutes } from "./routes/Needlu/login.routes";
// import { itemTypesRouter } from "./routes/Needlu/itemTypes.routes";
// import { stuartOrdersRoutes } from "./routes/Needlu/stuartOrders.routes";
// import { tablesRoutes } from "./routes/Needlu/tables.routes";
// import { kotRoutes } from "./routes/Needlu/kot.routes";

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
    credentials: true, // Needed for cookies or authentication headers
  })
);

app.use(fileUpload);

app.use("/api/users", usersRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/stuartRequests", stuartRequestRoutes);

const MONGO_URI = process.env.MONGO_URI || "";
console.log("MONGO_URI:", MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

export default app;
