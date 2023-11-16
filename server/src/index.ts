import express from "express";
import cors from "cors";

import noteRouter from "./routes/notes"

const app = express();

app.use(cors());
app.use(express.json());

app.use(noteRouter)

const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`server running on localhost ${port}`);
});
