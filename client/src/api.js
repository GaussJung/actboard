import axios from "axios";

// 목록화면의 데이터 수집
export const GetDbData = async () => {
  const dbList = await axios.get("/api/exam/list/").then((res) => res.data);

  return dbList;
};

// 목록화면의 데이터 수집
export const GetExamData = async (examid) => {
  const dbList = await axios
    .get("/api/exam/examUpdate/" + examid)
    .then((res) => res.data);

  console.log(dbList);

  return dbList;
};

// 사용자 목록 데이터
export const GetUserList = async () => {
  const dbList = await axios.post("/api/user/userList").then((res) => res.data);

  return dbList;
};

// 로그인상태일 경우 정보 저장
export const CompleteLogin = async () => {
  const dbList = await axios
    .get("/api/user/completelogin")
    .then((res) => res.data);

  return dbList;
};

// 로그인상태일 경우 정보 저장
export const ExamDetailData = async (examid) => {
  const dbList = await axios
    .get("/api/exam/detail/" + examid)
    .then((res) => res.data);
    
  return dbList;
};
