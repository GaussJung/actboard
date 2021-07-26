import React from "react";
import { Route } from "react-router-dom";
import Main from "./mainComponent/main";
import LoginPage from "./loginComponent/login";
import Enrollment from "./enrollmentComponent/enrollment";
import NewUser from "./loginComponent/newUser";
import ExamDetail from "./examDetailComponent/examdetail";
import ExamUpdate from "./examDetailComponent/examUpdate";

function App() {
  return (
    <>
      <Route exact={true} path="/" render={() => <Main />} />
      <Route path="/login" render={()=>< LoginPage/>} />
      <Route path="/enrollment" render={()=>< Enrollment/>} />
      <Route path="/newUser" render={()=>< NewUser/>} />
      <Route path="/examDetail/:paramsId" render={()=>< ExamDetail/>} />
      <Route path="/examUpdate/:paramsId" render={()=>< ExamUpdate/>} />
    </>
  );
}

export default App;
