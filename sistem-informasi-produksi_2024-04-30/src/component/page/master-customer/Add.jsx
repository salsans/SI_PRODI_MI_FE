import { useEffect, useState } from "react";
import { object, string } from "yup";
import { API_LINK } from "../../util/Constants";
import { validateAllInputs, validateInput } from "../../util/ValidateForm";
import SweetAlert from "../../util/SweetAlert";
import UseFetch from "../../util/UseFetch";
import Button from "../../part/Button";
import Input from "../../part/Input";
import Loading from "../../part/Loading";
import Alert from "../../part/Alert";
import { RequiredTextarea } from "../../part/TextArea";

export default function MasterCustomerAddd({ onChangePage }) {
  const [formData, setFormData] = useState({
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

  const userSchema = object({
    userName: string()
      .max(50, "Maximum 50 characters")
      .required("Required"),
    password: string()
      .max(50, "Maximum 50 characters")
      .required("Required"),
    namaLengkap: string().required("Required"),
    alamat: string().required("Required"),
    noHp: string()
      .max(15, "Maximum 15 characters")
      .required("Required"),
    email: string()
      .max(50, "Maximum 50 characters")
      .email("Invalid email format")
      .required("Required"),
  });

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
    setIsLoading(true);

    const validationErrors = await validateAllInputs(formData, userSchema, setErrors);

    if (Object.values(validationErrors).every((error) => !error)) {
      setIsError((prevError) => ({ ...prevError, error: false }));

      const dataToSend = {
        ...formData,
        roleId: "ROL04", 
      };

      try {
        const data = await UseFetch(API_LINK + "MasterCustomer/CreateCustomer", dataToSend);

        if (Array.isArray(data) && data[0]?.result === "ERROR") {
          SweetAlert("Error", "Username Already Existed", "error");
        } else {
          SweetAlert("Success", "Customer data saved successfully", "success");
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
    } else {
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
            Add Customer Data
          </div>
          <div className="card-body p-4">
            <div className="row">
              <div className="col-lg-4">
                <Input
                  type="text"
                  forInput="userName"
                  label="Username"
                  placeHolder="Username"
                  isRequired
                  value={formData.userName || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.userName}
                />
              </div>
              <div className="col-lg-4">
                <Input
                  type="text"
                  forInput="password"
                  label="Password"
                  placeHolder="Password"
                  isRequired
                  value={formData.password || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.password}
                />
              </div>
              <div className="col-lg-4">
                <Input
                  type="text"
                  forInput="namaLengkap"
                  label="Full Name"
                  placeHolder="Full Name"
                  isRequired
                  value={formData.namaLengkap || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.namaLengkap}
                />
              </div>
              <div className="col-lg-4">
                <RequiredTextarea
                  forInput="alamat"
                  label="Address"
                  placeHolder="Address"
                  isRequired
                  value={formData.alamat || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.alamat}
                />
              </div>
              <div className="col-lg-4">
                <Input
                  type="text"
                  forInput="noHp"
                  label="Contact Person"
                  placeHolder="Contact Person"
                  value={formData.noHp || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.noHp}
                />
              </div>
              <div className="col-lg-4">
                <Input
                  type="email"
                  forInput="email"
                  label="Email"
                  placeHolder="Email"
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
