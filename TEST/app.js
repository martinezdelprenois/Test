var multer = require('multer');
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 7000;
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;
var Grid = require('gridfs-stream');

var Busboy = require('busboy');
var mongo = require('mongodb');
Grid.mongo = mongoose.mongo; // get to mongo
var gfs; // var gfs
var fs = require('fs');
var db = 'mongodb://localhost:27017/ard';


var cors = require('cors');
var methodOverride = require('method-override');
var morgan = require('morgan');

var Person = require('./personModel');
var Story = require('./storyModel');

mongoose.Promise = global.Promise; 
mongoose.connect(db, { useMongoClient: true });

// dealing with the connection just right below 
var dbs = mongoose.connection;
 dbs.on('error', console.error.bind(console, 'connection error:'));
 dbs.once('open', function(){
	gfs = Grid(dbs.db); // just added this

    if(gfs){
        console.log('yahah');

    }
 	console.log('successfully connected');
 });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(methodOverride());
app.use(cors());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Expose-Headers', 'X-Requested-With,content-type, Authorization, access_token');
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST, GET');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

   next();
})

app.post('/api/pers', (req,res)=>{

	var me = new Person();

	me.name = req.body.name;
	me.age = req.body.age;
	me.stories = req.body.story;

	me.save((err,mes)=>{
		if(err){
			console.log(err);
		}

		res.json(mes);
	});


});

app.post('/api/story', (req,res)=>{

	var me = new Story();

	me.author = req.body.author;
	me.title = req.body.title;
	me.fans = req.body.fans;

	me.save((err,mes)=>{
		if(err){
			console.log(err);
		}

		res.json(mes);
	});

});



app.get('/api/story', (req,res)=>{

	Story.
	find().
	populate('author').
	exec(function (err, story) {
	  if (err) return handleError(err);

	  else{
		res.json(story);
		console.log('The author is %s', story);

	  }
	
	  // prints "The author is Ian Fleming"
	});



});

//APP LISTENING TO PORT
app.listen(port,function(){
	console.log('app listening on port' + port);
});