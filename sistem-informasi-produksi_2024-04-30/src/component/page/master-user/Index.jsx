import { useEffect, useRef, useState } from "react";
import { PAGE_SIZE, API_LINK } from "../../util/Constants";
import UseFetch from "../../util/UseFetch"; // Ensure this import statement is correct
import Button from "../../part/Button";
import Input from "../../part/Input";
import Table from "../../part/Table";
import Paging from "../../part/Paging";
import Filter from "../../part/Filter";
import DropDown from "../../part/Dropdown";
import Alert from "../../part/Alert";
import Loading from "../../part/Loading";
import SweetAlert from "../../util/SweetAlert";

const initialData = [
  {
    Key: null,
    No: null,
    Username: null,
    "Full Name": null,
    "Contact Number": null,
    Password: null,
    Status: null,
    Count: 0,
  },
];

const sortOptions = [
  { Value: "[Full Name] asc", Text: "Full Name [↑]" },
  { Value: "[Full Name] desc", Text: "Full Name [↓]" },
];

const statusOptions = [
  { Value: "Aktif", Text: "Aktif" },
  { Value: "Tidak Aktif", Text: "Tidak Aktif" },
];





export default function MasterUserIndex({ onChangePage }) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentData, setCurrentData] = useState(initialData);
  const [currentFilter, setCurrentFilter] = useState({
    page: 1,
    query: "",
    sort: "[Full Name] asc",
    status: "Aktif",
  });

  const searchQuery = useRef();
  const searchFilterSort = useRef();
  const searchFilterStatus = useRef();

  function handleSetCurrentPage(newCurrentPage) {
    setIsLoading(true);
    setCurrentFilter((prevFilter) => ({
      ...prevFilter,
      page: newCurrentPage,
    }));
  }
  function handleSetStatus(id) {
    setIsLoading(true);
    setIsError(false);
    UseFetch(API_LINK + "MasterUser/SetStatusUser", {
      "Id User": id,
    })
      .then((data) => {
        if (data === "ERROR" || data.length === 0) setIsError(true);
        else {
          SweetAlert("Succeeded", "User Data Deleted", "success");
          handleSetCurrentPage(currentFilter.page);
        }
      })
      .then(() => setIsLoading(false));
  }

  function handleSearch() {
    setIsLoading(true);
    setCurrentFilter({
      page: 1,
      query: searchQuery.current.value,
      sort: searchFilterSort.current.value,
      status: searchFilterStatus.current.value,
    });

    console.log("Search Params: ", {
      page: 1,
      query: searchQuery.current.value,
      sort: searchFilterSort.current.value,
      status: searchFilterStatus.current.value,
    });
  }

 

  useEffect(() => {
    console.log("Current Filter: ", currentFilter);

    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const data = await UseFetch(API_LINK + "MasterUser/GetDataUser", currentFilter);

        if (data === "ERROR") {
          setIsError(true);
        } else if (data.length === 0) {
          setCurrentData(initialData);
        } else {
          const formattedData = data.map((value, index) => ({
            ...value,
            Key: value.Key || index.toString(),
            Aksi: ["Status", "Detail", "Edit"],
            Alignment: ["center", "center", "center", "center", "center","center","center","center"],
          }));
          console.log("Formatted Data: ", formattedData);
          setCurrentData(formattedData);
        }
      } catch (error) {
        console.error("Effect Error: ", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentFilter]);

  return (
    <div className="d-flex flex-column">
      {isError && (
        <div className="flex-fill">
          <Alert
            type="warning"
            message="Terjadi kesalahan: Gagal mengambil data user."
          />
        </div>
      )}
      <div className="flex-fill">
        <div className="input-group">
          <Button
            iconName="add"
            classType="success"
            label="Add"
            onClick={() => onChangePage("add")}
          />
          <Input
            ref={searchQuery}
            forInput="pencarianuser"
            placeholder="Search"
          />
          <Button
            iconName="search"
            classType="primary px-4"
            title="Search"
            onClick={handleSearch}
          />
          <Filter>
            <DropDown
              ref={searchFilterSort}
              forInput="ddUrut"
              label="Urut Berdasarkan"
              type="none"
              arrData={sortOptions}
              defaultValue="[Full Name] asc"
            />
            <DropDown
              ref={searchFilterStatus}
              forInput="ddStatus"
              label="Status"
              type="none"
              arrData={statusOptions}
              defaultValue="Aktif"
            />
          </Filter>
        </div>
      </div>
      <div className="mt-3">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="d-flex flex-column">
            <Table
              data={currentData}
              onStatus={handleSetStatus}
              onDetail={onChangePage}
              onEdit={onChangePage}
            />
            <Paging
              pageSize={PAGE_SIZE}
              pageCurrent={currentFilter.page}
              totalData={currentData[0]["Count"]}
              navigation={handleSetCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
