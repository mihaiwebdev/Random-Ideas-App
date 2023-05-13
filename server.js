const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 8000;
const ideaRoutes = require('./routes/ideaRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
connectDB();

const app = express();

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Cors middleware
app.use(cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true
}))

app.get('/', (req, res) => {
    res.json('Welcome to random ideas server')
})

// Routes
app.use('/api/users', userRoutes);

app.use('/api/ideas', ideaRoutes);

app.listen(port, () => {
    console.log(`Listening on port :${port}`);
});