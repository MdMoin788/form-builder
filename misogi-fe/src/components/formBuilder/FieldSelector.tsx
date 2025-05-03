import { useFormBuilder } from "../../context/FormBuilderContext";

const fields = [
  { type: "text", label: "Text" },
  { type: "email", label: "Email" },
  { type: "number", label: "Number" },
  { type: "dropdown", label: "Dropdown" },
  { type: "checkbox", label: "Checkbox" },
  { type: "rating", label: "Rating (1-5)" },
];

const FieldSelector = () => {
  const { addField } = useFormBuilder();

  return (
    <div className="space-y-2">
      {fields.map((field) => (
        <div className="flex justify-between border items-center rounded ">
          <span className="ms-2">
            {field.label}
          </span>
          <button
            key={field.type}
            onClick={() => addField(field.type as any)}
            className=" bg-gray-200 hover:bg-gray-300 p-1 cursor-pointer"
          >
            ➕
          </button>
        </div>
      ))}
    </div>
  );
};

export default FieldSelector;
