import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import download from "downloadjs";

const MainContent = (props) => {
  // 로그인이 안되어있을경우 실행
  const AlertLogin = () => {
    alert("로그인후 이용 가능합니다.");
    document.location.href = "/login";
  };

  // 저장된 파일을 다운로드
  const FileDownload = () => {
    axios
      .get(`/api/exam/${props.data.filepath.replace("../", "")}`, {
        responseType: "blob",
      })
      .then((res) => {
        download(res.data, props.data.filename, props.data.filetype);
      })
      .catch((err) => {
        console.log(err);
        alert("파일이 존재 하지 않습니다.");
      });
  };
  return (
    <>
      <div className="listContentArea">
        <div className="examContentArea">
          <div className="examContentTextArea">
            <h4 className="examContentId">{props.examListNo + 1}</h4>
            <h4 className="examContentText">
              {props.data.name} - {props.data.grade}학년 - {props.data.subject}-{" "}
              {props.data.content}단원
              <br></br>
              <span className="examContent">{props.data.contentheader}</span>
            </h4>
          </div>
          <div className="examContentDownloadArea">
            {props.loginStatus ? (
              <>
              <Link to={`/examDetail/${props.data.examid}`}>
                <button className="examContentDownload">상세 정보</button>
                </Link>
                <button
                  className="examContentDownload"
                  onClick={(e) => FileDownload()}
                >
                  다운로드
                </button>
              </>
            ) : (
              <>
                <button
                  className="examDetail"
                  onClick={(e) => {
                    AlertLogin();
                  }}
                >
                  상세보기
                </button>
                <button
                  className="examContentDownload"
                  onClick={(e) => {
                    AlertLogin();
                  }}
                >
                  다운로드
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
