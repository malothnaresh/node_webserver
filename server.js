const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerHelper('fullYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (message) => {
  return message.toUpperCase();
});

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use( (req, res, next) => {
  const now = new Date();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log("Unable to append to server.log");
  });
  next();
});

// app.use( (req, res, next) => {
//   res.render('maintainance.hbs');
// });
app.use(express.static(__dirname + '/public'));

const welcomeMessage = "Welcome to my website";

app.get('/home', (req, res) => {
  res.render('home.hbs', {
    title: 'Home Page',
    welcomeMessage: welcomeMessage
  })

});

app.get('/', (req, res) => {
  res.render('landing.hbs', {
    title: 'Landing Page',
    contents : 'Welcome to Maloth Naresh website. You\'re now at Landing area.'    
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Page',
    welcomeMessage: welcomeMessage
  });
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});