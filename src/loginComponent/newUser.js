import React, { useState } from "react";
import axios from "axios";
import {CheckData} from "./newUserFunc";
import "./newUser.css";

export const NewUser = () => {
  const [data, setData] = useState();
  const [samePw, setSamePw] = useState();
  const [grade, setGrade] = useState();
  const [completeId, setCompletId] = useState(false);

  const GetValue = (evt) => {
    let name = evt.target.name;
    let getVal = evt.target.value;
    setData({
      ...data,
      [name]: getVal,
    });
    console.log(data);
  };

  const SameIdCheck = () => {
    const newUserId = document.getElementById("newUserId");
    let idCheck = /^[A-Za-z]{1}[A-Za-z0-9!@#$%^&*]{6,19}$/;

    let newUserIdVal = newUserId.value;

    console.log(newUserIdVal);

    if (
      newUserIdVal !== "" &&
      newUserIdVal !== null &&
      newUserIdVal !== undefined &&
      idCheck.test(newUserIdVal) === true
    ) {
      const useId = axios
        .post("/getUserId", {
          id: newUserIdVal,
        })
        .then((res) => {
          if (res.data === true) {
            if (
              window.confirm("사용 가능합니다. 이 아이디로 사용 하시겠습니까?")
            ) {
              newUserId.disabled = true;
              setCompletId(true);
            }
          } else {
            alert("중복된 아이디 입니다.");
          }
        });
    } else {
      alert("아이디를 다시 입력하세요");
    }
  };

  // 신규 회원 생성 함수 -----------------------------------------------------------------------------------------
  const NewUser = () => {
    // 조건에 비교한뒤 통과하면 회원 생성
    if (CheckData(data, samePw)) {
      if (completeId) {
        axios.post("/newUser", {
          data: data,
        }).then(res => {
            if(res.status === 200){
                alert("회원가입 완료!");
                document.location.replace('/login');
            }else{
                alert("회원가입 실패..");
            }
        })
        }
      } else {
        alert("중복 체크를 해주세요.");
      }
    }

  return (
    <div class="newUSerContainer">
      <h3>문제은행 사용자 등록</h3>
      <hr></hr>
      <p>
        <span class="headClass">*</span> 이름 :{" "}
        <span class="descClass">선생님의 실명</span>
        <br></br>
        <input
          onChange={(e) => {
            GetValue(e);
          }}
          type="text"
          name="name"
          id="newUsername"
          class="newUserInfoVal"
        />
      </p>
      <p>
        <span class="headClass">*</span> 아이디 :{" "}
        <span class="descClass">영문 + 숫자 혼합해서 7자 ~ 20자</span>
        <br></br>
        <input
          onChange={(e) => {
            GetValue(e);
          }}
          type="text"
          name="id"
          id="newUserId"
          class="newUserInfoVal"
        />
        <button
          onClick={(e) => {
            SameIdCheck();
          }}
        >
          중복 확인
        </button>
      </p>
      <p>
        <span class="headClass">*</span> 비밀번호 :{" "}
        <span class="descClass">필수 : 영문 + 숫자 (8자 ~ 15자)</span>
        <br></br>
        <input
          onChange={(e) => {
            GetValue(e);
          }}
          type="password"
          name="passwd"
          id="newUserPw"
          class="newUserInfoVal"
        />{" "}
      </p>
      <p>
        <span class="headClass">*</span> 비밀번호 확인 :{" "}
        <span class="descClass">비밀번호 재입력</span>
        <br></br>
        <input
          onChange={(e) => setSamePw(e.target.value)}
          type="password"
          id="newUserPwCheck"
          name="passwdCheck"
          class="newUserInfoVal"
        />{" "}
      </p>
      <p>
        <span class="headClass">*</span> 담당 학년 :{" "}
        <span class="descClass">아래 선택목록에서 선택</span>
        <br></br>
        <input
          name="applyValue"
          type="text"
          name="grade"
          value={grade}
          class="newUserInfoVal"
          id="newUserGrade"
          placeholder="학년"
          disabled
        />
        <select
          name="grade"
          id="gradeSel"
          onChange={(e) => (setGrade(e.target.value), GetValue(e))}
        >
          <option value="">선택</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </p>
      <button
        id="newUserBtn"
        onClick={(e) => {
          NewUser();
        }}
      >
        회원 가입
      </button>
    </div>
  );
};

export default NewUser;
// let loginCheckBool = false; // 증복확인 했는지 확인.

// const gradeSel = document.getElementById("gradeSel"); // 학년 선택시 값 변경

// gradeSel.addEventListener("change", (event) => {
//   const newUserGrade = document.getElementById("newUserGrade");
//   newUserGrade.value = event.target.value;
// });

// // id 중복체크 -------------------------------------------------------------------------------------
// const sameIdCheck = () => {
//   const newUserId = document.getElementById("newUserId");
//   let idCheck = /^[A-Za-z0-9!@#$%^&*]{3,19}$/;

//   let newUserIdVal = newUserId.value;

//   if (
//     newUserIdVal !== "" &&
//     newUserIdVal !== null &&
//     newUserIdVal !== undefined &&
//     idCheck.test(newUserIdVal) === true
//   ) {
//     fetch("/enrollment/user/getUserList", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id: newUserIdVal,
//       }),
//     }).then((res) => {
//       if (res.status === 200) {
//         alert("사용 가능합니다.");
//         loginCheckBool = true;
//         newUserId.disabled = true;
//       } else {
//         alert("이미 생성된 아이디 입니다.");
//       }
//     });
//   } else {
//     alert("아이디를 다시 입력 해주세요.");
//   }
// };
