/*
    id : EUR01,
    name : ExamUserRouter,
    date : 2021-07-26
    version : 1.1v
*/

//----------------------------------------------------------------------------------------------------------------------------------------

const express = require('express'); // express 사용
const app = express.Router(); // express 라우터 사용

const dbConnection = require('../database/databases');  // database접속

// 사용자 목록을 가져온다.
app.post('/userList',(req, res) => {
    let selectSqlBody = "SELECT userno, name, createdate FROM react_user_list"; // 사용자 목록을 검색하여 사용자번호, 이름, 생성일자를 검색

    dbConnection.query(selectSqlBody,(err,userList) => {
        if(err){
            res.send(false);
        }else{
            res.send(userList);
        };
    });
});

// 아이디 중복체크
app.post('/getUserId',(req,res) => {

    let selectSqlbody = "SELECT userid FROM react_user_list WHERE userid=?"; // 아이디를 검색
    dbConnection.query(selectSqlbody, req.body.id,(err,data) => {
        if(err){
            res.send("DBE001 = " + err);
        }else{
            // 검색한 결과가 있을 경우 아이디 사용 불가능을 나타내준다.
            if(data.length !== 0){
                res.send(false);
            }else{
                res.send(true);
            };
        };
    });
});

// 신규 유저 등록
app.post('/newUser', (req,res) => {

    let data = req.body.data;

    const insertSqlbody = `INSERT INTO react_user_list VALUES(default,?,?,HEX(AES_ENCRYPT( ?,concat('soy', ?)))`+
                          `,?,now(),now(),now())`; // 사용자의 정보중 비밀번호를 암호화하여 db에 저장
    const paramsVal = [data.name, data.id, data.passwd, data.id, data.grade];

    dbConnection.query(insertSqlbody, paramsVal, (err, get) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send("");
        };
    });
});

// 로그인을 이뤄주는 경로
app.post('/loginprocess', async (req, res) => {
    console.log(req.body)
    const selectSqlbody = "SELECT * FROM react_user_list WHERE userid=? AND"+
                          " passwd = HEX(AES_ENCRYPT( ? , concat('soy',?)))"; // 아이디와 비밀번호를 조건으로 검색
    let paramsVal = [req.body.userid, req.body.userpw, req.body.userid];

    dbConnection.query(selectSqlbody, paramsVal, async (err, get) => {
        if (err) {
            res.status(500).send(false);
        } else {
            // 조회결과가 있을 경우 로그인 세션을 저장.
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
            };
        };
    });
});

// 로그인 세션 전달.
app.get('/completelogin',(req,res) => {
    res.send(req.session.user);
});

// 로그아웃을 이뤄주는 경로
app.get('/logoutprocess', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
        };
    });
    res.clearCookie('sid');
    res.send(true);
});

module.exports = app;