const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 4000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');		// to use hbs with express
app.use(express.static(__dirname + '/public'));	// to reach the html files inside the public folder
app.use((req, res, next) => {	// register a middleware
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	next();	// the application wont run untill next() is called
	console.log(log);
	fs.appendFileSync('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log.')
		}
	});
});

/*app.use((req, res, next) => {
	res.render('maintenance.hbs')
});*/

app.get('/', (req, res) => {
	// res.send('<h1>Hello Express</h1>');	// responding to the request by sending some data back
	/*res.send({
		name: 'Liam',
		likes: ['oranges', 'chicken']
	})*/
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMsg: 'Hello and welcome here',
		currentYear: new Date().getFullYear()
	});
});

app.get('/about', (req, res) => {
	// res.send('About Page'); 01
	res.render('about.hbs', {
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: '404 Page Not Found.'
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects'
	});
});

app.listen(port, () => {	// can take an optional second argument
	console.log(`Server is up in port ${port}`)
});