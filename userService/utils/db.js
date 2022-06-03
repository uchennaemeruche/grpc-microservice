require("dotenv").config();
const { MongoClient } = require("mongodb");

const DBClient = new MongoClient(process.env.DB_URI, {
  useUnifiedTopology: true,
});

async function connectDatabase() {
  try {
    await DBClient.connect();
    const db = await DBClient.db(process.env.DB_NAME);
    db.command({ ping: 1 });

    await db.collection("users").createIndex({ email: 1 });
    return db;
  } catch (error) {
    console.log("Database Connection Err:", error);
  }
}

module.exports = connectDatabase;
