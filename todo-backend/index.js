const app = require('./app.js');

// Check api call limit
const apiCallLimitPerMinute = require('./middlewares/rate-limiter.js');
// Apply the rate limiting middleware to all requests
app.use(apiCallLimitPerMinute);

// Check database working or not
const {
  connectRdbmsDB,
  sequelize,
} = require('./middlewares/rdbms-database.js');

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  try {
    await connectRdbmsDB();
    await sequelize.sync({ force: false, alter: true });
  } catch (error) {
    console.log('error ', error.message);
  }
  console.log(`Server Started at ${port}`);
});
