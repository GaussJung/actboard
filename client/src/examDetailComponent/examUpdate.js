import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EnrollmentContent from "./examUpdateCotent";
import jQuery from "jquery";
import "../enrollmentComponent/enrollment.css";
import { CheckData } from "./updateFunc";
import { CompleteLogin, GetExamData } from "../api";
window.$ = window.jQuery = jQuery;

export default function ExamUpdate() {
  let { paramsId } = useParams();

  const [data, setData] = useState({}); // 사용자가 입력한 데이터 오브젝트
  const [file, setFile] = useState(""); // 사용자가 올린 파일
  const [loading, setLoading] = useState(false);  // 시험 데이터 받아올동안 로딩
  const [loginStatus, setLoginStatus] = useState(false); // 사용자 로그인 여부 판단

  // 시험 정보 가져오기
  const GetDbData = async () => {
    const datas = await GetExamData(paramsId);
    const userData = await CompleteLogin();
   
    // 사용자가 로그인을 하지 않았을 경우 페이지 이동
    if (userData === "") {
      setLoginStatus(false);
      alert("로그인후 이용가능합니다.");
      document.location.href = "/login";
    } else {
      setLoginStatus(userData);
    }
    
    // 시험 데이터가 존재할때 로딩을 바꾸어 사용.
    if (datas.length === 1) {
        setData(datas[0]);
      setLoading(true);
    } else {
      alert("시험정보가 삭제되거나 없는 시험입니다.");
      document.location.href = "/";
    }
  };

  // 시험 데이터 서버 전송
  const SendData = (newData) => {

    // 데이터들이 조건식에 맞는지 체크후 전송
    if (CheckData(newData)) {
        
        console.log(loginStatus);

        const randomNum = Math.floor(Math.random() * 1999999999) + 10000000000; // 세션값 랜덤 생성

        window.sessionStorage.setItem("sessionid", randomNum);

        newData.userid = loginStatus.userid;

        let formData = new FormData();
        formData.append("jsonData", JSON.stringify(newData));
        formData.append("files", file);

        window.$.ajax({
          url: "/api/exam/examUpdate/"+paramsId,
          type: "POST",
          //async: true,
          //cache: false,
          contentType: false,
          processData: false,
          data: formData,
          success: function (exam) {
              alert("수정 완료");
                document.location.href = "/";
          },
        });
    }
  };

  useEffect(() => {
    GetDbData();
  }, []);

  return (
    <>
    {loading ? (
        <>
        {loginStatus ? (
        <div id="container">
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
          <EnrollmentContent
            data={data}
            setFile={setFile}
            SendData={SendData}
          />
        </div>
      ) : (
        <></>
      )}
        </>
    ) : 
    (
        <h1>Loading</h1>
    )
    }
      
    </>
  );
}
