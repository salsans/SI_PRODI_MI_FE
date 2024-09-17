import { useRef, useState } from "react";
import * as yup from "yup";
import Cookies from "js-cookie";
import { API_LINK, APPLICATION_NAME } from "../../util/Constants";
import { validateAllInputs, validateInput } from "../../util/ValidateForm";
import { encryptId } from "../../util/Encryptor";
import logo from "../../../assets/IMG_Logo.png";
import UseFetch from "../../util/UseFetch";
import Button from "../../part/Button";
import Input from "../../part/Input";
import Loading from "../../part/Loading";
import Alert from "../../part/Alert";
import Modal from "../../part/Modal";
import SweetAlert from "../../util/SweetAlert";
import DropDown from "../../part/Dropdown";

export default function Login({ onChangePage }) {
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [listRole, setListRole] = useState([]);
  const [isSignUp, setIsSignUp] = useState(false);


  const formDataRef = useRef({
    username: "",
    password: "",
  });

  const signUpDataRef = useRef({
    userName: "",
    pw: "",
    namaLengkap: "",
    alamat: "",
    noHp: "",
    email: "",
  });

  const modalRef = useRef();
  const signUpModalRef = useRef();

  const userSchema = yup.object({
    username: yup.string().max(50, "maksimum 50 karakter").required("harus diisi"),
    password: yup.string().required("harus diisi"),
  });

  const signUpSchema = yup.object({
    userName: yup.string().max(50, "maksimum 50 karakter").required("harus diisi"),
    pw: yup.string().required("harus diisi"),
    namaLengkap: yup.string().required("harus diisi"),
    alamat: yup.string().required("harus diisi"),
    noHp: yup.string().max(15, "maksimum 15 karakter").required("harus diisi"),
    email: yup.string()
      .max(50, "maksimum 50 karakter")
      .email("format email tidak valid")
      .required("harus diisi"),
  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const validationError = await validateInput(name, value, userSchema);
    formDataRef.current[name] = value;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [validationError.name]: validationError.error,
    }));
  };

  const handleSignUpInputChange = async (e) => {
    const { name, value } = e.target;
    const validationError = await validateInput(name, value, signUpSchema);
    signUpDataRef.current[name] = value;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [validationError.name]: validationError.error,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const validationErrors = await validateAllInputs(
      formDataRef.current,
      userSchema,
      setErrors
    );

    if (Object.values(validationErrors).every((error) => !error)) {
      setIsLoading(true);
      setIsError((prevError) => {
        return { ...prevError, error: false };
      });
      setErrors({});

      try {
        const data = await UseFetch(
          API_LINK + "Utilities/Login",
          formDataRef.current
        );

        if (data === "ERROR")
          throw new Error("Terjadi kesalahan: Gagal melakukan autentikasi.");
        else if (data.Status && data.Status === "LOGIN FAILED")
          throw new Error("Username or password is wrong.");
        else {
          setListRole(data);
          modalRef.current.open();
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

  const handleSignUp = async (e) => {
    e.preventDefault();

    const validationErrors = await validateAllInputs(
      signUpDataRef.current,
      signUpSchema,
      setErrors
    );

    if (Object.values(validationErrors).every((error) => !error)) {
      setIsLoading(true);
      setIsError((prevError) => {
        return { ...prevError, error: false };
      });
      setErrors({});

      try {
        const data = await UseFetch(
          API_LINK + "MasterCustomer/CreateCustomer",
          signUpDataRef.current
        );

        if (data === "ERROR")
          throw new Error("Terjadi kesalahan: Gagal melakukan pendaftaran.");
        else {
          setIsSignUp(false);
          SweetAlert("Sukses", "Customer Data Created Successfully", "success");
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

  function handleLoginWithRole(role, nama, peran) {
    const userInfo = {
      username: formDataRef.current.username,
      role: role,
      nama: nama,
      peran: peran,
    };
    let user = encryptId(JSON.stringify(userInfo));
    Cookies.set("activeUser", user, { expires: 1 });
    window.location.href = "/";
  }

  if (Cookies.get("activeUser")) window.location.href = "/";
  else {
    return (
      <>
        {isLoading && <Loading />}
        {isError.error && (
          <div className="flex-fill m-3">
            <Alert type="danger" message={isError.message} />
          </div>
        )}
        <Modal title="Select Role" ref={modalRef} size="small">
          <div className="list-group">
            {listRole.map((value, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  className="list-group-item list-group-item-action"
                  aria-current="true"
                  onClick={() =>
                    handleLoginWithRole(value.RoleID, value.Nama, value.Role)
                  }
                >
                  Login as {value.Role}
                </button>
              );
            })}
          </div>
        </Modal>
        <Modal title="Sign Up" ref={signUpModalRef} size="small">
          <form onSubmit={handleSignUp}>
          <div className="row">
                <div className="col-lg-6">
                <Input
                  type="text"
                  forInput="userName"
                  label="Username"
                  isRequired
                  value={signUpDataRef.current.userName || ""}
                  onChange={handleSignUpInputChange}
                  errorMessage={errors.userName}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  type="text"
                  forInput="pw"
                  label="Password"
                  isRequired
                  value={signUpDataRef.current.pw || ""}
                  onChange={handleSignUpInputChange}
                  errorMessage={errors.pw}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  type="text"
                  forInput="namaLengkap"
                  label="Name"
                  isRequired
                  value={signUpDataRef.current.namaLengkap || ""}
                  onChange={handleSignUpInputChange}
                  errorMessage={errors.namaLengkap}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  type="text"
                  forInput="alamat"
                  label="Address"
                  isRequired
                  value={signUpDataRef.current.alamat || ""}
                  onChange={handleSignUpInputChange}
                  errorMessage={errors.alamat}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  type="text"
                  forInput="noHp"
                  label="Contact Person"
                  isRequired
                  value={signUpDataRef.current.noHp || ""}
                  onChange={handleSignUpInputChange}
                  errorMessage={errors.noHp}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  type="email"
                  forInput="email"
                  label="Email"
                  isRequired
                  value={signUpDataRef.current.email || ""}
                  onChange={handleSignUpInputChange}
                  errorMessage={errors.email}
                />
              </div>
              </div>
            <Button
              classType="primary my-3 w-100"
              type="submit"
              label="Sign Up"
            />
          </form>
        </Modal>
        <form onSubmit={handleAdd}>
          <div
            className="container-fluid d-flex justify-content-center align-items-center flex-column"
            style={{ height: "70vh" }}
          >
            <div
              className="card w-50"
              style={{ minWidth: "360px", maxWidth: "500px" }}
            >
              <div className="card-body p-4 text-center">
                <img
                  src={logo}
                  alt="Logo AstraTech"
                  className="w-100 px-4 py-4"
                />
                <p className="lead fw-medium fs-5 text-nowrap">
                  {APPLICATION_NAME.toUpperCase()}
                </p>
                <div style={{ textAlign: "left" }}>
                  <div className="py-2 px-1">
                    <Input
                      type="text"
                      forInput="username"
                      placeholder="Nama Akun"
                      isRequired
                      value={formDataRef.current.username}
                      onChange={handleInputChange}
                      errorMessage={errors.username}
                    />
                  </div>
                  <div className="py-2 px-1">
                    <Input
                      type="password"
                      forInput="password"
                      placeholder="Kata Sandi"
                      isRequired
                      value={formDataRef.current.password}
                      onChange={handleInputChange}
                      errorMessage={errors.password}
                    />
                  </div>
                  <Button
                    classType="primary my-3 w-100"
                    type="submit"
                    label="Login"
                  />
                </div>
              </div>
            </div>
            <Button
              customClass="btn-text-only mt-1"
              label="Don't have an account? Sign up here"
              onClick={() => signUpModalRef.current.open()}
            />
          </div>
          <div className="fixed-bottom p-3 text-center bg-white">
            Copyright &copy; 2024 - PSI Politeknik Astra
          </div>
        </form>
      </>
    );
  }
}
