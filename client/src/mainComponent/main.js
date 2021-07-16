import React, { useState, useEffect, useRef } from "react";
import MainHeader from "./mainHeader";
import MainSearchArea from "./mainSearchArea";
import MainContent from "./mainContent";
import UserListModal from "./userListModal";
import { GetDbData, CompleteLogin, GetUserList } from "../api";
import axios from "axios";
import "../mainComponent/main.css";

export default function Main() {
  
  const [examData, setExamData] = useState([]); // db에서 받아올 데이터
  const [userList, setUserList] = useState([]); // db에서 받아올 사용자 목록
  const [loading, setLoading] = useState(false); // db에서 데이터를 받을동안 로딩
  const [loginStatus, setLoginStatus] = useState(); // 사용자가 로그인을 하였는지 확인
  const [pageNum, setPageNum] = useState(1);
  const [showExamLen, setShowExamLen] = useState(10);

  const modalEl = useRef();

  // db불러오기
  async function DbList() {
    const datas = await GetDbData();
    const userData = await GetUserList();
    setExamData(datas);
    setUserList(userData);
    const userInfo = await CompleteLogin();
    if (userInfo === "") {
      setLoginStatus(false);
    } else {
      setLoginStatus(true);
    }
    setLoading(true);
  }


  // 검색하여 목록 교체
  const SearchList = (gradeVal, subjectVal, teacherVal) => {
    // query 조건

    const datas = axios
      .post(
        `/api/exam/list?grade=${gradeVal}&subject=${subjectVal}&teacher=${teacherVal}`
      )
      .then((res) => setExamData(res.data));
  };

  // 모달 띄우는 창
  const ShowModal = () => {
    let modalDisplay = document.getElementsByClassName("userListModalArea")[0];

    if (
      modalDisplay.style.display === "" ||
      modalDisplay.style.display === "none"
    ) {
      modalDisplay.style.display = "flex";
    } else {
      modalDisplay.style.display = "none";
    }
  };

  const ShowExamList = () => {
    let examInfoList = [];
    for (
      let cnt = pageNum * showExamLen - showExamLen;
      cnt < pageNum * showExamLen;
      cnt++
    ) {
      if (cnt >= examData.examListData.length) {
        cnt++;
      } else {
        examInfoList.push(
          <MainContent
            key={examData.examListData[cnt].examid}
            data={examData.examListData[cnt]}
            loginStatus={loginStatus}
          />
        );
      }
    }
    return examInfoList;
  };


  const ChangeBtnColor = () => {
    const getPageBtn = document.getElementsByClassName("pageBtn");
    for(let i = 0; i < getPageBtn.length ; i++){
      
      if(parseInt(getPageBtn[i].value) === pageNum){
        getPageBtn[i].style.backgroundColor = "#FA8282";
      }else{
        getPageBtn[i].style.backgroundColor = "#efefef";
      }
    }
  }

  const GetPageNum = () => {
    let pageNumBtn = [];
    for (
      let cnt = 1;
      cnt <= Math.ceil(examData.examListData.length / showExamLen);
      cnt++
    ) {
        pageNumBtn.push(
          <button
            key={cnt}
            value={cnt}
            onClick={(async (e) => (
                 setPageNum(parseInt(e.target.value))
            ))}
            className="pageBtn"
          >
            {cnt}
          </button>
        )}
        return pageNumBtn;
      }
  
      

  useEffect(() => {
    DbList();
     ChangeBtnColor();
  }, []);

  ChangeBtnColor();
  return (
    <>
      {loading === true ? (
        <>
          <div className="modalComponent">
            <UserListModal ShowModal={ShowModal} userList={userList}/>
          </div>
          <div className="headerContainer">
            <MainHeader loginInfo={loginStatus} />
          </div>

          <div className="container">
            <MainSearchArea
              subject={examData.subjectData}
              teacher={examData.teacherData}
              search={SearchList}
              modal={ShowModal}
            />
            {ShowExamList()}
           
          </div>
          <div className="pageNumBtnArea">{GetPageNum()}</div>
        </>
      ) : (
        "loading"
      )}
    </>
  );
}
