const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'Sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
		{
			id: '987',
			has: '',
			email: 'john@gmail.com'
		}
	]
}

app.get('/', (req,res) => {
	res.send(database.users);
})

app.post('/signin', (req,res) => {
	bcrypt.compare("apples", '$2a$10$eT0zhQo4WAczoK2ti0fR5e9VTC9MQ9kKOznHfw7r9N95Tjk4kp/8q', function(err, res) {
    // res == true
    console.log('first guess',res)
	});
	bcrypt.compare("veggies", '$2a$10$eT0zhQo4WAczoK2ti0fR5e9VTC9MQ9kKOznHfw7r9N95Tjk4kp/8q', function(err, res) {
	    // res = false
	    console.log('second guess', res)
    });
	if(req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} else {
		res.status(400).json('Error Logging in')
	}
})

app.post('/register', (req,res) => {
	const { name, email, password } = req.body;
	database.users.push({
		id: '125',
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req,res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach( user => {
		if(user.id === id) {
			found = true;
			return res.json(user);
		}
	})
	if(!found) {
		res.status(400).json('Not Found')
	}
})



// // Load hash from your password DB.


app.put('/image', (req,res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach( user => {
		if(user.id === id) {
			found = true;
			user.entries ++;
			return res.json(user.entries);
		}
	})
	if(!found) {
		res.status(400).json('Not Found')
	}
})

app.listen(3001, () => {
	console.log('App is running on port 3001')
})


/*  Planning API - figuring out endpoints
/ --> res = this is working // root route
/ signin --> POST  success/fail
/register --> POST = new user
/profile/:userId --> GET = user
/image --> PUT --> user
*/