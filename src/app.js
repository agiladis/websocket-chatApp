require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const authRouter = require('./routes/auth.route');

const PORT = process.env.PORT;
const SENTRY_DSN = process.env.SENTRY_DSN;

// to know how body request type
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logger
app.use(logger);

// sentry
Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
});

// API route
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`sentry project listening at http://localhost:${PORT}`);
});
