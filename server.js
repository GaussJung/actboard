'use strict'

// 익스프레스 패키지 v1.12
const express   = require('express');
 
const app   = express();
const prgVer = "1.0"; 
const PORT  = process.env.PORT = 5000;
 
var totalConnectCnt = 0;

// 라이브러리 유틸 
require('date-utils');                  // 일자/시간 유틸리티 

// ejs 파일을 오픈 
app.set('view engine', 'ejs');
app.use(express.static('public'));


// ps.1 시작 페이지
app.get('/', (req, res) => {

  // 접속시간 정보 설정 
  let todayDate = new Date(); 
  let currTime = todayDate.toFormat('YYYY-MM-DD HH24:MI:SS');
 
  // 접속횟수 추가 
  totalConnectCnt++; 

  // 렌더링 
  res.render("main", {
      title: "Node Home",
      ctime: currTime,
      totalcnt : totalConnectCnt
  });
 
  console.log("Connected! WebPage HOME Time=" + currTime + " / Count=" + totalConnectCnt); 

});

 
// F10 ============================ 앱리스너 ===============================
app.listen(PORT, () => {
  let msg; 
  msg = "ActBoard is running at: " + PORT + " / ver=" + prgVer; 
  //console.log('Node WebServer V1.877  is running at:', PORT);
  console.log(msg);  // 콘솔 
 
});
 
 