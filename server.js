
/*
1. Hello World program.

var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World!');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

*/

/*
Let us extend our Hello World program to handle more types of HTTP requests

var express = require('express');
var app = express();

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.send('Hello GET');
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
    console.log("Got a POST request for the homepage");
    res.send('Hello POST');
 })
 
 // This responds a DELETE request for the /del_user page.
 app.delete('/del_user', function (req, res) {
    console.log("Got a DELETE request for /del_user");
    res.send('Hello DELETE');
 })
 
 // This responds a GET request for the /list_user page.extend our Hello World program to handle more types of HTTP requests.
 app.get('/list_user', function (req, res) {
    console.log("Got a GET request for /list_user");
    res.send('Page Listing');
 })

 app.get('/ab*cd', function(req, res) {   
    console.log("Got a GET request for /ab*cd");
    res.send('Page Pattern Match');
 })

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })

 */
/*
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

//http://127.0.0.1:8081/images/Lays-Logo.png

*/

/*
var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/process_get', function (req, res) {
    // Prepare output in JSON format
    response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
 })

 var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

http://127.0.0.1:8081/index.html
*/
/*
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
*/

var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(multer({ dest: '/tmp/'}));
var upload = multer({dest:'./tmp'});
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/file_upload', function (req, res) {
   console.log(req.files.file.name);
   console.log(req.files.file.path);
   console.log(req.files.file.type);
   var file = __dirname + "/" + req.files.file.name;
   
   fs.readFile( req.files.file.path, function (err, data) {
      fs.writeFile(file, data, function (err) {
         if( err ) {
            console.log( err );
            } else {
               response = {
                  message:'File uploaded successfully',
                  filename:req.files.file.name
               };
            }
         
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})