import React from "react";

interface Field {
  name: string;
  type: string;
  validation?: string;
  value?: string | number;
  default_value?: string | number;
  min_value?: number;
  max_value?: number;
  options?: string[];
}

interface FormFieldProps {
  field: Field;
  ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}


const FormField = React.memo(({ field, ref, onChange }: FormFieldProps) => {
  const inputStyles = "p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"

  switch (field.type) {
    case "text":
      return (
        <input
          ref={ref}
          name={field.name}
          type="text"
          defaultValue={field.value?.toString() || field.default_value?.toString() || ""}
          pattern={field.validation}
          onChange={onChange}
          className={inputStyles}
        />
      );
    case "number":
      return (
        <input
          ref={ref}
          name={field.name}
          type="number"
          defaultValue={field.value?.toString() || field.default_value?.toString() || ""}
          min={field.min_value}
          max={field.max_value}
          onChange={onChange}
          className={inputStyles}        />
      );
    case "dropdown":
      return (
        <select
          ref={ref}
          name={field.name}
          defaultValue={field.value?.toString() || field.default_value?.toString() || ""}
          onChange={onChange}
          className={inputStyles}        >
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "longtext":
      return (
        <textarea
          ref={ref}
          name={field.name}
          defaultValue={field.value?.toString() || field.default_value?.toString() || ""}
          onChange={onChange}
          className={inputStyles}        />
      );
    default:
      return null;
  }
});

FormField.displayName = "FormField";

export default FormField;
