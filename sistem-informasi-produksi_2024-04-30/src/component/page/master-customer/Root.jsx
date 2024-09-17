import { useState } from "react";
import MasterCustomerIndex from "./Index";
import MasterCustomerAdd from "./Add";
import MasterCustomerEdit from "./Edit";

export default function MasterCustomer() {
    const [pageMode, setPageMode] = useState("index");
    const [dataID, setDataID] = useState();

    function getPageMode() {
        switch (pageMode) {
          case "index":
            return <MasterCustomerIndex onChangePage={handleSetPageMode} />;
          case "add":
            return <MasterCustomerAdd onChangePage={handleSetPageMode} />;
          case "edit":
            return (
            <MasterCustomerEdit onChangePage={handleSetPageMode}
             withID={dataID} />
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