import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import download from "downloadjs";
import { ExamDetailData, CompleteLogin } from "../api";
import "./detail.css";

export default function ExamDetail() {
  let { id } = useParams();

  const [examData, setExamData] = useState();
  const [loginStatus, setLoginStatus] = useState(); // 사용자가 로그인을 하였는지 확인
  const [loading, setLoading] = useState(false);

  const getExamData = async () => {
    const datas = await ExamDetailData(id);
    const userInfo = await CompleteLogin();
    if (userInfo === "") {
      setLoginStatus(false);
      alert("로그인후 이용가능합니다.");
      document.location.href="/login";
    } else {
      setLoginStatus(userInfo);
    };
    if (datas.length === 1) {
      setExamData(datas[0]);
      setLoading(true);
    } else {
      alert("시험정보가 삭제되거나 없는 시험입니다.");
      document.location.href = "/";
    }
  };

  // 저장된 파일을 다운로드
  const FileDownload = () => {
    axios
      .get(`/api/exam/${examData.filepath.replace("../", "")}`, {
        responseType: "blob",
      })
      .then((res) => {
        download(res.data, examData.filename, examData.filetype);
      })
      .catch((err) => {
        console.log(err);
        alert("파일이 존재 하지 않습니다.");
      });
  };

  useEffect(() => {
    getExamData();
  }, []);

  return (
        <>
        {loading ? (
        
        <div id="container">
          <div id="headerArea">
            <div id="headerContent">
              <div className="goListPageArea">
                <Link to="/">
                  <button className="goListPageBtn">목록 가기</button>
                </Link>
              </div>
              <h3 className="entrollmentContent">시험 상세 정보</h3>
              <hr></hr>
              <ul className="useGuide">
                <li>
                  시험내용의 수정을 원할시면 "시험 수정" 버튼을 눌러주세요.
                </li>
                <li>
                  시험내용의 삭제를 원하시면 "시험 삭제" 버튼을 눌러주세요.
                </li>
              </ul>
              <hr></hr>
            </div>
            <div id="headerBdId">
              <h4 className="entrollmentContent">
                글 번호 : 
                <span className="contentText">{examData.examid}</span>
              </h4>
            </div>
          </div>
          <div id="contentArea">
            <div className="entrollmentContent">
              신청자 : 
              <span className="contentText">{examData.name}</span>
            </div>

            <div className="entrollmentContent">
              문의 신청 날짜 : 
              <span className="contentText">{examData.examid}</span>
            </div>

            <div className="entrollmentContent">
              학년 : 
              <span className="contentText">{examData.date}</span>
            </div>

            <div className="entrollmentContent">
              시험 과목 : 
              <span className="contentText">{examData.subject}</span>
            </div>

            <div className="entrollmentContent">
              시험 단원 : 
              <span className="contentText"> {examData.content}</span>
            </div>

            <div className="entrollmentContent">
              단원 제목 : 
              <span className="contentText"> {examData.contentheader}</span>
            </div>

            <div className="entrollmentContent">
              시험 제목 : 
              <span className="contentText"> {examData.examheader}</span>
            </div>

            <div className="entrollmentContent">
              문제 개수 : 
              <span className="contentText">{ examData.examquestion}</span>
            </div>
            <div className="entrollmentContent">
            <p className="contentText" onClick={((e) => {
                FileDownload();
            })}  id="fileArea">{examData.filename}</p>
            </div>
          </div>
          {loginStatus.userid === examData.userid ? (
              <>
              {console.log(loginStatus)}
              <hr></hr>
          <div id="footerBtnArea">
            <div id="updateButtonArea">
              <button onclick="updateContent()" id="updateContentBtn">
                시험 수정
              </button>
            </div>
            <div id="deleteButtonArea">
              <button id="deleteBoardBtn" onclick="deleteBoard()">
                시험 삭제
              </button>
            </div>
          </div>
        </>
          ) : (<></>) }
         </div> 
      ) : (
        <>
          <h1>LOADING</h1>
        </>
      )}
      </>
  )
}
