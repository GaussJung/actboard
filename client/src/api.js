import axios from "axios";

let apiServer = "";
const currentUrl = document.location.href;

if (currentUrl.indexOf("localhost") > -1) {
  apiServer = "http://localhost:8000";
} else {
  apiServer = "http://utdev.soymlops.com:8000";
}

// 목록화면의 데이터 수집
export const GetDbData = async () => {
  const dbList = await axios
    .get(apiServer + "/api/list")
    .then((res) => res.data);

  return dbList;
};

// 사용자 목록 데이터
export const GetUserList = async () => {
  const dbList = await axios.get("/userList").then((res) => res.data);

  return dbList;
};

// 로그인상태일 경우 정보 저장
export const CompleteLogin = async () => {
  const dbList = await axios.get("/completelogin").then((res) => res.data);

  return dbList;
};
