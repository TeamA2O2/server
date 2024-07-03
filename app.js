// express 가져오기
const express = require('express');
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
//const api = require("./routers")
const app = express();
const cors = require('cors')


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000/",
      },
    ],
  },
  apis: ["./Router/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);


//const { swaggerUi, specs } = require("./swagger/swagger")

const router = express.Router();

app.use(express.json());
require('dotenv').config();
const port = process.env.PORT;

// 모든 CORS 허용 -> 보안상 안좋대
app.use(cors());
app.use("/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
app.use('/user', require('./Router/userRouter.js'));
app.use('/funding', require('./Router/fundingRouter.js'));



app.get('/', (req, res) => {
 	res.send('하이');
	res.send(port);
});


app.listen(port, () => { console.log('Server is running on port', port); });
//console.log('\x1b[3m%s');
