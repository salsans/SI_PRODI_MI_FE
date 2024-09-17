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

export default function MasterUserEdit({ onChangePage, withID }) {
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [listRole, setListRole] = useState([]);
  const [formData, setFormData] = useState({
    "Id User": "",
    Role: "",
    Username: "",
    "Nama Lengkap": "",
    Alamat: "",
    NoHp: "",
    Email: "",
    Password: "",
    Status: "aktif",
    modifiedBy: "emil",
  });

  useEffect(() => {
    const fetchDataRoles = async () => {
      setIsError({ error: false, message: "" });
      try {
        const data = await UseFetch(API_LINK + "MasterUser/GetListRole", {});
        if (data === "ERROR") {
          throw new Error("An error occurred: Failed to retrieve the list of roles.");
        } else {
          setListRole(data);
        }
      } catch (error) {
        setIsError({ error: true, message: error.message });
        setListRole([]);
      }
    };

    fetchDataRoles();
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsError({ error: false, message: "" });
      try {
        const data = await UseFetch(API_LINK + "MasterUser/GetDataUserById", {
          id: withID
        });
        if (isMounted) {
          if (data === "ERROR" || data.length === 0) {
            throw new Error("An error occurred: Failed to retrieve role by id.");
          } else {
            setFormData({ ...formData, ...data[0] });
          }
        }
      } catch (error) {
        if (isMounted) {
          setIsError({ error: true, message: error.message });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [withID]);

  const userSchema = object({
    "Id User": string(),
    Role: string(),
    Username: string()
      .max(50, "maksimum 50 karakter")
      .required("harus diisi"),
    "Nama Lengkap": string().required("harus diisi"),
    Alamat: string().required("harus diisi"),
    NoHp: string()
      .max(15, "maksimum 15 karakter")
      .required("harus diisi"),
    Email: string()
      .max(50, "maksimum 50 karakter")
      .email("format email tidak valid")
      .required("harus diisi"),
    Password: string()
      .max(50, "maksimum 50 karakter")
      .required("harus diisi"),
    Status: string(),
    modifiedBy: string(),
  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const validationError = await validateInput(name, value, userSchema);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationError.error,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log("Form submission started");
    const validationErrors = await validateAllInputs(formData, userSchema, setErrors);
    if (Object.values(validationErrors).every((error) => !error)) {
      setIsLoading(true);
      setIsError({ error: false, message: "" });
      setErrors({});
      try {
        console.log("Submitting data:", formData);
        const data = await UseFetch(`${API_LINK}MasterUser/EditUser`, formData);
        if (data === "ERROR") {
          throw new Error("Terjadi kesalahan: Gagal menyimpan data user.");
        } else {
          SweetAlert("Sukses", "User Data Updated Successfully", "success");
          onChangePage("index");
        }
      } catch (error) {
        setIsError({ error: true, message: error.message });
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Validation errors:", validationErrors);
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
            Edit User Data
          </div>
          <div className="card-body p-4">
            <div className="row">
              <div className="col-lg-4">
                <DropDown
                  forInput="Role"
                  label="Role"
                  arrData={listRole}
                  value={formData.Role || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.Role}
                />
              </div>
              <div className="col-lg-4">
                <Input
                  type="text"
                  forInput="Username"
                  label="Username"
                  isRequired
                  value={formData.Username || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.Username}
                />
              </div>
              <div className="col-lg-4">
                <Input
                  type="text"
                  forInput="Password"
                  label="Password"
                  isRequired
                  value={formData.Password || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.Password}
                />
              </div>
              <div className="col-lg-4">
                <Input
                  type="text"
                  forInput="Nama Lengkap"
                  label="Full Name"
                  isRequired
                  value={formData["Nama Lengkap"] || ""}
                  onChange={handleInputChange}
                  errorMessage={errors["Nama Lengkap"]}
                />
              </div>
              <div className="col-lg-4">
                <Input
                  type="text"
                  forInput="Alamat"
                  label="Alamat"
                  isRequired
                  value={formData.Alamat || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.Alamat}
                />
              </div>
              <div className="col-lg-4">
                <Input
                  type="text"
                  forInput="NoHp"
                  label="Contact Person"
                  value={formData.NoHp || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.NoHp}
                />
              </div>
              <div className="col-lg-4">
                <Input
                  type="email"
                  forInput="Email"
                  label="Email"
                  isRequired
                  value={formData.Email || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.Email}
                />
              </div>
              
            </div>
          </div>
        </div>
        <div className="float-end my-4 mx-1">
          <Button
            classType="secondary me-2 px-4 py-2"
            label="CANCEL"
            onClick={() => onChangePage("index")}
          />
          <Button
            classType="primary ms-2 px-4 py-2"
            type="submit"
            label="SAVE"
          />
        </div>
      </form>
    </>
  );
}
