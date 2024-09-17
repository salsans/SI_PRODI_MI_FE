import { useState } from "react";
import KendaraanIndex from "./Index";
import KendaraanAdd from "./Add";
import KendaraanEdit from "./Edit";
import KendaraanDetail from "./Detail";

export default function Kendaraan() {
  const [pageMode, setPageMode] = useState("index");
  const [dataID, setDataID] = useState();

  function getPageMode() {
    switch (pageMode) {
      case "index":
        return <KendaraanIndex onChangePage={handleSetPageMode} />;
      case "add":
        return <KendaraanAdd onChangePage={handleSetPageMode} />;
      case "edit":
        return <KendaraanEdit onChangePage={handleSetPageMode} withID={dataID} />;
        case "detail":
        return (
          <KendaraanDetail
            onChangePage={handleSetPageMode}
            withID={dataID}
          />
        );
      default:
        return <KendaraanIndex onChangePage={handleSetPageMode} />;
    }
  }

  function handleSetPageMode(mode, id) {
    setDataID(id);
    setPageMode(mode);
  }

  return <div>{getPageMode()}</div>;
}
