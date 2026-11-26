// starts the Express server once the database connection has been established
import 'dotenv/config';
import express from 'express';
import db from './config/connection.js';
import userRoutes from './routes/userRoutes.js';

// create the app and set the port
const app = express();
const PORT = process.env.PORT || 3000;

// middleware to parse JSON bodies
app.use(express.json());

// routes for user registration and login
app.use('/api/users', userRoutes);

// test route
app.get('/', (req, res) => res.json({ message: '🌍 Innovate Inc. Secure Web Portal API is running!'}));

// catch-all route for undefined endpoints
app.use((req, res) => res.status(404).json({ message: 'Wrong route!' }));

// start the server once the database connection is open
db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

