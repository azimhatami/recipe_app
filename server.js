const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();


const app = express();
const port = process.env.PORT || 5000;

// DB connection
connectDB();

app.use(cors());

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// Routes
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

