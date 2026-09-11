const mongoose = require('mongoose');

let mongod = null;

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';
    
    // Set connection timeout to 3 seconds for fast fallback if local mongod is not running
    try {
      const conn = await mongoose.connect(connStr, {
        serverSelectionTimeoutMS: 3000
      });
      console.log(`[Database] Connected to MongoDB: ${conn.connection.host}`);
      return conn;
    } catch (err) {
      console.warn(`[Database] Could not connect to primary MongoDB at (${connStr}): ${err.message}`);
      console.log(`[Database] Spinning up MongoMemoryServer for zero-setup local execution...`);
      
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      
      const conn = await mongoose.connect(uri);
      console.log(`[Database] Successfully connected to In-Memory MongoDB at ${uri}`);
      return conn;
    }
  } catch (error) {
    console.error(`[Database Error] ${error.message}`);
    process.exit(1);
  }
};

const closeDB = async () => {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
};

module.exports = { connectDB, closeDB };
