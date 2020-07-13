const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
	res.send("it works");
})

app.post('/signin', signin.handleSignin(db,bcrypt))
//advanced functions
//another way to clean up a bit
app.post('/register', (req, res) => { 
	register.handleRegister(req, res, db, bcrypt ) 
}) //dependency injection

app.get('/profile/:id', (req,res)=> {
	profile.handleProfileGet(req, res, db)
})

app.put('/image', (req,res) => {
	image.handleImage(req, res, db)
})

app.post('/imageurl', (req,res) => { image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3001, () => {
	console.log(`App is running on port ${process.env.PORT}')
})


/*  Planning API - figuring out endpoints
/ --> res = this is working // root route
/ signin --> POST  success/fail
/register --> POST = new user
/profile/:userId --> GET = user
/image --> PUT --> user
*/