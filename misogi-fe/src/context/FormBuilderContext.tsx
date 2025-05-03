import React, { createContext, useContext, useState } from "react";

export interface FormField {
  id: string;
  type: "text" | "email" | "number" | "dropdown" | "checkbox" | "rating";
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  conditional?: { fieldId: string; value: string };
}

interface FormBuilderContextProps {
  fields: FormField[];
  selectedFieldId: string | null;
  selectField: (id: string | null) => void;
  addField: (type: FormField["type"]) => void;
  updateField: (id: string, updatedField: Partial<FormField>) => void;
  removeField: (id: string) => void;
  reorderFields: (fields: FormField[]) => void;
}

const FormBuilderContext = createContext<FormBuilderContextProps | null>(null);

export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (!context) throw new Error("useFormBuilder must be used within FormBuilderProvider");
  return context;
};

export const FormBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fields, setFields] = useState<FormField[]>([]);
    const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  
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
      // FIX : pehle selectFieldId set ho raha tha -> ab nahi karenge
    };
  
    const updateField = (id: string, updatedField: Partial<FormField>) => {
      setFields((prev) =>
        prev.map((field) => (field.id === id ? { ...field, ...updatedField } : field))
      );
    };
  
    const removeField = (id: string) => {
      setFields((prev) => prev.filter((field) => field.id !== id));
      if (selectedFieldId === id) setSelectedFieldId(null);
    };
  
    const reorderFields = (updatedFields: FormField[]) => {
      setFields(updatedFields);
    };
  
    const selectField = (id: string | null) => {
      setSelectedFieldId(id);
    };
  
    return (
      <FormBuilderContext.Provider
        value={{
          fields,
          selectedFieldId,
          selectField,
          addField,
          updateField,
          removeField,
          reorderFields,
        }}
      >
        {children}
      </FormBuilderContext.Provider>
    );
  };
  