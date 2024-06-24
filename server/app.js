// express 가져오기
const express = require('express');
const app = express();
var router = express.Router();
const port = 8000; // port number - ncp에서 열었던 포트 번호 

require('dotenv').config();
console.log(process.env.DB_HOST)

var db = require('./lib/db.js')

app.get('/', (req, res) => {
  res.send('하이');
});

app.get('/user', function(req, res, next) {
  db.query('select * from user', function(err, results, fields) {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});

app.listen(port, () => {
  console.log('8000!');
});