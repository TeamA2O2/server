// express 가져오기
const express = require('express');
const app = express();
var router = express.Router();

app.use(express.json());
require('dotenv').config();
const port = process.env.PORT;

var db = require('./Database/mysql.js')

app.get('/', (req, res) => {
  res.send('하이');
});

// app.get('/test', function(req, res, next) {
//   try {
//     db.query('select * from users', function(err, results, fields) {
//       if (err) throw err;
//       console.log(results);
//       return res.status(200).json(results);
//     });
//   } catch(err) {
//     console.log(err);
//   }
// });

app.use('/user', require('./Router/userRouter.js'));

app.listen(port, () => { console.log('Server is running on port', port); });