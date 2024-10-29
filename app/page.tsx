'use client';
import React, { useEffect, useState, FormEvent, useRef } from "react";
import { data } from "./data/data";
import FormResult from "./components/FormResult";
import FormField from "./components/FormField"; // импортируем компонент

interface FormData {
  [key: string]: string | number | undefined;
}

export default function Home() {
  const [result, setResult] = useState<FormData>({});
  const refs = useRef<{ [key: string]: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null }>({});

  useEffect(() => {
    data.forEach((item) => {
      if (item.type === "longtext") {
        const input = refs.current[item.name];
        if (input) {
          input.addEventListener("input", () => input.setCustomValidity(""));
        }
      }
    });
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries()) as { [key: string]: string };

    data.forEach((item) => {
      if (item.type === "longtext") {
        const regex = new RegExp("^" + item.validation + "$");
        const isValid = regex.test(formJson[item.name] || "");
        const input = refs.current[item.name];

        if (input) {
          if (!isValid) {
            input.setCustomValidity("invalid");
          } else {
            input.setCustomValidity("");
          }
          input.reportValidity();
        } else {
          console.warn(`Element with name "${item.name}" is not found.`);
        }
      }
    });

    if (form.checkValidity()) {
      setResult(formJson);
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
              ref={(el) => (refs.current[item.name] = el)}
              onChange={() => refs.current[item.name]?.setCustomValidity("")}
            />
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
