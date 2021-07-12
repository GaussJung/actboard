const express = require('express');
const app = express('');
const session = require('express-session'); //session(세션) 사용
const multer = require('multer');   // multer(파일 업로드) 사용.
const cors = require('cors');   // cors(proxy 방지)사용

const mysql = require('mysql'); // mysql사용
//db정보
const dbConnection = mysql.createPool(
    {
    host: '15.164.154.160',
    user: 'appdev',
    password: 'appdev12!',
    database: 'appsvcdb',
    dateStrings:'date'
    }
); 

app.use(cors());

// 파일 업로드 Storage
const uploadStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/home/kyh/reactBoard/board/examFile")
    },
    filename: (req, file, cb) => {
        let jsonData = JSON.parse(req.body.jsonData);
        cb(null, `${jsonData.grade}학년_${jsonData.subject}_${jsonData.content}단원_${file.originalname}`);

        //파일이름을 주문신청자 이름 + 세션Id.tmp로 저장하겠다는의미(중복방지)
    }
});

// 파일 업로드
const upload = multer({
    storage: uploadStorage
}).any();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// 로그인 세션 설정
app.use(session({
    key: 'sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
    }
}));

// 메인화면
app.get('/api/list', (req, res) => {

    let selectSqlBody = "SELECT * FROM react_enrollment";

    let selectSqlBody2 = "SELECT DISTINCT subject FROM react_enrollment";
    let selectSqlBody3 = "SELECT DISTINCT name FROM react_enrollment";

    dbConnection.query(selectSqlBody, (err, examListData) => {
        if (err) {
            console.log(err);
            res.status(500).send()
        } else {
            dbConnection.query(selectSqlBody2, (err2, subjectData) => {
                if (err2) {
                    console.log(err2);
                } else {
                    dbConnection.query(selectSqlBody3, (err2, teacherData) => {
                        if (err2) {
                            console.log(err2);
                        } else {
                            // console.log(req.params.page, examListData.length-1,);
                            res.send({
                                examListData, subjectData, teacherData
                            })
                        };
                    });
                };
            });
        };
    });
});

// 메인화면(검색)
app.post('/api/list', (req, res) => {

    let selectSqlBody;
    let paramsVal;

    console.log(req.query)

    let grade = req.query.grade;
    let subject = req.query.subject;
    let teacher = req.query.teacher;

    if (grade === undefined || grade === '' || grade === null) {
        if (subject === undefined || subject === '' || subject === null) {
            if (teacher === undefined || teacher === '' || teacher === null) {
                selectSqlBody = "SELECT * FROM react_enrollment";
                paramsVal = [];
            } else {
                selectSqlBody = "SELECT * FROM react_enrollment WHERE name=?";
                paramsVal = [teacher];
            }
        } else {
            if (teacher === undefined || teacher === '' || teacher === null) {
                selectSqlBody = "SELECT * FROM react_enrollment WHERE subject=?";
                paramsVal = [subject];
            } else {
                selectSqlBody = "SELECT * FROM react_enrollment WHERE name=? AND subject=?";
                paramsVal = [teacher, subject];
            };
        };
    } else {
        if (subject === undefined || subject === '' || subject === null) {
            if (teacher === undefined || teacher === '' || teacher === null) {
                selectSqlBody = "SELECT * FROM react_enrollment WHERE grade=?";
                paramsVal = [grade];
            } else {
                selectSqlBody = "SELECT * FROM react_enrollment WHERE name=? AND grade=?";
                paramsVal = [teacher, grade];
            }
        } else {
            if (teacher === undefined || teacher === '' || teacher === null) {
                selectSqlBody = "SELECT * FROM react_enrollment WHERE subject=? AND grade=?";
                paramsVal = [subject, grade];
            } else {
                selectSqlBody = "SELECT * FROM react_enrollment WHERE name=? AND subject=? AND grade=?";
                paramsVal = [teacher, subject, grade];
            };
        };
    };

    let selectSqlBody2 = "SELECT DISTINCT subject FROM react_enrollment";   // 과목 검색후 중복제거
    let selectSqlBody3 = "SELECT DISTINCT name FROM react_enrollment";  // 선생님 검색후 중복제거

    dbConnection.query(selectSqlBody, paramsVal, (err, examListData) => {
        if (err) {
            console.log(err);
            res.status(500).send()
        } else {
            dbConnection.query(selectSqlBody2, (err2, subjectData) => {
                if (err2) {
                    console.log(err2);
                } else {
                    dbConnection.query(selectSqlBody3, (err2, teacherData) => {
                        if (err2) {
                            console.log(err2);
                        } else {
                            // console.log(req.params.page, examListData.length-1,);
                            res.send({
                                examListData, subjectData, teacherData
                            })
                        };
                    });
                };
            });
        };
    });
});

// 사용자 시험 등록 
app.post('/enrollment',upload, (req,res) =>{

    const jsonData = JSON.parse(req.body.jsonData)
    console.log(JSON.parse(req.body.jsonData));
    console.log((req.files[0]));

    const insertSqlbody = "INSERT INTO react_enrollment VALUES(default,?,?,?,?,?,?,?,?,?,?,now(),?, ?, ?)"; // 작성한 시험등록 데이터를 db에 저장
    const selectSqlbody = "SELECT examid FROM react_enrollment WHERE sessionid = ?"; // 저장한 데이터를 검색
    let paramsVal = [jsonData.teacher, jsonData.grade, jsonData.subject, jsonData.content, jsonData.contentHeader
                    , jsonData.examHeader, jsonData.testQuestion, req.files[0].originalname, req.files[0].mimetype, 
                    req.files[0].path, jsonData.sessionid, 0, jsonData.userid];

    dbConnection.query(insertSqlbody, paramsVal, (error, get) => {
        // db쿼리에 에러가 발생시 에러 코드 전송
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            dbConnection.query(selectSqlbody, jsonData.sessionid, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send();
                } else {
                    console.log(result);

                    res.json(result[0].examid);
                };
            });
        };
    });
});

// 저장된 파일 다운로드
app.get('/examFile/:path',(req,res) => {
    console.log(req.params.path);
    res.download("../examFile/"+req.params.path);
})

// 아이디 중복체크
app.post('/getUserId',(req,res) => {

    let selectSqlbody = "SELECT userid FROM user_list WHERE userid=?";
    dbConnection.query(selectSqlbody, req.body.id,(err,data) => {
        if(err){
            res.send(err);
        }else{
            if(data.length !== 0){
                res.send(false);
            }else{
                res.send(true);
            };
        };
    });
});

app.post('/newUser', (req,res) => {

    let data = req.body.data;

    const insertSqlbody = `INSERT INTO user_list VALUES(default,?,?,HEX(AES_ENCRYPT( ?,concat('soy', ?))),?,now(),now(),now())`; // 사용자의 정보중 비밀번호를 암호화하여 db에 저장
    const paramsVal = [data.name, data.id, data.passwd, data.id, data.grade];

    dbConnection.query(insertSqlbody, paramsVal, (err, get) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send("");
        }
    });
})



// 로그인을 이뤄주는 경로
app.post('/loginprocess', async (req, res) => {
    const selectSqlbody = "SELECT * FROM user_list WHERE userid=? AND passwd = HEX(AES_ENCRYPT( ? , concat('soy',?)))";
    let paramsVal = [req.body.userid, req.body.userpw, req.body.userid];

    dbConnection.query(selectSqlbody, paramsVal, async (err, get) => {
        if (err) {
            console.log(err);
            res.status(500).send(false);
        } else {
            if (get.length !== 0) {
                req.session.user = await {
                    userid: get [0].userno,
                    id: get [0].userid,
                    name: get [0].name,
                    grade: get [0].grade
                };
                res.send(true);
            } else {
                res.send(false);
            }
        };
    });
});

// 로그인 세션 계속 전달.
app.get('/completelogin',(req,res) => {
    res.send(req.session.user)
})

// 로그아웃을 이뤄주는 경로
app.get('/logoutprocess', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
        }
    });
    res.clearCookie('sid');
    res.send(true);
});

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
  //host: 'myapp.nuriblock.com:80', // the host or url of the app
  host: 'localhost:8000', // the host or url of the app
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
  apis: ['../api-set/*.yaml'],
};

// 초기화 swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swagOptions);

// use swagger-Ui-express for your app documentation endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const port = 8000;
app.listen(port,()=> console.log(`Thank you join ${port}!`));

