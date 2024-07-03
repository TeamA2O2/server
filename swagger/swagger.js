const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")
const port = process.env.PORT;

const options = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "선물 펀딩 사이트",
      description:
        "프로젝트 설명 Node.js Swaager swagger-jsdoc 방식 RestFul API 클라이언트 UI",
    },
    host: 'https://ao-rztme.run.goorm.site:8000',
    basePath: '/'
  },
  apis: ["./Router/*.js", "./swagger/*"], //Swagger 파일 연동
};

const specs = swaggereJsdoc(options);

module.exports = { swaggerUi, specs };