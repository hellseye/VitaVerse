import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    
    console.log('Connecting to MongoDB Atlas...');
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    });
    
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.error(`MongoDB Connection Warning: ${error.message}`);
    console.log('Server running in local JSON fallback mode.');
  }
};

const getDbStatus = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

export { connectDB, getDbStatus };
