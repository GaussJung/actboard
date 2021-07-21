import React from "react";
import { Route } from "react-router-dom";
import Main from "./mainComponent/main";
import LoginPage from "./loginComponent/login";
import Enrollment from "./enrollmentComponent/enrollment";
import NewUser from "./loginComponent/newUser";
import ExamDetail from "./examDetailComponent/examdetail"

function App() {
  return (
    <>
      <Route exact={true} path="/" render={() => <Main />} />
      <Route path="/login" render={()=>< LoginPage/>} />
      <Route path="/enrollment" render={()=>< Enrollment/>} />
      <Route path="/newUser" render={()=>< NewUser/>} />
      <Route path="/examDetail/:id" render={()=>< ExamDetail/>} />
    </>
  );
}

export default App;
