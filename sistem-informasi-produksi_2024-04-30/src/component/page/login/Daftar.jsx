import { useEffect, useState } from "react";
import { object, string } from "yup";
import { API_LINK } from "../../util/Constants";
import { validateAllInputs, validateInput } from "../../util/ValidateForm";
import SweetAlert from "../../util/SweetAlert";
import UseFetch from "../../util/UseFetch";
import Button from "../../part/Button";
import DropDown from "../../part/Dropdown";
import Input from "../../part/Input";
import Loading from "../../part/Loading";
import Alert from "../../part/Alert";

export default function MasterCustomerAddd({ onChangePage }) {
  const [formData, setFormData] = useState({
    roleId: "",
    userName: "",
    password: "",
    namaLengkap: "",
    alamat: "",
    noHp: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [listRole, setListRole] = useState([]);

  const userSchema = object({
    roleId: string().required("harus diisi"),
    userName: string()
      .max(50, "maksimum 50 karakter")
      .required("harus diisi"),
    password: string()
      .max(50, "maksimum 50 karakter")
      .required("harus diisi"),
    namaLengkap: string().required("harus diisi"),
    alamat: string().required("harus diisi"),
    noHp: string()
      .max(15, "maksimum 15 karakter")
      .required("harus diisi"),
    email: string()
      .max(50, "maksimum 50 karakter")
      .email("format email tidak valid")
      .required("harus diisi"),
  });

  const fetchDataByEndpointAndParams = async (endpoint, params, setter, errorMessage) => {
    setIsError((prevError) => ({ ...prevError, error: false }));
    try {
      const data = await UseFetch(endpoint, params);
      if (data === "ERROR") {
        throw new Error(errorMessage);
      } else {
        setter(data);
      }
    } catch (error) {
      setIsError((prevError) => ({
        ...prevError,
        error: true,
        message: error.message,
      }));
      setter([]);
    }
  };

  useEffect(() => {
    fetchDataByEndpointAndParams(
      API_LINK + "MasterUser/GetListRole",
      {},
      setListRole,
      "Terjadi kesalahan: Gagal mengambil daftar Role."
    );
  }, []);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const validationError = await validateInput(name, value, userSchema);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationError.error,
    }));
  };


const handleAdd = async (e) => {
  e.preventDefault();

  try {
      const data = await UseFetch(API_LINK + "MasterCustomer/CreateCustomer", formData);

      if (Array.isArray(data) && data[0]?.hasil === "ERROR") {
        SweetAlert("Error", "Username Already Existed", "error");
      } else {
          SweetAlert("Sukses", "Data Customer berhasil disimpan", "success");
          onChangePage("index");
      }
  } catch (error) {
      console.error("API Error: ", error);
      setIsError((prevError) => ({
          ...prevError,
          error: true,
          message: error.message,
      }));
  } finally {
      setIsLoading(false);
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
      <form onSubmit={handleAdd}>
        <div className="card">
          <div className="card-header bg-primary fw-medium text-white">
            Tambah Data Customer
          </div>
          <div className="card-body p-4">
            <div className="row">
              <div className="col-lg-3">
                <DropDown
                  forInput="roleId"
                  label="Role"
                  arrData={listRole}
                  value={formData.roleId || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.roleId}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="userName"
                  label="Username"
                  isRequired
                  value={formData.userName || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.userName}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="password"
                  label="Password"
                  isRequired
                  value={formData.password || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.password}
                />
              </div>
              <div className="col-lg-9">
                <Input
                  type="text"
                  forInput="namaLengkap"
                  label="Name"
                  isRequired
                  value={formData.namaLengkap || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.namaLengkap}
                />
              </div>
              <div className="col-lg-9">
                <Input
                  type="text"
                  forInput="alamat"
                  label="Address"
                  isRequired
                  value={formData.alamat || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.alamat}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="noHp"
                  label="Contact Person"
                  value={formData.noHp || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.noHp}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="email"
                  forInput="email"
                  label="Email"
                  isRequired
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.email}
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
            onClick={() => onChangePage("index")}
          />
        </div>
      </form>
    </>
  );
}