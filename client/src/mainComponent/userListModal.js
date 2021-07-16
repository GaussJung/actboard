import React, { useState, useRef, useEffect } from "react";

const UserListModal = (props) => {
  const [modalPageNum, setModalPageNum] = useState(1);
  const [showUserLen, setShowUserLen] = useState(10);
  const [isOpen, setOpen] = useState(false);

  const modalEl = useRef();

  const handleClickOutside = ({ target }) => {
    if (isOpen && !modalEl.current.contains(target)) props.ShowModal();
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // 사용자 모달의 출력되는 목록 개수 조절
  const ShowUserList = () => {
    let examInfoList = [];
    for (
      let cnt = modalPageNum * showUserLen - showUserLen;
      cnt < modalPageNum * showUserLen;
      cnt++
    ) {
      if (cnt >= props.userList.length) {
        cnt++;
      } else {
        examInfoList.push(
          <div className="modalCotent" key={cnt + 1}>
            <h4>{cnt + 1}</h4>
            <h4>{props.userList[cnt].name}</h4>
            <h4>{props.userList[cnt].createdate}</h4>
          </div>
        );
      }
    }
    return examInfoList;
  };

  const ChangeBtnColor = () => {
    const getPageBtn = document.getElementsByClassName("modalPageBtn");
    for(let i = 0; i < getPageBtn.length ; i++){
      
      if(parseInt(getPageBtn[i].value) === modalPageNum){
        getPageBtn[i].style.backgroundColor = "#FA8282";
      }else{
        getPageBtn[i].style.backgroundColor = "#efefef";
      }
    }
  }

  // 사용자 모달의 페이지 버튼
  const GetUsermodalPageNum = () => {
    let modalPageNumBtn = [];
    for (
      let cnt = 0;
      cnt < Math.ceil(props.userList.length / showUserLen);
      cnt++
    ) {
      modalPageNumBtn.push(
        <button
          key={cnt}
          value={cnt + 1}
          onClick={(e) => {
            setModalPageNum(cnt + 1);
          }}
          className="modalPageBtn"
        >
          {cnt + 1}
        </button>
      );
    }
    return modalPageNumBtn;
  };

  ChangeBtnColor();

  window.addEventListener('click', (evt) => {
    console.log(modalEl);
    if(evt.target == modalEl[0]){
        props.ShowModal();
    }
  })

  return (
    <>
      <div className={"userListModalArea"}>
        <div className="userListModal">
          <div className="modalTitle">
            <h3 className="modalTitleText">사용자 목록</h3>
            <p className="modalTitleExit" onClick={((e) => {props.ShowModal()})}>✖</p>
          </div>
          <hr></hr>
          <div className="modalContentArea">
            <div className="modataInfo">
              <h4>No.</h4>
              <h4>이름</h4>
              <h4>생성일자</h4>
            </div>
            <hr></hr>
            {props.userList.length !== 0 ? (
              <>{ShowUserList()}</>
            ) : (
              <h6>사용자가 없습니다.</h6>
            )}
          </div>
          <div className="modalPageBtnArea">
            <hr></hr>
            {GetUsermodalPageNum()}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserListModal;
