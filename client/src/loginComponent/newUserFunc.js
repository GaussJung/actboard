// 입력한 정보의 조건들 ------------------------------------------------------------------------------------------------
export const CheckData = (data, samePw) => {
    if (data !== undefined) {
      let pwCheck = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,30}$/; // pw 조건   (영어 + 숫자 8자~30자);
      let tmpVal, tmpVal2;

      // 이름 조건
      console.log(data);
      tmpVal = data.name;
      if (tmpVal === "" || tmpVal.length[0] > 30) {
        alert("이름을 다시 입력해주세요.");
        return false;
      } else {
        data.name = tmpVal;
      };

      // 비밀번호 조건
      tmpVal = data.passwd;
      if (tmpVal === "" || tmpVal === undefined || tmpVal === null|| pwCheck.test(tmpVal) === false) {
        alert("비밀번호를 입력해주세요.");
        return false;
      } else {
        data.passwd = tmpVal;
      };

      // 비밀번호 재입력 확인
      tmpVal2 = samePw;

      if (tmpVal !== tmpVal2) {
        alert("확인란의 비밀번호가 같지 않습니다.");
        return false;
      };

      tmpVal = data.grade;
      if (tmpVal === "" || tmpVal === undefined || tmpVal === null) {
        alert("담당 학년을 선택해주세요.");
        return false;
      };

      return true;
    }else{
        return alert("양식에 맞게 하세요!");
    };
  };

