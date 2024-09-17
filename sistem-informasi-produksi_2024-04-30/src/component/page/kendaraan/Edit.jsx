import { useEffect, useState } from "react";
import { object, string, number } from "yup";
import { API_LINK } from "../../util/Constants";
import { validateAllInputs, validateInput } from "../../util/ValidateForm";
import SweetAlert from "../../util/SweetAlert";
import UseFetch from "../../util/UseFetch";
import Button from "../../part/Button";
import DropDown from "../../part/Dropdown";
import Input from "../../part/Input";
import Loading from "../../part/Loading";
import Alert from "../../part/Alert";

export default function KendaraanEdit({ onChangePage, withID }) {
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [listCustomer, setListCustomer] = useState([]);
  const [formData, setFormData] = useState({
    "Id Kendaraan": "",
    "Nomor Rangka": "",
    "Nomor Mesin": "",
    "Nomor Plat": "",
    Jenis: "",
    Model: "",
    Warna: "",
    Tahun: "",
    Status: "Aktif",
    modifiedBy: "rosa",
  });

  // useEffect(() => {
  //   const fetchDataCustomers = async () => {
  //     setIsError({ error: false, message: "" });

  //     try {
  //       const data = await UseFetch(API_LINK + "customer/GetDataCustomer", {});
  //       if (data === "ERROR") {
  //         setIsError({ error: true, message: "Failed to fetch customers" });
  //       } else {
  //         setListCustomer(data);
  //       }
  //     } catch {
  //       setIsError({ error: true, message: "Failed to fetch customers" });
  //     }
  //   };

  //   fetchDataCustomers();
  // }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsError({ error: false, message: "" });
      try {
        const data = await UseFetch(API_LINK + "kendaraan/GetDataKendaraanById", {
          id: withID,
        });
        if (isMounted) {
          if (data === "ERROR" || data.length === 0) {
            throw new Error("Failed to fetch vehicle data by ID");
          } else {
            setFormData((prevData) => ({
              ...prevData,
              ...data[0],
              Jenis: String(data[0].Jenis), // Ensure Jenis is a string
            }));
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
  

  const schema = object({
    "Id Kendaraan": string(),
    Customer: string(),
    "Nomor Rangka": string().required("harus diisi").min(5, "minimum 5 karakter"),
    "Nomor Mesin": string().required("harus diisi").min(5, "minimum 5 karakter"),
    "Nomor Plat": string().required("harus diisi").min(3, "minimum 5 karakter"),
    Jenis: string().required("harus diisi"),
    Model: string().required("harus diisi"),
    Warna: string().required("harus diisi"),
    Tahun: number().required().positive().integer("harus diisi"),
    Status: string(),
    modifiedBy: string(),
  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const validationError = await validateInput(name, value, schema);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationError.error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    const isValid = await validateAllInputs(formData, schema, setErrors);
    console.log('Validation result:', isValid);
    if (Object.values(isValid).every((error) => !error)) {
      setIsLoading(true);
      setIsError({ error: false, message: "" });
      setErrors({});
      try {
        console.log('Sending data to API:', formData); // Add this line
        const result = await UseFetch(API_LINK + "kendaraan/EditKendaraan", formData);
        console.log('API result:', result); // Add this line
        if (result === "ERROR") {
          throw new Error("Failed to update vehicle data");
        } else {
          SweetAlert("Sukses", "Data kendaraan berhasil diubah", "success");
          onChangePage("index");
        }
      } catch (error) {
        setIsError({ error: true, message: error.message });
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
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header bg-primary fw-medium text-white">
            Edit Vehicle Data
          </div>
          <div className="card-body p-4">
            <div className="row">
              <div className="col-lg-6">
                <Input
                  type="text"
                  forInput="Nomor Rangka"
                  label="VIN"
                  isRequired
                  value={formData["Nomor Rangka"] || ""}
                  onChange={handleInputChange}
                  errorMessage={errors["Nomor Rangka"]}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  type="text"
                  forInput="Nomor Mesin"
                  label="Engine Number"
                  isRequired
                  value={formData["Nomor Mesin"] || ""}
                  onChange={handleInputChange}
                  errorMessage={errors["Nomor Mesin"]}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  type="text"
                  forInput="Nomor Plat"
                  label="Plate Number"
                  isRequired
                  value={formData["Nomor Plat"] || ""}
                  onChange={handleInputChange}
                  errorMessage={errors["Nomor Plat"]}
                />
              </div>
              <div className="col-lg-6">
  <div className='form-group'>
    <label className="form-label fw-bold">Vehicle Type <span style={{ color: 'red' }}>*</span></label>
    <div style={{ display: 'flex', border: '1px solid #dee2e6', borderRadius: '15px', overflow: 'hidden', width: '100%' }}>
      <input
        type='radio'
        id='mobil'
        name='Jenis'
        value='1'
        checked={formData.Jenis === '1'}
        onChange={handleInputChange}
        style={{ display: 'none' }} // Hide the default radio input
      />
      <input
        type='radio'
        id='motor'
        name='Jenis'
        value='2'
        checked={formData.Jenis === '2'}
        onChange={handleInputChange}
        style={{ display: 'none' }} // Hide the default radio input
      />
      <label
        htmlFor='mobil'
        style={{
          flex: '1',
          textAlign: 'center',
          padding: '7px 0',
          cursor: 'pointer',
          backgroundColor: formData.Jenis === '1' ? 'gray' : 'transparent',
          color: formData.Jenis === '1' ? 'white' : 'black',
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
          padding: '7px 0',
          cursor: 'pointer',
          backgroundColor: formData.Jenis === '2' ? 'gray' : 'transparent',
          color: formData.Jenis === '2' ? 'white' : 'black',
        }}
      >
        Motorcycle
      </label>
    </div>
    {errors.Jenis && <div style={{ color: 'red' }}>{errors.Jenis}</div>}
  </div>
</div>

              <div className="col-lg-6">
                <Input
                  type="text"
                  forInput="Model"
                  label="Vehicle Model"
                  isRequired
                  value={formData.Model || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.Model}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  type="text"
                  forInput="Warna"
                  label="Color"
                  isRequired
                  value={formData.Warna || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.Warna}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  type="text"
                  forInput="Tahun"
                  label="Vehicle Age"
                  isRequired
                  value={formData.Tahun || ""}
                  onChange={handleInputChange}
                  errorMessage={errors.Tahun}
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
