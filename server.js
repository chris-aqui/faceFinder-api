const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');

const app = express();

// temp mock data
const database = {
	users: [
		{
			id: '123',
			name: 'Chris',
			email: 'chris@test.com',
			password: 'cookies',
			entries: 0,
			joined: new Date(),
		},
		{
			id: '124',
			name: 'Apollo',
			email: 'apollo@test.com',
			password: 'treats',
			entries: 0,
			joined: new Date(),
		},
	],
};

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send(database.users);
});

app.post('/signin', (req, res) => {
	if (
		req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password
	) {
		res.json('success');
	} else {
		res.status(400).json('error login');
	}
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

	database.users.push({
		id: '125',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date(),
	});
	res.json(database.users[database.users.length - 1]); // in postman display tge last user
});

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	});
	if (!found) {
		res.status(400).json('Not found');
	}
});

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	});
	if (!found) {
		res.status(400).json('Not found');
	}
});


app.listen(3000, () => {
	console.log('App is running on port 3000');
});
