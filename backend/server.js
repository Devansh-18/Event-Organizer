const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

const requirementRoutes = require('./routes/requirementRoutes');

app.use(cors({
  origin: [
    process.env.FRONTEND_URL_PROD,
    process.env.FRONTEND_URL,
  ]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/requirements', requirementRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
