const express = require('express');
const passport = require('passport');
const path = require('path');
const proxy = require('http-proxy-middleware');
const auth = require('./auth');
// const partials = require('express-partials');


// Create a new Express application.
const app = express();
app.set('port', process.env.PORT || 3001);

// Configure view engine to render EJS templates.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(partials()); // Support layouts

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('tiny'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport
app.use(passport.initialize());

// Store authentication state, if any, in the session
app.use(passport.session());

// Used when we create a client/build for production
app.use('/static', express.static(path.join(__dirname, 'client', 'build', 'static')));

//
// This server
//

app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/profile', auth.ensureLoggedIn, (req, res) => {
  res.render('profile', { user: req.user });
});

app.get('/api/user', auth.ensureLoggedIn, (req, res) => {
  res.json({ user: req.user });
});

//
// create-react-app development server (or built assets)
//

if (process.env.NODE_ENV !== 'production') {
  // We start a proxy to the create-react-app dev server
  const apiProxy = proxy('/', { target: 'http://localhost:3000', ws: true });
  app.use(apiProxy);
} else {
  // When in production
  // All url paths go to the bundled index.html
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// Handle errors
// app.use((err, req, res, next) => {
//   if (res.headersSent) {
//     return next(err);
//   }
//   console.log(err);
//   return res.status(err.status || 500).send('500 Server Error');
// });

// Start server
app.listen(app.get('port'), () => {
  console.log('App listening on port', app.get('port'));
});
