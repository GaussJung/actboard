import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './login.css'

export const LoginPage = () => {

  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');

  // 로그인 프로세스 실행
  const LoginProcess = () =>{
    axios.post('/loginprocess',{
      userid : userId,
      userpw : userPw
    }).then((res) => {
      console.log(res)
      if(res.data === true){
        document.location.href = "/";
      }else{
        alert("로그인 실패.")
      }
    })
  }

  // 엔터키를 누를경우 로그인
  const EnterKey = (e) =>{
    if(e.keyCode === 13){
      LoginProcess();
    }
  }

  return (
    <div className="loginContainer">
      <h3>로그인</h3>
      <hr></hr>
      <div className="loginIdArea">
        <p>아이디</p>
        <p>
          <input type="text" id="loginId" onChange={((e) =>(setUserId(e.target.value)))} />
        </p>
      </div>
      <div className="loginPwArea">
        <p>비밀번호</p>
        <p>
          <input type="password" id="loginPw" onChange={((e) => (setUserPw(e.target.value)))} onKeyUp={((e) => {
            EnterKey(e);
          })}/>
        </p>
      </div>
      <div className="BtnArea">
        <div className="newUserBtnArea">
          <Link to="/newUser">
            <input type="button" value="회원 가입" />
          </Link>
        </div>
        <div className="loginBtnArea">
          <input type="button" onClick={(() => {
            LoginProcess();
          })} value="로그인" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
