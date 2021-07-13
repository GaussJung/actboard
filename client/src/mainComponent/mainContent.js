import axios from "axios";
import React from "react";
import download from "downloadjs";
import { Link } from "react-router-dom";

const MainContent = (props) => {
  // 로그인이 안되어있을경우 실행
  const AlertLogin = () => {
    alert("로그인후 이용 가능합니다.");
    document.location.href = "/login";
  };

  // 저장된 파일을 다운로드
  const FileDownload = () => {
    console.log(props.data.filepath);
    axios
      .get(`/${props.data.filepath}`, { responseType: "blob" })
      .then((res) => {
        download(res.data, props.data.filename, props.data.filetype);
      });
  };

  return (
    <>
      <div className="listContentArea">
        <div className="examContentArea">
          <div className="examContentTextArea">
            <h4 className="examContentId">{props.data.examid}</h4>
            <h4 className="examContentText">
              {props.data.name} - {props.data.grade}학년 - {props.data.subject}{" "}
              - {props.data.content}단원
              <br></br>
              <span className="examContent">{props.data.contentheader}</span>
            </h4>
          </div>
          <div className="examContentDownloadArea">
            {props.loginStatus ? (
              <>
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
