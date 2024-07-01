// express 가져오기
const express = require('express');
const app = express();
const cors = require('cors')
const router = express.Router();

app.use(express.json());
require('dotenv').config();
const port = process.env.PORT;

// 모든 CORS 허용 -> 보안상 안좋대
app.use(cors());

app.use('/user', require('./Router/userRouter.js'));

app.get('/', (req, res) => {
  res.send('하이');
});


app.listen(port, () => { console.log('Server is running on port', port); });