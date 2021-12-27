import React, { useState, useEffect } from "react";
import Table from "../Component/Table";
import { getServers } from "../Service/nc-api.js";
import style from "../Css/Main.module.css";
import { filterDate } from "../utils";

const STATE = ["비정상", "정상"];

const Server = () => {
  const [server, setServer] = useState({
    data: null,
    openedRegistModal: false,
  });

  useEffect(() => {
    getServers().then((res) => {
      setServer({
        ...server,
        data: res.data.map((v) => ({
          ...v,
          state: STATE[v.state],
          lastStateDate: filterDate(v.lastStateDate),
        })),
      });
    });
  }, []);

  return (
    <>
      <div>
        <div className={style.contentTitle}>서버 상태 관리</div>
        <Table
          columnNames={{
            name: "서버이름",
            workplace: "사업장",
            state: "상태",
            lastStateDate: "최종 상태 일자",
          }}
          columnWidths={{
            name: 10,
            workplace: 40,
            state: 10,
            lastStateDate: 10,
          }}
          classes={{
            state: (v) => {
              return v;
            },
          }}
          data={server.data}
        />
      </div>
    </>
  );
};

export default Server;
