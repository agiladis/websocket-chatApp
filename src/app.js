require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const authRouter = require('./routes/auth.route');

const PORT = process.env.PORT;

// to know how body request type
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logger
app.use(logger);

// API route
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`sentry project listening at http://localhost:${PORT}`);
});
