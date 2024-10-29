export const data = [
  {
    name: "name",
    type: "text",
    default_value: "Jonh",
    value: "",
    validation: "[a-zA-Z]*",
  },
  {
    name: "age",
    type: "number",
    default_value: 10,
    value: 0,
    min_value: 0,
    max_value: 100,
  },
  {
    name: "gender",
    type: "dropdown",
    default_value: "female",
    value: "male",
    options: ["male", "female"],
  },
  {
    name: "description",
    type: "longtext",
    default_value: "default long text",
    value: "long text",
    validation: "[a-zA-Z0-9 ]*",
  }
];