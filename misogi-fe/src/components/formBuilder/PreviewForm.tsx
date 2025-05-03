import  { useState } from "react";
import { useFormBuilder } from "../../context/FormBuilderContext";

const PreviewForm = () => {
  const { fields } = useFormBuilder();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const isFieldVisible = (field: any) => {
    if (!field.conditional) return true;

    const targetValue = answers[field.conditional.fieldId];

    // Simple match
    return targetValue === field.conditional.value;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Form Preview</h2>

      {fields.map((field) =>
        isFieldVisible(field) ? (
          <div key={field.id} className="space-y-2">
            <label className="block font-semibold">{field.label}</label>

            {field.type === "text" ||
            field.type === "email" ||
            field.type === "number" ? (
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={answers[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full border rounded p-2"
              />
            ) : null}

            {field.type === "dropdown" && (
              <select
                value={answers[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="">Select...</option>
                {field.options?.map((opt, index) => (
                  <option key={index} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {field.type === "checkbox" && (
              <div className="space-y-2">
                {field.options?.map((opt, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={(answers[field.id] ?? "").split(",").includes(opt)}
                      onChange={(e) => {
                        const current = (answers[field.id] ?? "").split(",").filter(Boolean);
                        if (e.target.checked) current.push(opt);
                        else current.splice(current.indexOf(opt), 1);
                        handleChange(field.id, current.join(","));
                      }}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ) : null
      )}
    </div>
  );
};

export default PreviewForm;
