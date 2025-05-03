// src/hooks/useFormBuilder.ts
import { useState } from "react";

export interface FormField {
  id: string;
  type: "text" | "email" | "number" | "dropdown" | "checkbox" | "rating";
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // Dropdown / checkbox
  conditional?: { fieldId: string; value: string }; // Conditional logic
}

export const useFormBuilder = () => {
  const [fields, setFields] = useState<FormField[]>([]);

  const addField = (type: FormField["type"]) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: "Untitled " + type,
      placeholder: "",
      required: false,
      options: type === "dropdown" || type === "checkbox" ? ["Option 1"] : undefined,
    };
    setFields((prev) => [...prev, newField]);
  };

  const updateField = (id: string, updatedField: Partial<FormField>) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, ...updatedField } : field))
    );
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  const reorderFields = (updatedFields: FormField[]) => {
    setFields(updatedFields);
  };

  return {
    fields,
    addField,
    updateField,
    removeField,
    reorderFields,
  };
};
