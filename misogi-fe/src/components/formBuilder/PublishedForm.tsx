import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  saveResponse } from "../../data/forms";
import { getFormById, saveFormResponse } from "../../services/api";
import IsLoading from "../../screens/IsLoading";

const PublishedForm = () => {
  const { slug, formId } = useParams();
  // const form = getFormBySlug(slug || "");

  const [form, setForm] = useState<any>("")
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [submitLoader, setSubmitLoader] = useState(false)
  const [loader, setLoader] = useState(false)

  const getOpenForm = async () => {
    try {
      setLoader(true)
      const response = await getFormById(formId)
      setForm(response?.data?.data)
      setLoader(false)
    } catch (error) {
      setLoader(false)
    }
  }

  useEffect(() => {
    getOpenForm()
    return () => { }
  }, [])

  if (loader) {
    return <IsLoading />
  }

  if (!form) return <p className="p-6">Form not found!</p>;

  // Schedule check
  const now = new Date();
  const openDate = form.schedule?.open ? new Date(form.schedule.open) : null;
  const closeDate = form.schedule?.close ? new Date(form.schedule.close) : null;

  if (openDate && now < openDate) return <p className="p-6">Form is not yet open.</p>;
  if (closeDate && now > closeDate) return <p className="p-6">Form is closed.</p>;

  // Password check
  if (form.password && enteredPassword !== form.password) {
    return (
      <div className="p-6 space-y-4 max-w-sm mx-auto">
        <p className="font-semibold">🔒 This form is password protected.</p>
        <input
          type="password"
          placeholder="Enter password"
          value={enteredPassword}
          onChange={(e) => setEnteredPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
    );
  }

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const isFieldVisible = (field: any) => {
    if (!field.conditional) return true;
    return answers[field.conditional.fieldId] === field.conditional.value;
  };


  const handleSubmit = () => {
    setSubmitLoader(true)
    saveFormResponse({ formSlug: slug?.trim().toLowerCase(), answers: answers, submittedAt: new Date() })
    saveResponse(slug!, answers);
    setSubmitted(true);
    setSubmitLoader(false)

  };

  if (submitted) {
    return <p className="p-6">🎉 Thank you for submitting the form!</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">📋 Fill the Form</h2>

      {form.fields.map((field: any) =>
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
                {field.options?.map((opt: any, index: number) => (
                  <option key={index} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {field.type === "checkbox" && (
              <div className="space-y-2">
                {field.options?.map((opt: any, index: number) => (
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

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-6"
      >
        {submitLoader ? "Saving..." : "Submit"}
      </button>
    </div>
  );
};

export default PublishedForm;

