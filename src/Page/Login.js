import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import style from "../Css/Main.module.css";
import { getUser } from "../Service/nc-api.js";
import Loading from "../Component/Loading";
import swal from "sweetalert2";

const Login = () => {
  const [idModal, setIdModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  let context = useContext(AuthContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [login, setLogin] = useState({
    id: localStorage.getItem("savedId") || "",
    password: "",
    savedId: localStorage.getItem("savedId") === null ? false : true,
    autoLogin: false,
    error: "",
  });

  const idInputHandler = (e) => {
    // e.preventDefault();
    setLogin({
      ...login,
      id: e.target.value,
    });
  };

  const passwordInputHandler = (e) => {
    // e.preventDefault();
    setLogin({
      ...login,
      password: e.target.value,
    });
  };

  const getLogin = () => {
    const { id, password } = login;
    if (id === "") {
      swal.fire({
        title: "아이디를 입력해주세요.",
        width: "510px",
        customClass: "swal-height",
        confirmButtonColor: "#0072CE",
        confirmButtonText: "확인",
        height: "285px",
      });
      // swal.fire({
      //   width: "50%",
      //   height: "500px",
      //   title: "아이디를 입력해주세요.!",
      //   cancelButtonColor: "#0072ce",
      // });
    } else if (password === "") {
      swal.fire({
        title: "비밀번호를 입력해 주세요.!",
      });
    } else if (id.length < 8) {
      swal.fire({
        title: "입력하신 아이디보다 길어야합니다.!",
      });
    } else if (login.password.length < 8) {
      swal.fire({
        title: "입력하신 비밀번호보다 길어야합니다.!",
      });
    }
    // axios
    //   .get("http://121.165.242.171:9389", {
    //     headers: { "Access-Control-Allow-Origin": "*" },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });

    // axios
    //   // .get(`http://localhost:4000/users?user=${id}&password=${password}`)
    //   .get(`http://121.165.242.171:8899/v1/auth/login`, {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       body: {
    //         "Access-Control-Allow-Origin":
    //           "http://121.165.242.171:8899/v1/auth/login",
    //       },
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    getUser(id, password).then((res) => {
      const successedLogin = res.data.length > 0;
      if (successedLogin) {
        if (login.savedId) {
          localStorage.setItem("savedId", id);
        }
        localStorage.setItem("loginInfo", "true");
        const { id, password, name } = res.data[0];

        context.set({
          id,
          password,
          name,
        });
        history.push("/WorkplaceList");
      } else {
        setLogin({ ...login, error: true });
      }
    });
  };

  function enterHandler(e) {
    if (e.key === "Enter") {
      getLogin();
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    window.login = login;
  }, [login]);

  useEffect(() => {
    console.log(login);
  }, []);

  return (
    <div className={style.fullContainer}>
      {/* {isLoading ? <Loading /> : null} */}
      <div className={style.loginContainer}>
        <div className={style.loginContainer2}>
          <div className={style.loginTitle}>서비스 로고/이름</div>
          <input
            className={style.loginInput}
            name="id"
            type="text"
            placeholder="아이디"
            value={login.id}
            onChange={idInputHandler}
            onKeyDown={enterHandler}
          />
          <input
            className={style.loginInput}
            name="password"
            type="password"
            placeholder="비밀번호"
            value={login.password}
            onChange={passwordInputHandler}
            onKeyDown={enterHandler}
          />
          <div className={style.loginError}>{login.error}</div>
          <div className={style.loginCheckboxContainer}>
            <CheckBox label="아이디 저장" value={login.savedLogin} />
            <CheckBox label="로그인 상태유지" value={login.autoLogin} />
          </div>
          <div className={style.loginButtonContainer}>
            <button className={style.primaryButton} onClick={getLogin}>
              로그인
            </button>
          </div>
          <div className={style.loginNavigator}>
            <Link to="/signup">회원가입</Link>
            <Link to="/searchid">ID찾기</Link>
            <Link to="/resetpassword">비밀번호 재설정</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckBox = (props) => {
  return (
    <div>
      <input type="checkbox" className={style.loginCheckbox} {...props} />
      <label className={style.loginCHeckboxLabel}>{props.label}</label>
    </div>
  );
};

export default Login;
