import React, { useState, useEffect } from "react";
import MainHeader from "./mainHeader";
import MainSearchArea from "./mainSearchArea";
import MainContent from "./mainContent";
import { GetDbData, CompleteLogin, GetUserList } from "../api";
import axios from "axios";
import "../mainComponent/main.css";

export default function Main() {
  const [data, setData] = useState([]); // db에서 받아올 데이터
  const [userList, setUserList] = useState([]); // db에서 받아올 사용자 목록
  const [displayChange, setDisPlayChange] = useState("none"); // 스타일 변경 변수
  const [loading, setLoading] = useState(false); // db에서 데이터를 받을동안 로딩
  const [loginStatus, setLoginStatus] = useState(); // 사용자가 로그인을 하였는지 확인

  // db불러오기
  async function DbList() {
    const datas = await GetDbData();
    const userData = await GetUserList();
    setData(datas);
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
        `/api/list?grade=${gradeVal}&subject=${subjectVal}&teacher=${teacherVal}`
      )
      .then((res) => setData(res.data));
  };

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

  useEffect(() => {
    DbList();
  }, []);
  return (
    <>
      {loading === true ? (
        <>
          <div
            className={"userListModalArea"}
            onClick={(e) => {
              ShowModal();
            }}

            onKeyDown={((e) =>{
              console.log(e.key)
            })}
          >
            <div className="userListModal">
              <h3 className="modalTitle">사용자 목록</h3>
              <hr></hr>
              <div className="modalContentArea">
                <div className="modataInfo">
                  <h4>No.</h4>
                  <h4>이름</h4>
                  <h4>생성일자</h4>
                </div>
                <hr></hr>
                {userList.length !== 0 ? (
                  <>
                    {userList.map((x, i) => (
                      <div className="modalCotent" key={i}>
                        <h4>{i + 1}</h4>
                        <h4>{x.name}</h4>
                        <h4>{x.createdate}</h4>
                      </div>
                    ))}
                  </>
                ) : (
                  <h6>사용자가 없습니다.</h6>
                )}
              </div>
            </div>
          </div>
          <div className="headerContainer">
            <MainHeader loginInfo={loginStatus} />
          </div>

          <div className="container">
            <MainSearchArea
              subject={data.subjectData}
              teacher={data.teacherData}
              search={SearchList}
              modal={ShowModal}
            />
            {data.examListData.map((item, cnt) => (
              <MainContent
                key={item.examid}
                data={item}
                loginStatus={loginStatus}
              />
            ))}
          </div>
        </>
      ) : (
        "loading"
      )}
    </>
  );
}
