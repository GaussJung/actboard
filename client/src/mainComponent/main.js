import React, { useState, useEffect } from "react";
import MainHeader from "./mainHeader";
import MainSearchArea from "./mainSearchArea";
import MainContent from "./mainContent";
import { GetDbData, CompleteLogin } from "../api";
import axios from "axios";
import "../mainComponent/main.css";

export default function Main() {
  const [data, setData] = useState([]); // db에서 받아올 데이터
  const [loading, setLoading] = useState(false);  // db에서 데이터를 받을동안 로딩
  const [loginStatus, setLoginStatus] = useState(); // 사용자가 로그인을 하였는지 확인

  // db불러오기
  async function DbList() {
    const datas = await GetDbData();
    setData(datas);
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
      .post(`/api/list?grade=${gradeVal}&subject=${subjectVal}&teacher=${teacherVal}`)
      .then((res) => setData(res.data));
  };

  useEffect(() => {
    DbList();
  }, []);
  return (
    <>
      {loading === true ? (
        <>
          <div className="headerContainer">
            <MainHeader loginInfo={loginStatus} />
          </div>
          <div className="container">
            <MainSearchArea
              subject={data.subjectData}
              teacher={data.teacherData}
              search={SearchList}
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
