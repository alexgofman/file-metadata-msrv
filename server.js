var express = require('express');
var multer = require('multer');
var upload = multer({ dest: "./uploads" });
var fs = require('fs');

var app = express();

app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/upload', upload.single('file'), function(req, res) {
  console.log("Uploaded " + req.file.filename + ".");
  res.render('index', { fileSize: req.file.size });
  fs.unlink('./uploads/' + req.file.filename, function(err) {
    if (err) throw err;
    console.log("Deleted " + req.file.filename + ".");
  });
});

app.listen(process.env.PORT, function() {
  console.log('Listening on port ' + process.env.PORT + "...");
});
