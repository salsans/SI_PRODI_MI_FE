import React, { forwardRef } from 'react';

const Textarea = forwardRef(function Textarea(
  {
    label = "",
    forInput,
    isRequired = false,
    errorMessage,
    ...props
  },
  ref
) {
  return (
    <div className="mb-3">
      {label !== "" && (
        <label htmlFor={forInput} className="form-label fw-bold">
          {label}
          {isRequired ? <span className="text-danger"> *</span> : ""}
          {errorMessage && (
            <span className="fw-normal text-danger"> {errorMessage}</span>
          )}
        </label>
      )}
      <textarea
        id={forInput}
        name={forInput}
        className="form-control"
        ref={ref}
        {...props}
      />
    </div>
  );
});

const RequiredTextarea = forwardRef((props, ref) => (
  <Textarea {...props} isRequired ref={ref} />
));

const OptionalTextarea = forwardRef((props, ref) => (
  <Textarea {...props} isRequired={false} ref={ref} />
));

export { RequiredTextarea, OptionalTextarea };