const express = require('express');
const connectDB = require('./config/db'); // Import the DB connection
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./config/hungrx-ffe5b-firebase-adminsdk-kd7ww-8eed40dfff.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

console.log('Initialized Firebase Admin SDK for project:', admin.app().options.projectId);
   console.log('Project ID:', serviceAccount.project_id);
   console.log('Client Email:', serviceAccount.client_email);
console.log(serviceAccount,"//////////////////");  // This will help verify the JSON is correctly loaded

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
// app.use(cors()); 
app.use(cors({
  origin: '*', // Replace with your Flutter app's domain in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/users', userRoutes);

// Start server
const PORT = process.env.PORT || 3000; // Default to port 3000 if process.env.PORT is not set
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

