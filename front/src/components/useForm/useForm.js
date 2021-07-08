import { useState, useEffect } from "react";

export default function useForm(params, validate) {
  const [form, setForm] = useState(params);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    for (const obj of Object.keys(params)) {
      errors[obj] = "";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: { value, type: form[name].type, title: form[name].title },
    });
    let er = errors;
    delete er[name];
    setErrors({ ...er });
  };

  const handleSubmit = (e) => {
    setErrors(validate(form));
    setSubmitting(true);
  };

  const setError = (err) => {
    for (const obj of Object.keys(err)) {
      setErrors({ ...errors, [obj]: err[obj] });
    }
  };

  const setValues = (values) => {
    setForm(values);
  };

  return {
    handleChange,
    form,
    valid,
    handleSubmit,
    errors,
    setError,
    submitting,
    setSubmitting,
    setValues,
  };
}
