// 시험등록 조건식 함수
export const CheckData = (data) => {

  console.log(data)

  // 이름 조건
  if (
    data.name === "" ||
    data.name === undefined ||
    data.name === null ||
    data.name > 30
  ) {
    alert("이름을 다시 입력해주세요.");
    return false;
  };

  // 학년 조건
  if (data.grade === "" || data.grade === undefined || data.grade === null) {
    alert("학년을 적어주십시오.");

    return false;
  };

  // 시험과목 조건
  if (
    data.subject === "" ||
    data.subject === undefined ||
    data.subject === null
  ) {
    alert("시험과목을 적어주십시오.");
    return false;
  };

  // 시험 단원 조건
  if (
    parseInt(data.content) > 100 ||
    parseInt(data.content) < 1 ||
    data.content === "" ||
    data.content === undefined ||
    data.content === null
  ) {
    alert("시험 단원을 확인해주세요. 1단원이상 100단원미만");
    return false;
  };

  // 시험문제 개수 조건
  if (parseInt(data.examquestion) > 200 || parseInt(data.examquestion) < 1) {
    alert("문제개수를 수정해주세요. 1개이상 1000개 미만");
    return false;
  };

  return true;
};

