// Depdendencies
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const passportConfig = require('./config/passport-config');
const cookieSession = require('cookie-session');
// Routes
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
// instantiate express and set port
const PORT = process.env.PORT || 3001;
const app = express();
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	cookieSession({
		maxAge: 60 * 60 * 1000,
		keys: [process.env.COOKIE_KEY]
	})
);
app.use(passport.initialize());
app.use(passport.session());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/presume', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
});
// Use html Routes
app.use('/', htmlRoutes);
// Use auth Routes
app.use('/auth', authRoutes);
// Use api Routes
app.use('/api', apiRoutes);
// Send every request to the React app
// Define any API routes before this runs
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});
app.listen(PORT, function () {
	console.log(`🌎 ==> API server now on port ${PORT}!`);
});
