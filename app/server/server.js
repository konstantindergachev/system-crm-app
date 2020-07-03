const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const favicon = require('serve-favicon');
const users = require('./routes/api/users-router');
const orders = require('./routes/api/orders-router');
const categories = require('./routes/api/categories-router');
const positions = require('./routes/api/positions-router');
const analytics = require('./routes/api/analytics-router');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//db Config
const db = require('../../config/keys').mongoURI;
//connect to MongoDB
mongoose
  .set('useFindAndModify', false)
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`MongoDB Connected`))
  .catch((err) => console.log(`DB Connection error: `, err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('../../config/passport')(passport);

app.use('/api/users', users);
app.use('/api/orders', orders);
app.use('/api/categories', categories);
app.use('/api/positions', positions);
app.use('/api/analytics', analytics);

//server static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(favicon('app/client/build/favicon.ico'));
  app.use(express.static('app/client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'app/client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
