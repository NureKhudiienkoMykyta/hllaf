import "dotenv/config";
import express from "express";
import cors from "cors";

import routes from "./routes/index.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is starting: http://localhost:${PORT}`);
});
