// starts the Express server once the database connection has been established
import 'dotenv/config';
import express from 'express';
import db from './config/connection.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => res.json({ message: '🌍 Innovate Inc. Secure Web Portal API is running!'}));

app.use((req, res) => res.status(404).json({ message: 'Wrong route!' }));

db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

