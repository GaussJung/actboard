import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const MainHeader = (loginInfo) => {

  // 로그인이 필요한 경우 실행
  const AlertLogin = () => {
    alert("로그인후 이용 가능합니다.");
    document.location.href = "/login";
  };

  // 로그아웃
  const Logout = () => {
      let logounCheck = window.confirm("로그아웃 하시겠습니까?");
    if (logounCheck) {
      axios.get("/logoutprocess").then((res) => {
        alert("로그아웃 완료.");
        document.location.reload();
      });
    }
  };

  return (
    <>
      {loginInfo.loginInfo === false ? (
        <>
          <div className="loginBtnArea">
            <Link to="/login">
              <button className="loginBtn">로그인</button>
            </Link>
            <span></span>
          </div>
          <div className="enrollmentBtnArea">
            <button
              className="enrollmentBtn"
              onClick={(e) => {
                AlertLogin();
              }}
            >
              시험 등록하기
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="loginBtnArea">
            <button
              className="loginBtn"
              onClick={(e) => {
                Logout();
              }}
            >
              로그아웃
            </button>
            <span></span>
          </div>
          <div className="enrollmentBtnArea">
            <Link to="/enrollment">
              <button className="enrollmentBtn">시험 등록하기</button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default MainHeader;
