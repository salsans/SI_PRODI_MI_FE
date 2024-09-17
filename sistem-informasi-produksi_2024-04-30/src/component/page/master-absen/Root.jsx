import { useState } from "react";
import MasterAbsenIndex from "./Index";
import MasterAbsenAdd from "./Add";
import MasterAbsenDetail from "./Detail";
import MasterAbsenEdit from "./Edit";

export default function MasterAbsen() {
  const [pageMode, setPageMode] = useState("index");
  const [dataID, setDataID] = useState();

  function getPageMode() {
    switch (pageMode) {
      case "index":
        return <MasterAbsenIndex onChangePage={handleSetPageMode} />;
      case "add":
        return <MasterAbsenAdd onChangePage={handleSetPageMode} />;
      case "detail":
        return (
          <MasterAbsenDetail
            onChangePage={handleSetPageMode}
            withID={dataID}
          />
        );
      case "edit":
        return (
          <MasterAbsenEdit onChangePage={handleSetPageMode} withID={dataID} />
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
