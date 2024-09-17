import { useEffect, useRef, useState } from "react";
import { object, string } from "yup";
import { API_LINK } from "../../util/Constants";
import { validateAllInputs, validateInput } from "../../util/ValidateForm";
import SweetAlert from "../../util/SweetAlert";
import UseFetch from "../../util/UseFetch";
import Button from "../../part/Button";
import Input from "../../part/Input";
import Loading from "../../part/Loading";
import Alert from "../../part/Alert";

export default function AbsenEdit({ onChangePage, withID }) {
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);

  const formDataRef = useRef({
    idabsen: "",
    nim: "",
    waktu: "",
  });

  const absenSchema = object({
    idabsen: string(),
    nim: string()
      .required("NIM harus diisi"),
    waktu: string()
      .required("Waktu absen harus diisi"),
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsError((prevError) => ({ ...prevError, error: false }));

      try {
        const data = await UseFetch(
          API_LINK + "MasterAbsen/GetDataAbsenById", // Endpoint yang sesuai untuk mengambil data absen
          { id: withID } // Mengirim ID absen sebagai parameter
        );

        if (data === "ERROR" || data.length === 0) {
          throw new Error("Terjadi kesalahan: Gagal mengambil data absen.");
        } else {
          formDataRef.current = { ...formDataRef.current, ...data[0] }; // Mengisi form dengan data dari API
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

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const validationError = await validateInput(name, value, absenSchema);
    formDataRef.current[name] = value;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [validationError.name]: validationError.error,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const validationErrors = await validateAllInputs(
      formDataRef.current,
      absenSchema,
      setErrors
    );

    if (Object.values(validationErrors).every((error) => !error)) {
      setIsLoading(true);
      setIsError((prevError) => ({ ...prevError, error: false }));
      setErrors({});

      try {
        const data = await UseFetch(
          API_LINK + "MasterAbsen/EditAbsen", // Endpoint yang sesuai untuk edit data absen
          formDataRef.current // Mengirim data absen yang akan diupdate
        );

        if (data === "ERROR") {
          throw new Error("Terjadi kesalahan: Gagal mengubah data absen.");
        } else {
          SweetAlert("Sukses", "Data absen berhasil disimpan", "success");
          onChangePage("index"); // Kembali ke halaman index setelah berhasil
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
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {isError.error && (
        <div className="flex-fill">
          <Alert type="danger" message={isError.message} />
        </div>
      )}
      <form onSubmit={handleEdit}>
        <div className="card">
          <div className="card-header bg-primary fw-medium text-white">
            Ubah Data Absen
          </div>
          <div className="card-body p-4">
            <div className="row">
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="nim"
                  label="NIM"
                  isRequired
                  value={formDataRef.current.nim}
                  onChange={handleInputChange}
                  errorMessage={errors.nim}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="datetime-local"
                  forInput="waktu"
                  label="Waktu Absen"
                  isRequired
                  value={formDataRef.current.waktu}
                  onChange={handleInputChange}
                  errorMessage={errors.waktu}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="float-end my-4 mx-1">
          <Button
            classType="secondary me-2 px-4 py-2"
            label="BATAL"
            onClick={() => onChangePage("index")}
          />
          <Button
            classType="primary ms-2 px-4 py-2"
            type="submit"
            label="SIMPAN"
          />
        </div>
      </form>
    </>
  );
}
