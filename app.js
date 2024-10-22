// express 가져오기
const express = require('express');
const app = express();
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
const cors = require('cors');
const path = require('path');
const multerMiddleware = require('./multer/multer.js');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "https://ao-rztme.run.goorm.site/",
      },
    ],
  },
  apis: ["./Router/*.js"],
};



//const { swaggerUi, specs } = require("./swagger/swagger")

const router = express.Router();

app.use(express.json());
app.use(multerMiddleware); 
app.use('/images', express.static(path.join(__dirname, 'images')));
require('dotenv').config();
const port = process.env.PORT;

// 모든 CORS 허용 -> 보안상 안좋대
app.use(cors());
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use('/user', require('./Router/userRouter.js'));
app.use('/funding', require('./Router/fundingRouter.js'));


app.get('/', (req, res) => {
 	res.send('하이');
});


app.listen(port, () => { console.log('Server is running on port', port); });
