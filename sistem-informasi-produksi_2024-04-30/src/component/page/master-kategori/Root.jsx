import { useState } from "react";
import MasterKategoriIndex from "./Index";
import MasterKategoriAdd from "./Add";
import MasterKategoriDetail from "./Detail";
import MasterKategoriEdit from "./Edit";

export default function MasterKategori() {
  const [pageMode, setPageMode] = useState("index");
  const [dataID, setDataID] = useState();

  function getPageMode() {
    switch (pageMode) {
      case "index":
        return <MasterKategoriIndex onChangePage={handleSetPageMode} />;
      case "add":
        return <MasterKategoriAdd onChangePage={handleSetPageMode} />;
      case "detail":
        return (
          <MasterKategoriDetail
            onChangePage={handleSetPageMode}
            withID={dataID}
          />
        );
      case "edit":
        return (
          <MasterKategoriEdit onChangePage={handleSetPageMode} withID={dataID} />
        );
    }
  }

  function handleSetPageMode(mode) {
    setPageMode(mode);
  }

  function handleSetPageMode(mode, withID) {
    setDataID(withID);
    setPageMode(mode);
  }

  return <div>{getPageMode()}</div>;
}
