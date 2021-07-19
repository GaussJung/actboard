const express = require('express');
const app = express.Router();
const multer = require('multer');   // multer(파일 업로드) 사용.

const dbConnection = require('../database/databases'); // database연결 

// 파일 업로드 Storage
const uploadStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../examFile/')
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

// 메인화면
app.get('/list', (req, res) => {

    let selectSqlBody = "SELECT * FROM react_enrollment"; // 시험 목록 검색
    let selectSqlBody2 = "SELECT DISTINCT subject FROM react_enrollment"; // 등록된 시험중 과목만 중복제거 검색
    let selectSqlBody3 = "SELECT DISTINCT name FROM react_enrollment"; // 등록된 시험중 이름만 중복제거 검색

    // database query문 입력후 실행
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
                            // 검색한 시험목록, 과목, 이름의 데이터를 전송
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
app.post('/list', (req, res) => {

    let selectSqlBody;
    let paramsVal;

    console.log(req.query)

    let grade = req.query.grade;
    let subject = req.query.subject;
    let teacher = req.query.teacher;

    // 검색한 query데이터를 비교하여 query문을 지정하여 준다. 
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
    res.download("../examFile/"+req.params.path);
});

module.exports = app;