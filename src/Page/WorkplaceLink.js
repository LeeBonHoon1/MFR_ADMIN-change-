import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import style from "../Css/Main.module.css";
import Table from "../Component/Table";
import { filterDate } from "../utils";

import closeIconPng from "../assets/close-icon.png";
import trashIconPng from "../assets/trash-icon.png";
import inputFileExamPng from "../assets/input-file-exam.png";

import { getNotices } from "../Service/nc-api.js";
import { set } from "react-hook-form";

const Select = ({
  defaultOption,
  options, // [{value, label}]
  onChange,
}) => {
  const [active, setActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption || "");

  const handleClick = (e) => {
    e.stopPropagation();
    setActive(!active);
  };

  const handleSelect = (option) => {
    const _selectedOption = options.find((v) => v.value === option.value);

    setActive(false);
    setSelectedOption(_selectedOption);
    onChange(_selectedOption);
  };

  useEffect(() => {
    const _handleClick = (e) => {
      setActive(false);
    };

    window.addEventListener("click", _handleClick);

    return () => {
      window.removeEventListener("click", _handleClick);
    };
  }, []);

  return (
    <div className={`form-select ${active ? "active" : ""}`}>
      <button className="label" onClick={handleClick}>
        {selectedOption.label}
      </button>
      <ul className="optionList">
        {options.map((v, i) => (
          <li
            key={i}
            className={`optionItem ${
              selectedOption.value === v.value ? "text-primary" : ""
            }`}
            onClick={(e) => {
              handleSelect(v);
            }}
          >
            {v.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

const WorkplaceLink = () => {
  useEffect(() => {
    // const label = document.querySelector(".label");
    // const options = document.querySelectorAll(".optionItem");
    // // 클릭한 옵션의 텍스트를 라벨 안에 넣음
    // const handleSelect = (item) => {
    //   label.parentNode.classList.remove("active");
    //   label.innerHTML = item.textContent;
    // };
    // // 옵션 클릭시 클릭한 옵션을 넘김
    // options.forEach((option) => {
    //   option.addEventListener("click", () => handleSelect(option));
    // });
    // // 라벨을 클릭시 옵션 목록이 열림/닫힘
    // label.addEventListener("click", () => {
    //   if (label.parentNode.classList.contains("active")) {
    //     label.parentNode.classList.remove("active");
    //   } else {
    //     label.parentNode.classList.add("active");
    //   }
    // });
  });

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="form-header">사업장관리 - 링크보내기</h2>
          <div className="form-body">
            <ul className="form-wrap">
              <li>
                <div className="form-title">구분</div>
                <div className="">
                  <Select
                    defaultOption={{ label: "orange", value: 1 }}
                    options={[
                      { label: "orange", value: 1 },
                      { label: "banana", value: 2 },
                      { label: "apple", value: 3 },
                    ]}
                    onChange={(option) => {
                      console.log(option);
                    }}
                  />
                  {/* <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select> */}
                </div>
              </li>
              <li>
                <div className="form-title">얼굴 등록 여부</div>
                <div className="">
                  <input className="form-control" type="text" />
                </div>
              </li>
              <li>
                <div className="form-title">서버상태</div>
                <div className="">
                  <div className="form-select">
                    <Select
                      defaultOption={{ label: "orange", value: 1 }}
                      options={[
                        { label: "orange", value: 1 },
                        { label: "banana", value: 2 },
                        { label: "apple", value: 3 },
                      ]}
                      onChange={(option) => {
                        console.log(option);
                      }}
                    />
                  </div>
                </div>
              </li>
            </ul>
            <div>
              <button className="btn btn-primary">검색</button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="table-caption-top">
            <span>총 25건</span>
            <button className="btn btn-secondary">등록</button>
          </div>
          <table className="table">
            <colgroup>
              <col width="150" />
              <col width="150" />
              <col width="*" />
              <col width="150" />
              <col width="160" />
              <col width="184" />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>구분</th>
                <th>제목</th>
                <th>첨부파일</th>
                <th>등록일</th>
                <th>조회</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>126</td>
                <td>배포</td>
                <td className="text-left">이용약관 개정안내</td>
                <td></td>
                <td>2021.12.23</td>
                <td>123</td>
              </tr>
              <tr>
                <td>126</td>
                <td>배포</td>
                <td className="text-left">이용약관 개정안내</td>
                <td></td>
                <td>2021.12.23</td>
                <td>123</td>
              </tr>
              <tr>
                <td>126</td>
                <td>배포</td>
                <td className="text-left">이용약관 개정안내</td>
                <td></td>
                <td>2021.12.23</td>
                <td>123</td>
              </tr>
              <tr>
                <td>126</td>
                <td>배포</td>
                <td className="text-left">이용약관 개정안내</td>
                <td></td>
                <td>2021.12.23</td>
                <td>123</td>
              </tr>
              <tr>
                <td>126</td>
                <td>배포</td>
                <td className="text-left">이용약관 개정안내</td>
                <td></td>
                <td>2021.12.23</td>
                <td>123</td>
              </tr>
              <tr>
                <td>126</td>
                <td>배포</td>
                <td className="text-left">이용약관 개정안내</td>
                <td></td>
                <td>2021.12.23</td>
                <td>123</td>
              </tr>
              <tr>
                <td>126</td>
                <td>배포</td>
                <td className="text-left">이용약관 개정안내</td>
                <td></td>
                <td>2021.12.23</td>
                <td>123</td>
              </tr>
              <tr>
                <td>126</td>
                <td>배포</td>
                <td className="text-left">이용약관 개정안내</td>
                <td></td>
                <td>2021.12.23</td>
                <td>123</td>
              </tr>
              <tr>
                <td>126</td>
                <td>배포</td>
                <td className="text-left">이용약관 개정안내</td>
                <td></td>
                <td>2021.12.23</td>
                <td>123</td>
              </tr>
              <tr>
                <td>126</td>
                <td>배포</td>
                <td className="text-left">이용약관 개정안내</td>
                <td></td>
                <td>2021.12.23</td>
                <td>123</td>
              </tr>
              <tr>
                <td>126</td>
                <td>배포</td>
                <td className="text-left">이용약관 개정안내</td>
                <td></td>
                <td>2021.12.23</td>
                <td>123</td>
              </tr>
              <tr>
                <td>126</td>
                <td>배포</td>
                <td className="text-left">이용약관 개정안내</td>
                <td></td>
                <td>2021.12.23</td>
                <td>123</td>
              </tr>
              <tr>
                <td>126</td>
                <td>배포</td>
                <td className="text-left">이용약관 개정안내</td>
                <td></td>
                <td>2021.12.23</td>
                <td>123</td>
              </tr>
              <tr>
                <td>126</td>
                <td>배포</td>
                <td className="text-left">이용약관 개정안내</td>
                <td></td>
                <td>2021.12.23</td>
                <td>123</td>
              </tr>
            </tbody>
          </table>
          <div className="table-caption-bottom">
            <div>
              <ul className="form-group">
                <li className="form-item disabled">
                  <a href="">&lt;&lt;</a>
                </li>
                <li className="form-item">
                  <a href="">&lt;</a>
                </li>
                <li className="form-item active">
                  <a href="">1</a>
                </li>
                <li className="form-item">
                  <a href="">2</a>
                </li>
                <li className="form-item">
                  <a href="">3</a>
                </li>
                <li className="form-item">
                  <a href="">&gt;</a>
                </li>
                <li className="form-item">
                  <a href="">&gt;&lt;</a>
                </li>
              </ul>
            </div>
            <div className="text-right">
              <div className="form-select form-select-sm ml-auto">
                <button className="label">14개씩보기</button>
                <ul className="optionList">
                  <li className="optionItem">10개씩보기</li>
                  <li className="optionItem">14개씩보기</li>
                  <li className="optionItem">20개씩보기</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkplaceLink;
