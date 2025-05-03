import  { useState, useEffect } from "react";
import { useFormBuilder } from "../../context/FormBuilderContext";

const FieldEditor = () => {
  const { fields, selectedFieldId, updateField, selectField } = useFormBuilder();

  const field = fields.find((f) => f.id === selectedFieldId);

  const [localField, setLocalField] = useState<any>(null);

  useEffect(() => {
    if (field) {
      setLocalField(field);
    }
  }, [field]);

  if (!field || !localField) return null;

  const handleSave = () => {
    updateField(field.id, localField);
    selectField(null); // close editor
  };

  const handleChange = (key: string, value: any) => {
    setLocalField((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="fixed right-0 top-0 w-full md:w-[400px] h-full bg-white border-l shadow-lg p-6 space-y-4 overflow-y-auto z-50">
      <h3 className="text-xl font-bold">Edit Field</h3>

      <div>
        <label className="block font-semibold mb-1">Label</label>
        <input
          type="text"
          value={localField.label}
          onChange={(e) => handleChange("label", e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Placeholder</label>
        <input
          type="text"
          value={localField.placeholder}
          onChange={(e) => handleChange("placeholder", e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={localField.required}
          onChange={(e) => handleChange("required", e.target.checked)}
        />
        <label>Required</label>
      </div>

      {(localField.type === "dropdown" || localField.type === "checkbox") && (
        <div>
          <label className="block font-semibold mb-1">Options</label>
          {localField.options?.map((opt: any, index: number) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={opt}
                onChange={(e) => {
                  const updatedOptions = [...(localField.options ?? [])];
                  updatedOptions[index] = e.target.value;
                  handleChange("options", updatedOptions);
                }}
                className="w-full border rounded p-2"
              />
              <button
                onClick={() => {
                  const updatedOptions = localField.options?.filter((_: any, i: number) => i !== index);
                  handleChange("options", updatedOptions);
                }}
                className="text-red-500"
              >
                ❌
              </button>
            </div>
          ))}
          <button
            onClick={() => handleChange("options", [...(localField.options ?? []), "New Option"])}
            className="text-sm text-blue-500"
          >
            ➕ Add Option
          </button>
        </div>
      )}

      {/* Conditional Logic */}
      <div>
        <label className="block font-semibold mb-1">Conditional Logic</label>
        <select
          value={localField.conditional?.fieldId || ""}
          onChange={(e) => {
            const val = e.target.value;
            handleChange("conditional", val ? { fieldId: val, value: "" } : undefined);
          }}
          className="w-full border rounded p-2 mb-2"
        >
          <option value="">No Condition</option>
          {fields
            .filter((f) => f.id !== localField.id)
            .map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
        </select>

        {localField.conditional?.fieldId && (
          <input
            type="text"
            placeholder="Value to match"
            value={localField.conditional?.value || ""}
            onChange={(e) =>
              handleChange("conditional", {
                fieldId: localField.conditional?.fieldId!,
                value: e.target.value,
              })
            }
            className="w-full border rounded p-2"
          />
        )}
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <button
          onClick={() => selectField(null)}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FieldEditor;
