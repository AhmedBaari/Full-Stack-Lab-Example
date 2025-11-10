const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const MONGODB_URI =
  "mongodb://localhost:27017/wastemgmt"; // Replace with your MongoDB connection string

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI);

const recordSchema = new mongoose.Schema({
  zoneName: String,
  collectionDate: Date,
  vehicleID: String,
  wasteQuantity: Number,
});

const Record = mongoose.model("Record", recordSchema);

app.post("/api/records", async (req, res) => {
  const record = new Record(req.body);
  await record.save();
  res.json(record);
});

app.get("/api/records", async (req, res) => {
  const records = await Record.find();
  res.json(records);
});

app.put("/api/records/:id", async (req, res) => {
  const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(record);
});

app.delete("/api/records/:id", async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
