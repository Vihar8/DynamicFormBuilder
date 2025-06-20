require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const apiRouter = require("./src/routes/api.routes");

// Use cors middleware globally
app.use(cors({
  origin: "https://dynamicformsbuilder.vercel.app",
  methods: ["GET", "POST"],
  credentials: true,
}));


app.use(express.json());
app.use('/api/', apiRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
