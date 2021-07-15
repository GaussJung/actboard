const express = require('express');
const app = express.Router();

const dbConnection = require('../database/databases');

//
app.get('/userList',(req, res) => {
    let selectSqlBody = "SELECT userno, name, createdate FROM react_user_list";

    dbConnection.query(selectSqlBody,(err,userList) => {
        if(err){
            res.send(false)
        }else{
            res.send(userList);
        }
    })
})

// 아이디 중복체크
app.post('/getUserId',(req,res) => {

    let selectSqlbody = "SELECT userid FROM react_user_list WHERE userid=?";
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

    const insertSqlbody = `INSERT INTO react_user_list VALUES(default,?,?,HEX(AES_ENCRYPT( ?,concat('soy', ?))),?,now(),now(),now())`; // 사용자의 정보중 비밀번호를 암호화하여 db에 저장
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
    console.log(req.body)
    const selectSqlbody = "SELECT * FROM react_user_list WHERE userid=? AND passwd = HEX(AES_ENCRYPT( ? , concat('soy',?)))";
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

module.exports = app;