"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { data } from "./data/data";
import FormResult from "./components/FormResult";
import FormField from "./components/FormField";

interface FormData {
  [key: string]: string | number | undefined;
}

export default function Home() {
  const [formValues, setFormValues] = useState<FormData>({});
  const [result, setResult] = useState<FormData>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const initialFormValues: FormData = {};
    data.forEach((item) => {
      initialFormValues[item.name] = item.value || item.default_value || "";
    });
    setFormValues(initialFormValues);
  }, []);

  function validateField(name: string, value: string) {
    const field = data.find((item) => item.name === name);
    if (field?.type === "longtext" && field.validation) {
      const regex = new RegExp("^" + field.validation + "$");
      return regex.test(value) ? "" : "invalid";
    }
    return "";
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));

    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formErrors: { [key: string]: string } = {};
    data.forEach((item) => {
      const error = validateField(item.name, formValues[item.name] as string);
      if (error) formErrors[item.name] = error;
    });

    if (Object.keys(formErrors).length === 0) {
      setResult(formValues);
    } else {
      setErrors(formErrors);
    }
  }

  return (
    <div className="flex w-full h-full items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        {data.map((item) => (
          <div key={item.name} className="flex flex-col space-y-1">
            <label className="text-gray-700 font-semibold">{item.name}</label>
            <FormField
              field={item}
              value={formValues[item.name] as string}
              onChange={handleChange}
            />
            {errors[item.name] && (
              <span className="text-red-500">{errors[item.name]}</span>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full p-2 mt-4 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          Submit form
        </button>
      </form>

      <div className="ml-6">
        {Object.keys(result).length > 0 && <FormResult result={result} />}
      </div>
    </div>
  );
}
