import { useRef, useState, useEffect } from "react";
import { object, string, number } from "yup";
import { API_LINK } from "../../util/Constants";
import { validateAllInputs, validateInput } from "../../util/ValidateForm";
import SweetAlert from "../../util/SweetAlert";
import UseFetch from "../../util/UseFetch";
import Button from "../../part/Button";
import Input from "../../part/Input";
import Loading from "../../part/Loading";
import Alert from "../../part/Alert";

export default function KendaraanAdd({ onChangePage }) {
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const formDataRef = useRef({
    ken_nomor_rangka: "",
    ken_nomor_mesin: "",
    ken_nomor_plat: "",
    ken_jenis: "",
    ken_model: "",
    ken_warna: "",
    ken_tahun: "",
    ken_status: "Aktif",
  });

  const kendaraanSchema = object({
    ken_nomor_rangka: string()
      .max(30, "maksimum 30 karakter")
      .required("harus diisi"),
    ken_nomor_mesin: string()
      .max(30, "maksimum 30 karakter")
      .required("harus diisi"),
    ken_nomor_plat: string()
      .max(15, "maksimum 15 karakter")
      .required("harus diisi"),
    ken_jenis: number().required("harus diisi"),
    ken_model: string()
      .max(50, "maksimum 50 karakter")
      .required("harus diisi"),
    ken_warna: string()
      .max(10, "maksimum 10 karakter")
      .required("harus diisi"),
    ken_tahun: string()
      .max(4, "maksimum 4 karakter")
      .required("harus diisi"),
    ken_status: string()
      .max(15, "maksimum 15 karakter")
      .required("harus diisi"),
  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    formDataRef.current[name] = value;
    const validationError = await validateInput(name, value, kendaraanSchema);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationError.error,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const validationErrors = await validateAllInputs(
      formDataRef.current,
      kendaraanSchema,
      setErrors
    );

    console.log("Validation errors:", validationErrors);

    if (Object.values(validationErrors).every((error) => !error)) {
      setIsLoading(true);
      setIsError((prevError) => ({ ...prevError, error: false }));
      setErrors({});
      console.log("All inputs are valid, submitting data...");

      try {
        const data = await UseFetch(
          API_LINK + "kendaraan/CreateKendaraan",
          formDataRef.current
        );

        console.log("Response data:", data);

        if (data === "ERROR") {
          throw new Error("An error occurred: Failed to save vehicle data.");
        } else {
          SweetAlert("Success", "Vehicle data has been successfully saved", "success");
          onChangePage("index");
        }
      } catch (error) {
        console.error("Error:", error.message);
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
      <form onSubmit={handleAdd}>
        <div className="card">
          <div className="card-header bg-primary fw-medium text-white">
          Add New Vehicle Data
          </div>
          <div className="card-body p-4">
            <div className="row">
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="ken_nomor_rangka"
                  label="VIN"
                  placeholder="VIN"
                  isRequired
                  value={formDataRef.current.ken_nomor_rangka}
                  onChange={handleInputChange}
                  errorMessage={errors.ken_nomor_rangka}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="ken_nomor_mesin"
                  label="Engine Number"
                  placeholder="Engine Number"
                  isRequired
                  value={formDataRef.current.ken_nomor_mesin}
                  onChange={handleInputChange}
                  errorMessage={errors.ken_nomor_mesin}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="ken_nomor_plat"
                  label="Plate Number"
                  placeholder="License Plate Number"
                  isRequired
                  value={formDataRef.current.ken_nomor_plat}
                  onChange={handleInputChange}
                  errorMessage={errors.ken_nomor_plat}
                />
              </div>
              <div className="col-lg-3">
                <div className='form-group'>
                  <label className="form-label fw-bold">Vehicle Type <span style={{ color: 'red' }}>*</span></label>
                  <div style={{ display: 'flex', border: '1px solid #dee2e6', borderRadius: '15px', overflow: 'hidden', width: '100%' }}>
                    <input
                      type='radio'
                      id='mobil'
                      name='ken_jenis'
                      value='1'
                      checked={formDataRef.current.ken_jenis === '1'}
                      onChange={handleInputChange}
                      style={{ display: 'none' }} // Sembunyikan input radio bawaan
                    />
                    <input
                      type='radio'
                      id='motor'
                      name='ken_jenis'
                      value='2'
                      checked={formDataRef.current.ken_jenis === '2'}
                      onChange={handleInputChange}
                      style={{ display: 'none' }} // Sembunyikan input radio bawaan
                    />
                    <label
                      htmlFor='mobil'
                      style={{
                        flex: '1',
                        textAlign: 'center',
                        padding: '7px 0', // Kurangi padding untuk mengurangi tinggi
                        cursor: 'pointer',
                        backgroundColor: formDataRef.current.ken_jenis === '1' ? 'gray' : 'transparent',
                        color: formDataRef.current.ken_jenis === '1' ? 'white' : 'black',
                        borderRight: '1px solid #dee2e6',
                      }}
                    >
                      Car
                    </label>
                    <label
                      htmlFor='motor'
                      style={{
                        flex: '1',
                        textAlign: 'center',
                        padding: '7px 0', // Kurangi padding untuk mengurangi tinggi
                        cursor: 'pointer',
                        backgroundColor: formDataRef.current.ken_jenis === '2' ? 'gray' : 'transparent',
                        color: formDataRef.current.ken_jenis === '2' ? 'white' : 'black',
                      }}
                    >
                      Motorcycle
                    </label>
                  </div>
                  {errors.ken_jenis && <div style={{ color: 'red' }}>{errors.ken_jenis}</div>}
                </div>
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="ken_model"
                  label="Vehicle Model"
                  placeholder="Vehicle Model"
                  isRequired
                  value={formDataRef.current.ken_model}
                  onChange={handleInputChange}
                  errorMessage={errors.ken_model}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="ken_warna"
                  label="Color"
                  placeholder="Color"
                  isRequired
                  value={formDataRef.current.ken_warna}
                  onChange={handleInputChange}
                  errorMessage={errors.ken_warna}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="text"
                  forInput="ken_tahun"
                  label="Vehicle Age"
                  placeholder="Vehicle Age"
                  isRequired
                  value={formDataRef.current.ken_tahun}
                  onChange={handleInputChange}
                  errorMessage={errors.ken_tahun}
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