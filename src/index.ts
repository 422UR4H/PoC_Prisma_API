import express, { json } from "express";
import "express-async-errors";
import errorHandler from "@/middlewares/errorHandler";
import router from "@/routers/index.routes";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app
    .use(json())
    .use(router)
    .use(errorHandler)
    .listen(port, () => console.log(`Server is running on port ${port}`));