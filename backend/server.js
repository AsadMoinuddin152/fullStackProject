const dotenv = require("dotenv");
const app = require("./app");
const connectToMongoDb = require("./config/mongo");

dotenv.config();
if (process.env.NODE_ENV !== "test") {
  connectToMongoDb();
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
