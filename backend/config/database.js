const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('\n⚠️  MongoDB is not running or connection string is incorrect');
    console.error('Options:');
    console.error('1. Start MongoDB locally: https://www.mongodb.com/docs/manual/installation/');
    console.error('2. Use MongoDB Atlas (free cloud): https://www.mongodb.com/cloud/atlas/register');
    console.error('3. Update MONGODB_URI in backend/.env file\n');
    process.exit(1);
  }
};

module.exports = connectDB;
