import React, { useState, useEffect } from "react";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

const EnrollmentContent = (props) => {
  const [grade, setGrade] = useState(""); // 학년
  const [subject, setSubject] = useState(); // 과목
  const [data, setData] = useState(props.data); // 입력했던 데이터

  return (
    <>
      <div id="formContent">
        <div id="userNameArea">
          <p>
            <span className="requisite">* </span>등록자 이름
          </p>
          <input
            name="teacher"
            className={"typeInput"}
            type="text"
            id="userName"
            placeholder="이름을 입력해주세요."
            maxLength="30"
            value={data.name}
            onChange={(e) => {

                setData({
                    ...data,
                    name : e.target.value
                })

                console.log(data)

                }}
          />
        </div>

        <div id="gradeArea">
          <p>
            <span className="requisite">* </span>학년
          </p>
          <input
            name="grade"
            className={"typeInput"}
            type="text"
            id="gradeInput"
            value={data.grade}
            placeholder="학년"
            disabled
          />
          <select
            name="grade"
            id="gradeSel"
            onChange={(e) => (
              setGrade(e.target.value),
              setData({
                ...data,
                grade : e.target.value
            })

            )}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>

        <div id="testSubjectArea">
          <p>
            <span className="requisite">* </span>과목
          </p>
          <input
            name="subject"
            className={"typeInput"}
            type="text"
            id="testSubject"
            value={data.subject}
            onChange={(e) => (
              setSubject(e.target.value),
              setData({
                ...data,
                subject : e.target.value
            })
            )}
            placeholder="시험 과목을 선택해주세요."
            maxLength="20"
          />
          <select
            name="subject"
            id="subjectSel"
            onChange={(e) => (
              setSubject(e.target.value),
              setData({
                ...data,
                subject : e.target.value
            })
            )}
          >
            <option>직접입력</option>
            <option value="수학">수학</option>
            <option value="영어">영어</option>
            <option value="국어">국어</option>
            <option value="사회">사회</option>
            <option value="도덕">도덕</option>
            <option value="역사">역사</option>
          </select>
        </div>

        <div id="testContentArea">
          <p>
            <span className="requisite">* </span>단원
          </p>
          <input
            name="content"
            className={"typeInput"}
            type="number"
            id="testContent"
            placeholder="시험 단원을 입력해주세요."
            value={data.content}
            onChange={(e) => {
                setData({
                    ...data,
                    content : e.target.value
                })
            }}
          />
        </div>

        <div id="testContentHeaderArea">
          <p>단원 제목</p>
          <input
            name="contentHeader"
            className={"typeInput"}
            type="text"
            id="testContentHeader"
            placeholder="단원 제목을 입력해주세요."
            maxLength="50"
            value={data.contentheader}
            onChange={(e) => {
                setData({
                    ...data,
                    contentheader : e.target.value
                })
            }}
          />
        </div>

        <div id="testInfoArea">
          <p>시험 제목</p>
          <input
            type="text"
            name="examHeader"
            className={"typeInput"}
            id="testInfo"
            placeholder="시험 제목을 적어주세요."
            maxLength="300"
            value={data.examheader}
            onChange={(e) => {
                setData({
                    ...data,
                    examheader : e.target.value
                })
            }}
          />
        </div>

        <div id="testQuestionArea">
          <p>문제 개수 (최대 200문제)</p>
          <input
            name="testQuestion"
            className={"typeInput"}
            type="number"
            id="testQuestion"
            placeholder="시험문제 개수"
            value={data.examquestion}
            onChange={(e) => {
                setData({
                    ...data,
                    examquestion : e.target.value
                })            }}
          />
        </div>

        <div id="testQuestionFileArea">
          <p>
            <span className="requisite">* </span>시험지 파일 : {data.filename}
          </p>{" "}
          <input
            type="file"
            id="testQuestionFile"
            name="file"
            onChange={(e) => props.setFile(e.target.files[0])}
          />
        </div>
        <hr></hr>
        <div id="submitButtonArea">
          <button
            onClick={(e) => {
              props.SendData(data);
            }}
          >
            전송
          </button>
        </div>
      </div>
    </>
  );
};

export default EnrollmentContent;
