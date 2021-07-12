import React, { useState } from 'react'

 const MainSearchArea  = (data)  => {

    const [grade,setGrade] = useState('');  // 학년
    const [subject,setSubject] = useState('');  // 과목
    const [techaer,setTeacher] = useState('');  // 선생님 이름

    

    return(
        <div className="headerArea">
                            <div className="headerTextArea">
                                <h1 className="headerText">시험 조회</h1>
                         </div>
                            <div className="serchSelecterArea">
                                <div className="serchSelecter" id="serchSelecterGrade">
                                    <p>
                                        학년 : <select name="grade" id="gradeSel" onChange={((e) => (setGrade(e.target.value)))}>
                                            <option value="" id="gradeSelOption">전체</option>
                                            <option value="1">1학년</option>
                                            <option value="2">2학년</option>
                                            <option value="3">3학년</option>
                                            <option value="4">4학년</option>
                                            <option value="5">5학년</option>
                                            <option value="6">6학년</option>
                                        </select>
                                    </p>
                                 </div>
                                <div className="serchSelecter" id="serchSelecterSubject">
                                    <p>
                                        과목 : <select name="subject" id="subjectSel" onChange={((e) => (setSubject(e.target.value)))}>
                                            <option value="" id="subjectSelOption">전체</option>
                                            {data.subject.map((item , cnt) =>
                                                (<option key={cnt} value={item.subject}>{item.subject}</option>)  
                                            )}
                                                
                                            
                                            
                                        </select>
                                    </p>
                                </div>
                                <div className="serchSelecter" id="serchSelecterTeacher">
                                    <p>
                                        선생님 : <select name="teacher" id="teacherSel" onChange={((e) => (setTeacher(e.target.value)))}>
                                            <option value="" id="teacherSelOption">전체</option>
                                            {data.teacher.map((item , cnt) =>
                                                (<option key={cnt} value={item.name}>{item.name}</option>)  
                                            )}
                                        </select>
                                    </p>
                                </div>
                                <div className="serchBtnArea">
                                    <button onClick={((e) => {
                                        data.search(grade,subject, techaer);
                                    })} className="serchBtn">시험 조회</button>
                                </div>
                            </div>
                        </div>
    )
}

export default MainSearchArea