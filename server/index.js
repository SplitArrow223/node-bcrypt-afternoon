require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController');
const treasureCtrl = require('./controllers/treasureController')
const auth = require('./middleware/authMiddleware')
const app = express();
app.use(express.json());

const {PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
});

app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    })
  );

  app.post('/auth/register', authCtrl.register)
  app.post('/auth/login', authCtrl.login)
  app.get('/auth/logout', authCtrl.logout)

  app.get('/api/dragon/treasure', treasureCtrl.dragonTreasure)
  app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)
  app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure)
  app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure)

app.listen(PORT, () => { console.log('listen linda port:', PORT)})