const express = require('express')
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const passportSetup = require('./config/passport-setup')
const app = express()
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')


app.set('view engine', 'ejs')
app.use(express.static("views"));
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }))

app.use(cookieSession({
      maxAge: 24 * 60 * 60 * 100,
      keys: [keys.session.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb

mongoose.connect('mongodb://localhost:27017/passport', () => {
      console.log('data connect')
})

//set up routes
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
// cookie session

app.get('/', (req, res) => {
      res.render('home', { user: req.user })
})
app.listen(3000, () => {
      console.log("start Server")
})