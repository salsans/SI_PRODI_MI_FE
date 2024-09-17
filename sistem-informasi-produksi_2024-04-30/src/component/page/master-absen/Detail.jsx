import { useEffect, useRef, useState } from "react";
import { API_LINK } from "../../util/Constants";
import UseFetch from "../../util/UseFetch";
import Button from "../../part/Button";
import Label from "../../part/Label";
import Loading from "../../part/Loading";
import Alert from "../../part/Alert";

export default function MasterAbsenDetail({ onChangePage, withID }) {
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);

  const formDataRef = useRef({
    nim: "",
    waktu: "",
    status: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsError((prevError) => ({ ...prevError, error: false }));

      try {
        // Mengambil data dari endpoint REST API yang sesuai dengan stored procedure `si_detailAbsen`
        const data = await UseFetch(API_LINK + "MasterAbsen/DetailAbsen", {
          id: withID, // Mengirimkan ID absen
        });

        if (data === "ERROR" || data.length === 0) {
          throw new Error("Terjadi kesalahan: Gagal mengambil data absen.");
        } else {
          formDataRef.current = { ...formDataRef.current, ...data };
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
  }, [withID]);

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
          Detail Data Absen
        </div>
        <div className="card-body p-4">
          <div className="row">
            <div className="col-lg-3">
              <Label forLabel="nim" title="NIM" data={formDataRef.current.nim} />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="waktu"
                title="Waktu Absen"
                data={formDataRef.current.waktu}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="status"
                title="Status"
                data={formDataRef.current.status}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="float-end my-4 mx-1">
        <Button
          classType="secondary px-4 py-2"
          label="KEMBALI"
          onClick={() => onChangePage("index")}
        />
      </div>
    </>
  );
}
