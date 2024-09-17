import React, { useEffect, useRef } from "react";

function Select2Dropdown({
  arrData,
  type = "pilih",
  label = "",
  forInput,
  isRequired = false,
  isDisabled = false,
  errorMessage,
  showLabel = true,
  onChange,
  ...props
}) {
  const selectRef = useRef(null);

  useEffect(() => {
    const $ = window.$;

    // Initialize Select2 on the select element
    $(selectRef.current).select2();

    // Listen for the change event on the Select2 element
    $(selectRef.current).on("change", (event) => {
      if (onChange) {
        onChange(event);
      }
    });

    return () => {
      // Destroy the Select2 instance when the component unmounts
      $(selectRef.current).select2("destroy");
    };
  }, [onChange]);

  let placeholder = "";

  switch (type) {
    case "pilih":
      placeholder = <option value="">{"-- Choose " + label + " --"}</option>;
      break;
    case "semua":
      placeholder = <option value="">-- Semua --</option>;
      break;
    default:
      break;
  }

  return (
    <div className="mb-3">
      {showLabel && (
        <label htmlFor={forInput} className="form-label fw-bold">
          {label}
          {isRequired ? <span className="text-danger"> *</span> : ""}
          {errorMessage ? (
            <span className="fw-normal text-danger"> {errorMessage}</span>
          ) : (
            ""
          )}
        </label>
      )}
      <select
        id={forInput}
        name={forInput}
        ref={selectRef}
        style={{ width: "100%" }}
        disabled={isDisabled}
        {...props}
      >
        {placeholder}
        {arrData.map((option) => (
          <option key={option.Value} value={option.Value}>
            {option.Text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select2Dropdown;