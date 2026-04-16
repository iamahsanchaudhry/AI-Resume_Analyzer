import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import app from "./App.js";
const PORT = process.env.PORT || 5000;
console.log(process.env.PORT +"PORT");
connectDB();;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
