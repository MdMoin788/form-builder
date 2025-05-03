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
    <div className="space-y-3">
      {fields.map((field) => (
        <button
          key={field.type}
          onClick={() => addField(field.type as any)}
          className="w-full bg-gray-200 hover:bg-gray-300 rounded p-2 text-left"
        >
          ➕ {field.label}
        </button>
      ))}
    </div>
  );
};

export default FieldSelector;
