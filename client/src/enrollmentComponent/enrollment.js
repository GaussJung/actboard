import React, { useState,useEffect } from "react";
import EnrollmentContent from "./enrollmentContent";
import jQuery from "jquery";
import "./enrollment.css";
import {CheckData} from "./enrollmentFunc";
import { CompleteLogin } from '../api'
window.$ = window.jQuery = jQuery;

const Enrollment = () => {

  const [data, setData] = useState({}); // 사용자가 입력한 데이터 오브젝트
  const [file, setFile] = useState(""); // 사용자가 올린 파일
  const [userInfo, setUserInfo] = useState(); // 사용자의 정보
  const [loginStatus,setLoginStatus] = useState(false); // 사용자 로그인 여부 판단

  // 사용자가 입력한 데이터 저장
  const GetValue = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  // 사용자가 로그인 하였는지 확인
  const GetLoginUser = async () =>{
      const userData = await CompleteLogin();
      setUserInfo(userData);
      if(userData === ''){
        setLoginStatus(false);
        alert("로그인후 이용 부탁드립니다.");
        document.location.href = "/login";
      }else{
        setLoginStatus(true);
      };
  };

  // 시험 데이터 서버 전송
  const SendData = () => {
    if (CheckData(data)) {
      if (file === undefined || file === '' || file === null) {
        alert("시험지 파일을 올려주세요.");
      } else {
        
        const randomNum = Math.floor(Math.random() * 1999999999) + 10000000000; // 세션값 랜덤 생성

        window.sessionStorage.setItem("sessionid", randomNum);

        data.sessionid = window.sessionStorage.getItem("sessionid");
        data.userid = userInfo.userid;

        let formData = new FormData();
        formData.append("jsonData", JSON.stringify(data));
        formData.append("files", file);

        window.$.ajax({
          url: "/api/exam/enrollment",
          type: "POST",
          //async: true,
          //cache: false,
          contentType: false,
          processData: false,
          data: formData,
          success: function (examid) {
            localStorage.setItem("enrollment", JSON.stringify(data));
            window.sessionStorage.clear();
            document.location.href = '/';
          },
        });
      };
    };
  };

  useEffect(() => {
      GetLoginUser();
  },[]);

  return (
      <>
      {loginStatus ? (<div id="container">
      <div className={"containerHeaderArea"}>
        <h3 className={"containerHeaderText"}>초등 문제은행 등록</h3>
        <button
          className={"containerHeaderBtn"}
          onClick={(e) => (document.location.href = "/")}
        >
          시험 목록
        </button>
      </div>
      <hr></hr>
      <EnrollmentContent GetValue={GetValue} setFile={setFile} SendData={SendData}/>
    </div>) : (<h1>loading</h1>)}
    </>
  );
};

export default Enrollment;
