import { useEffect, useRef, useState } from "react";
import { API_LINK } from "../../util/Constants";
import UseFetch from "../../util/UseFetch";
import Button from "../../part/Button";
import Label from "../../part/Label";
import Loading from "../../part/Loading";
import Alert from "../../part/Alert";

export default function KendaraanDetail({ onChangePage, withID }) {
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);

  const formDataRef = useRef({
    "Nomor Rangka": "",
    "Nomor Mesin": "",
    "Nomor Plat": "",
    Jenis: "",
    Model: "",
    Warna: "",
    Tahun: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsError((prevError) => ({ ...prevError, error: false }));

      try {
        const data = await UseFetch(API_LINK + "kendaraan/DetailKendaraan", {
          id: withID,
        });

        if (data === "ERROR" || data.length === 0) {
          throw new Error("An error occurred: Failed to retrieve Vehicle data.");
        } else {
          const vehicleData = { ...data[0] };

          // Ubah jenis kendaraan
          vehicleData.Jenis = vehicleData.Jenis === 1 ? "Car" : vehicleData.Jenis === 2 ? "Motorcycle" : "Unknown";

          formDataRef.current = { ...formDataRef.current, ...vehicleData };
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
          Vehicle Details
        </div>
        <div className="card-body p-4">
          <div className="row">
            <div className="col-lg-3">
              <Label
                forLabel="Nomor Rangka"
                title="VIN"
                data={formDataRef.current["Nomor Rangka"]}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="Nomor Mesin"
                title="Engine Number"
                data={formDataRef.current["Nomor Mesin"]}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="Nomor Plat"
                title="Plate Number"
                data={formDataRef.current["Nomor Plat"]}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="Jenis"
                title="Vehicle Type"
                data={formDataRef.current.Jenis}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="Model"
                title="Vehicle Model"
                data={formDataRef.current.Model}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="Warna"
                title="Color"
                data={formDataRef.current.Warna}
              />
            </div>
            <div className="col-lg-3">
              <Label
                forLabel="Tahun"
                title="Vehicle Age"
                data={formDataRef.current.Tahun}
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
