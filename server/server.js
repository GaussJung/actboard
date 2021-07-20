/*
    품명 : ACTBOARD
    version : 1.1
*/

const express = require('express');
const app = express();
const cors = require('cors');   // cors(proxy 방지)사용

const redis = require("redis"); //resis 서버 사용
const session = require("express-session"); // 세션 사용

let RedisStore = require("connect-redis")(session); // 세션을 redis의 저장
let redisClient = redis.createClient();

// 로그인 세션 
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: "keyboard cat",
    resave: false,
    cookie: {
      maxAge: 24000 * 60 * 60, // 쿠키 유효기간 24시간
    },
  })
);

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const examRouter = require("./routes/exam"); // 사용자 질문,답변 페이지
const userRouter = require("./routes/user"); // 사용자 질문,답변 페이지

app.use("/api/exam", examRouter); // 시험 목록, 시험등록 등 라우터
app.use("/api/user", userRouter); // 사용자 로그인, 회원가입, 로그아웃, 목록 라우터

// ============================================== F30. API엔진 SWAGGER설정 ========================================== 
// 주의 : 아래 설정은 app listen이 있기 전에 진행! 

const swaggerUi = require('swagger-ui-express');           // SWAGGER 호출 
const swaggerJSDoc = require('swagger-jsdoc');

// import YAML from 'yamljs';                                 // json이 아닌 yaml을 통해서 설정이 진행되도록 함. 
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');      // json은 설정복잡
// const swaggerDocument = YAML.load('./swagger.yaml');    // yaml은 설정간단 (yamljs 임포트 필요)
 
// Swagger definition
const swaggerDefinition = {
  swagger:'2.0',
  info: {
    title: 'REST API for my App', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'This is the REST API for Member System', // short description of the app
    license: 
      {
        name : 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
  },
  host: 'utdev.soymlops.com:8000', // the host or url of the app
  basePath: '/api', // the basepath of your endpoint
  schemes:'http',   // SSL접속 아닌 기본 접속 
  consumes:'application/json',
  produces: 'application/json'
};

// API문서설정경로 
const swagOptions = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./api-set/*.yaml'],
};

// 초기화 swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swagOptions);

// use swagger-Ui-express for your app documentation endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 8000번 포트로 열어 준다.
const port = 8000;
app.listen(port,()=> console.log(`Thank you join ${port}!`));

