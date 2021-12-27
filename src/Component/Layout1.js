import React, { useState, useEffect, useContext } from "react";
import ReactModal from "react-modal";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Context";
import "../Css/Layout.css";

const Layout1 = ({ children }) => {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);

  function modalHandler() {
    setOpenModal(true);
  }

  function modalCloseHandler() {
    setOpenModal(false);
  }

  function logoutHandler() {
    context.set(null);
  }

  return (
    <div className="main-container">
      <div className="topbar-divider">
        <h1 className="text-primary">에스원[출입관리시스템]</h1>
        <ul>
          <li>
            <a href="#">
              <span className="text-primary">홍길동</span>관리자님
              <ul>
                <li>
                  <a href="#" onClick={modalHandler}>
                    내정보
                  </a>
                </li>
                <li>
                  <a href="#" onClick={logoutHandler}>
                    로그아웃
                  </a>
                </li>
              </ul>
            </a>
          </li>
        </ul>
      </div>
      <div className="sidebar-divider">
        <ul className="menu-wrap">
          <li className="on">
            <div>
              <a
                href="#"
                onClick={() => {
                  history.push("/notice");
                }}
              >
                공지사항
              </a>
            </div>
          </li>
          <li className="menu-group-toggle">
            <div>
              <a href="#">
                사업장관리 <span></span>
              </a>
              <ul>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      history.push("/workplacelist");
                    }}
                  >
                    전체 리스트
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      history.push("/workplacelink");
                    }}
                  >
                    얼굴 등록 링크 보내기
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      history.push("/workplaceregist");
                    }}
                  >
                    얼굴 등록 현황
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div>
              <a href="#">사용자 관리</a>
            </div>
          </li>
          <li className="menu-group-toggle">
            <div>
              <a href="#">
                서버 관리 <span></span>
              </a>
              <ul>
                <li>
                  <a href="#">실시간 모니터링</a>
                </li>
                <li>
                  <a href="#">장애 발생 이력</a>
                </li>
                <li>
                  <a href="#">이력 관리</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      {children}
      <ReactModal
        isOpen={openModal}
        style={{
          content: {
            position: "absolute",
            width: "500px",
            height: "800px",
            left: "calc((100% - 500px) / 2)",
          },
        }}
      >
        <div>awefawefawefawefawef</div>
        <button onClick={modalCloseHandler}>닫기</button>
      </ReactModal>
    </div>
  );
};

export default Layout1;
