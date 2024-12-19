// config/connectDB.js
const mongoose = require('mongoose');

let dbInstance;

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URI, {
           
        });
        dbInstance = connection.connection.db;
        console.log('Connected to MongoDB');
        return dbInstance; // Return the MongoDB instance
    } catch (err) {
        console.error(err);
        process.exit(1); // Exit process with failure
    }
};

const getDBInstance = () => {
    if (!dbInstance) throw new Error('Database not initialized. Call connectDB first.');
    return dbInstance;
};

module.exports = { connectDB, getDBInstance };
