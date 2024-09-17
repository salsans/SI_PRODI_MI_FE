import { useEffect, useRef, useState } from "react";
import { API_LINK, FILE_LINK } from "../../util/Constants";
import UseFetch from "../../util/UseFetch";
import Button from "../../part/Button";
import Label from "../../part/Label";
import Loading from "../../part/Loading";
import Alert from "../../part/Alert";


export default function MasterUserDetail({ onChangePage, withID }) {
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);

  const formDataRef = useRef({
    Username: "",
    FullName:"",
    Address:"",
    Contact:"",
    Email:"",
    Password:"",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsError((prevError) => ({ ...prevError, error: false }));

      try {
        const data = await UseFetch(API_LINK + "MasterUser/detailUser", {
          id: withID,
        });

        if (data === "ERROR" || data.length === 0) {
          throw new Error("Terjadi kesalahan: Gagal mengambil data User.");
        } else {
          formDataRef.current = { ...formDataRef.current, ...data[0] };
        }
      } catch (error) {
        setIsError((prevError) => ({
          ...prevError,
          error: true,
          message: error.message,
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      {isError.error && (
        <div className="flex-fill">
          <Alert type="danger" message={isError.message} />
        </div>
      )}
      <div className="card">
        <div className="card-header bg-primary fw-medium text-white">
          User Details
        </div>
        <div className="card-body p-4">
          <div className="row">
            <div className="col-lg-6">
              <Label
                forLabel="Username"
                title="Username"
                data={formDataRef.current.Username}
              />
            </div>
            <div className="col-lg-6">
              <Label
                forLabel="FullName"
                title="Full Name"
                data={formDataRef.current.FullName}
              />
            </div>
            <div className="col-lg-6">
              <Label
                forLabel="Address"
                title="Address"
                data={formDataRef.current.Address}
              />
            </div>
            <div className="col-lg-6">
              <Label
                forLabel="Contact"
                title="Contact"
                data={formDataRef.current.Contact}
              />
            </div>
            <div className="col-lg-6">
              <Label
                forLabel="Email"
                title="Email"
                data={formDataRef.current.Email}
              />
            </div>
            <div className="col-lg-6">
              <Label
                forLabel="Password"
                title="Password"
                data={formDataRef.current.Password}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="float-end my-4 mx-1">
        <Button
          classType="secondary px-4 py-2"
          label="BACK"
          onClick={() => onChangePage("index")}
        />
      </div>
    </>
  );
}
