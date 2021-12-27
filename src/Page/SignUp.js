import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "../Css/Main.module.css";
import axios from "axios";

const JOINED_IDS = ["admin"];

const SignUp = (props) => {
  const history = useHistory();
  const [signed, setSigned] = useState({
    id: "",
    confirmId: false,
    name: "",
    password: "",
    confirmPassword: "",
  });

  function handleChangeInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    let confirmId = true;

    if (name === "id" && signed.id !== value) {
      confirmId = false;
    }
    setSigned({
      ...signed,
      confirmId,
      [name]: value,
    });
  }

  function checkId() {
    if (signed.id === "") {
      alert("ID를 입력해주세요.");
    } else if (signed.id.length <= 4) {
      alert("짧읍니다");
    }

    const confirm = !JOINED_IDS.includes(signed.id);
    if (confirm) {
      setSigned({ ...signed, confirmId: true });
    } else {
      alert("존재하는 ID 입니다.");
    }
  }

  function join() {
    history.push("/signupresult");
  }

  return (
    <>
      <div className={style.signupTitle}>회원가입 정보 입력</div>
      <div className={style.fullContainer}>
        <div className={style.signupContainer}>
          <div className={style.signupSubTitle}>
            회원가입 정보를 입력해주세요
          </div>
          <Input
            label="아이디"
            placeholder="아이디 입력"
            name="id"
            vaule={signed.id}
            onChange={handleChangeInput}
            onCheck={checkId}
            confirmId={signed.confirmId}
            infos={["영문 소문자, 숫자 조합을 4~12자 혼용하여야 합니다."]}
          />
          <Input
            label="사용자명"
            placeholder="사용자명 입력"
            value={signed.name}
          />
          <Input label="비밀번호" placeholder="비밀번호" value={signed.name} />
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호 확인"
            vaule={signed.confirmPassword}
            infos={[
              "ID가 포함되면 안됩니다.",
              "같은 문자와 숫자를 3번 이상 반복할 수 없습니다.",
              "영문 대/소문자, 숫자, 특수문자를 8~12자 혼용하여야 합니다",
            ]}
          />
          <div className={style.signUpButtonContainer}>
            <button className={style.primaryButton} onClick={join}>
              완료
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Input = (props) => {
  const handleClickConfirm = () => {
    props.onCheck();
  };

  return (
    <>
      <div className={style.signUpInputContainer}>
        <div className={style.signUpInputContainer2}>
          <label className={style.signUpInputLabel}>{props.label}</label>{" "}
          <input className={style.signUpInput} {...props} />
          {props.onCheck && (
            <button
              className={`${style.signUpConfirmButton} ${
                props.confirmId ? style.signUpConfirmButtonActive : ""
              }`}
              onClick={handleClickConfirm}
            >
              중복확인
            </button>
          )}
        </div>
        {props.infos?.map((info, i) => (
          <div key={i} className={style.signUpInfo}>
            {info}
          </div>
        ))}
      </div>
    </>
  );
};

export default SignUp;
