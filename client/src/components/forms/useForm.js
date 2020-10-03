import { useState, useEffect } from "react";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // As a side effect of the value of errors changing, check if the errors object contains any keys (if it’s empty) and if so, call the callback (submit form) function.
  useEffect(() => {
    // console.log("errors changed: ", errors);
    if (Object.keys(errors).length === 0 && isSubmitting) {
      console.log("no errors");
      callback();
    }
  }, [errors]);

  // just for testing
  // useEffect(() => {
  //   console.log("values changed: ", values);
  // }, [values]);

  const initVals = (vals) => {
    console.log("vals: ", vals);
    Object.keys(vals).forEach((key) => {
      setValues((values) => ({
        ...values,
        [key]: vals[key],
      }));
    });
  };

  const handleClear = (fName) => {
    console.log("x clicked");
    setValues((values) => ({
      ...values,
      [fName]: "",
    }));
  };

  const handleChange = (event) => {
    // console.log("event target: ", event.target);
    event.persist && event.persist();
    setIsSubmitting(false);
    let n = event.target.name;
    // console.log("n: ", n);
    let newErrState = errors;
    delete newErrState[n];
    // console.log("newErrState: ", newErrState);
    setErrors(newErrState);
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    // console.log("handleChange called, values: ", values);
  };

  const handleDDChange = (n, val) => {
    setIsSubmitting(false);
    var errs = errors;
    // console.log("errs: ", errs);
    // console.log("n: ", n);
    delete errs[n];
    // console.log("val: ", val);
    setValues((values) => ({
      ...values,
      [n]: val,
    }));
    // console.log("handleDDChange called, values: ", values);
  };

  const handleSubmit = (event) => {
    console.log("handlesubmit called");
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const resetForm = () => {
    setValues({});
    setErrors({});
  };

  return {
    handleChange,
    handleDDChange,
    handleSubmit,
    values,
    setValues,
    errors,
    resetForm,
    initVals,
    handleClear,
  };
};

export default useForm;
