const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Use the public folder for static files
app.use(express.static(path.join(__dirname, 'public')));


//Set port to env.Port or default to 8080
app.set('port', process.env.PORT || 3001);
//Listen to port for connections
app.listen(app.get('port'), function() {
  console.log(`👩‍💻  App listening at port ${app.get('port')} ‍💻`);
});
