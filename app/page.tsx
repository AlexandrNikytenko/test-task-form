"use client";

import { useEffect, useState, FormEvent } from "react";
import { data } from "./data/data";
import FormResult from "./components/FormResult";

interface FormData {
  [key: string]: string | number | undefined;
}

export default function Home() {
  const [result, setResult] = useState<FormData>({});

  useEffect(() => {
    data.forEach((item) => {
      if (item.type === "longtext") {
        const input = document.getElementsByName(item.name)[0];
        if (
          input instanceof HTMLInputElement ||
          input instanceof HTMLTextAreaElement
        ) {
          input.addEventListener("input", () => input.setCustomValidity(""));
        }
      }
    });
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries()) as {
      [key: string]: string;
    };

    data.forEach((item) => {
      if (item.type === "longtext") {
        const regex = new RegExp("^" + item.validation + "$");
        const isValid = regex.test(formJson[item.name] || "");
        const input = document.getElementsByName(item.name)[0];

        if (
          input instanceof HTMLInputElement ||
          input instanceof HTMLTextAreaElement
        ) {
          console.log("here textarea", item);
          if (!isValid) {
            input.setCustomValidity("invalid");
          } else {
            input.setCustomValidity("");
          }
          input.reportValidity();
        } else {
          console.warn(
            `Element with name "${item.name}" is not an input or textarea.`
          );
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
            {item.type === "text" && (
              <input
                name={item.name}
                type="text"
                pattern={item.validation}
                defaultValue={
                  item.value?.toString() || item.default_value?.toString() || ""
                }
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
            {item.type === "number" && (
              <input
                name={item.name}
                type="number"
                defaultValue={
                  item.value?.toString() || item.default_value?.toString() || ""
                }
                min={item.min_value}
                max={item.max_value}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
            {item.type === "dropdown" && (
              <select
                name={item.name}
                defaultValue={
                  item.value?.toString() || item.default_value?.toString() || ""
                }
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {item.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {item.type === "longtext" && (
              <textarea
                name={item.name}
                defaultValue={
                  item.value?.toString() || item.default_value?.toString() || ""
                }
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
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
