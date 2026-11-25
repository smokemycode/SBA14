// connects the app to MongoDB Atlas using the connection string stored in the .env file
import "dotenv/config";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('error', (err) => console.error('❌ MongoDB error:', err.message));

export default mongoose.connection;
