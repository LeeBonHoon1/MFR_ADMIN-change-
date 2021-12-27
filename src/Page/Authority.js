import React, { useState, useEffect } from "react";
import Table from "../Component/Table4";
import SubTable from "../Component/Table5";
import style from "../Css/Main.module.css";
import uStyle from "../Css/UserRegistModal.module.css";
import inputDateRangeExamPng from "../assets/input-date-range-exam.png";
import closeIconPng from "../assets/close-icon.png";
import ReactModal from "react-modal";
import WorkplaceModifyModal from "../Component/WorkplaceModifyModal";
import UserRegistModal from "../Component/UserRegistModal";
import { getUserinfos, getWorkplacesByUserIdx } from "../Service/nc-api.js";

const JOINED = ["미완료", "완료"];

const Authrity = () => {
  const [authState, setAuthState] = useState({
    data: null,
    data2: null,
    opendRegistModal: false,
    opendModifyModal: false,
    checkedIdxs: [],
  });

  useEffect(() => {
    getUserinfos().then((res) => {
      if (res.data) {
        setAuthState({
          ...authState,
          data: res.data.map((v) => ({
            ...v,
            joined: JOINED[v.joined],
          })),
        });
      }
    });
  }, []);

  function handleClickRow(idx) {
    getWorkplacesByUserIdx().then((res) => {
      if (res.data) {
        setAuthState({
          ...authState,
          data2: res.data.map((v) => ({
            ...v,
          })),
        });
      }
    });
  }

  function handleChangeCheckbox(idx) {
    const _checkedIdx = authState.checkedIdxs;

    if (_checkedIdx.includes(idx)) {
      setAuthState({
        ...authState,
        checkedIdxs: _checkedIdx.filter((v) => v.idx !== idx),
      });
    } else {
      setAuthState({
        ...authState,
        checkedIdxs: [..._checkedIdx, idx],
      });
    }
  }

  function openRegistModal() {
    setAuthState({
      ...authState,
      opendRegistModal: true,
    });
  }

  function closeRegistModal() {
    setAuthState({
      ...authState,
      opendRegistModal: false,
    });
  }

  function openModifyModal() {
    console.log(authState);
    setAuthState({
      ...authState,
      opendModifyModal: true,
    });
  }

  function closeModifyModal() {
    setAuthState({
      ...authState,
      opendModifyModal: false,
    });
  }

  return (
    <div>
      <div className={style.contentTitle2}>권한 관리</div>
      <div className={style.layoutContainer2Container}>
        <div className={style.box4}>
          <div className={style.box4Container}>
            <label className={style.box4Label}>이름</label>
            <input className={style.box4InputText1} />
          </div>
          <div className={style.box4Cotnainer}>
            <label className={style.box4Label}>휴대전화 번호</label>
            <input className={style.box4InputText2} />
          </div>
          <div className={style.box4Cotnainer}>
            <label className={style.box4Label}>회원 가입</label>
            <select className={style.box4Select}>
              <option>전체</option>
              {JOINED.map((v, i) => (
                <option key={i}>{v}</option>
              ))}
            </select>
          </div>
          <div className={style.box4Cotnainer}>
            <label className={style.box4Label}>최종 상태 일자</label>
            <img src={inputDateRangeExamPng} alt="" />
          </div>
          <div className={style.box4Cotnainer}>
            <button className={style.box4Button}>검색</button>
          </div>
        </div>
        <div className={style.layoutContainer2}>
          <div>
            <div className={style.layoutContainer2TopContainer}>
              <div className={style.contentSubTitle}>사용자 정보</div>
              <div>
                <button
                  className={style.layoutContainer2Button}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  삭제
                </button>
                <button
                  className={style.layoutContainer2Button}
                  onClick={openRegistModal}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  신규등록
                </button>
              </div>
            </div>
            <Table
              columnNames={{
                name: "이름",
                phone: "휴대전화 번호",
                joined: "회원가입",
                lastStateDate: "최종 상태 일자",
              }}
              columnWidths={{
                name: 25,
                phone: 30,
                joined: 15,
                lastStateDate: 25,
              }}
              data={authState.data}
              onChangeCheckbox={handleChangeCheckbox}
              onClickRow={handleClickRow}
            />
          </div>
          <div>
            <div className={style.layoutContainer2TopContainer}>
              <div className={style.contentSubTitle}>관리 사업장</div>
              <div>
                <button
                  className={style.layoutContainer2Button}
                  onClick={openModifyModal}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  수정
                </button>
              </div>
            </div>
            <div className={style.layotContainer2TableContainer}>
              {!authState.data2 && (
                <div className={style.layotContainer2TableContainerNone}>
                  사용자를 선택해주세요
                </div>
              )}
              {authState.data2 && (
                <SubTable
                  columnNames={{
                    workplace: "사업장",
                    power: "권한",
                  }}
                  columnWidths={{
                    workplace: 60,
                    power: 35,
                  }}
                  data={authState.data2}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={authState.opendRegistModal}
        onRequestClose={closeRegistModal}
        ariaHideApp={false}
        style={{
          content: {
            top: "calc((100% - 70%) / 2)",
            left: "calc((100% - 50%) / 2)",
            // bottom: 'calc((100% - 842px) / 2)',
            // right: 'calc((100% - 653px) / 2)',
            width: "50%",
            height: "70%",
            // marginRight: '-50%',
            // transform: 'translate(-50%, -50%)',
            overflow: "hidden",
            overflowY: "scroll",
          },
        }}
        contentLabel="Regist Modal"
      >
        <div className={uStyle.modalContainer}>
          <img
            src={closeIconPng}
            alt="regist close"
            style={{ float: "right", cursor: "pointer" }}
            onClick={closeRegistModal}
          />
          <UserRegistModal />
        </div>
      </ReactModal>
      <ReactModal
        isOpen={authState.opendModifyModal}
        onRequestClose={closeModifyModal}
        ariaHideApp={false}
        style={{
          content: {
            top: "calc((100% - 796px) / 2)",
            left: "calc((100% - 914px) / 2)",
            // bottom: 'calc((100% - 842px) / 2)',
            // right: 'calc((100% - 653px) / 2)',
            width: "914px",
            height: "796px",
            // marginRight: '-50%',
            // transform: 'translate(-50%, -50%)',
          },
        }}
        contentLabel="Modify Modal"
      >
        <div className={style.modalContainer2}>
          <img
            src={closeIconPng}
            alt="regist close"
            style={{
              float: "right",
              cursor: "pointer",
            }}
            onClick={closeModifyModal}
          />
          <WorkplaceModifyModal />
        </div>
      </ReactModal>
    </div>
  );
};

export default Authrity;
