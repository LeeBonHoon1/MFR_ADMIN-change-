import React, { useState, useEffect, useContext } from "react";
import style from "../Css/Main.module.css";
import { AuthContext } from "../Context";
import logoPng from "../assets/logo.png";
import { Link, useHistory } from "react-router-dom";

const MENU = [
  { name: "공지사항", to: "/notice", list: null },
  {
    name: "사업장 관리",
    to: "/workplace",
    list: [
      { name: "전체리스트", to: "/list" },
      { name: "얼굴등록 링크보내기", to: "/link" },
      { name: "얼굴 등록 현황", to: "/regist" },
    ],
  },
  { name: "권한 관리", to: "/authority", list: null },
  { name: "서버 상태 관리", to: "/server", list: null },
];

const Navigator = () => {
  const history = useHistory();

  const [openedNavigatorIdxs, setOpenedNavigatorIdxs] = useState(
    history.location.pathname.split("/")[1] === "workplace" ? [1] : []
  );

  const openSubNavigator = (e, idx) => {
    e.preventDefault();
    if (openedNavigatorIdxs.includes(idx)) {
      setOpenedNavigatorIdxs(openedNavigatorIdxs.filter((_, i) => i === idx));
    } else {
      setOpenedNavigatorIdxs([...openedNavigatorIdxs, idx]);
    }
  };

  useEffect(() => {}, [history]);

  return (
    <div className={style.navigationContainer}>
      <ul>
        {MENU.map((v, i) => {
          if (v.list) {
            return (
              <li key={i}>
                <Link
                  to="/"
                  className={
                    `/${history.location.pathname.split("/")[1]}` === v.to
                      ? `${style.active}`
                      : ""
                  }
                  onClick={(e) => {
                    openSubNavigator(e, i);
                  }}
                >
                  {v.name}
                </Link>
                {openedNavigatorIdxs.includes(i) && (
                  <ul className={style.subNavigationContainer}>
                    {v.list.map((vv, ii) => (
                      <li key={ii}>
                        <Link
                          to={v.to + vv.to}
                          className={
                            history.location.pathname === v.to + vv.to
                              ? `${style.active}`
                              : ""
                          }
                        >
                          {vv.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          } else {
            return (
              <li key={i}>
                <Link
                  to={v.to}
                  className={
                    history.location.pathname === v.to ? `${style.active}` : ""
                  }
                >
                  {v.name}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

const Layout = ({ children }) => {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [isOpenUserMore, setIsOpenUserMore] = useState(false);

  function toggleUserMore(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsOpenUserMore(!isOpenUserMore);
  }

  function logout(e) {
    e.preventDefault();
    context.set(null);
    history.push("/login");
  }

  function openUserMy(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className={style.headerContainer}>
        <Logo
          onClick={() => {
            history.push("/server");
          }}
        />
        <div className={style.headerTextsContainer}>
          <div className={style.headerText2}>
            <a href="/" onClick={toggleUserMore}>
              {context.state.name} 관리자님
            </a>
            {isOpenUserMore === true ? (
              <div className={style.userMoreContainer}>
                <a href="/" onClick={openUserMy}>
                  내정보
                </a>
                <a href="/" onClick={logout}>
                  로그아웃
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className={style.bodyContainer}>
        <Navigator />
        <div className={style.contentContainer}>
          <div className={style.contentContainer2}>{children}</div>
        </div>
      </div>
    </>
  );
};

const Logo = () => {
  return (
    <div className={style.logo}>
      <img src={logoPng} alt="logo"></img>
    </div>
  );
};

export default Layout;
