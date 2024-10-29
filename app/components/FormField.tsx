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
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

const FormField = React.memo(({ field, value, onChange }: FormFieldProps) => {
  const commonProps = {
    name: field.name,
    value: value ?? "",
    onChange,
    className:
      "p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500",
  };

  switch (field.type) {
    case "text":
      return <input {...commonProps} type="text" pattern={field.validation} />;
    case "number":
      return (
        <input
          {...commonProps}
          type="number"
          min={field.min_value}
          max={field.max_value}
        />
      );
    case "dropdown":
      return (
        <select {...commonProps}>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "longtext":
      return <textarea {...commonProps} />;
    default:
      return null;
  }
});

FormField.displayName = "FormField";

export default FormField;
