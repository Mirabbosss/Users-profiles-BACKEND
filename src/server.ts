import express, { Application, Router } from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || "8080";

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.CORS_ORIGIN as string,
      process.env.CORS_ORIGIN_URL as string,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
