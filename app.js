var express = require('express')
  , app = express() 
  , cons = require('consolidate') 
  , MongoClient = require('mongodb').MongoClient 
  , routes = require('./routes'); 

MongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
     
    if(err) throw err;

    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

    app.use(express.cookieParser());

    app.use(express.bodyParser());

    routes(app, db);

    app.listen(3000);
    console.log('Express server listening on port 3000');
});
