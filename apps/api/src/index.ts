import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import "./auth/passport.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) throw new Error("Unable to start server...");

  console.log(`Server listening on PORT ${PORT}...`);
});
