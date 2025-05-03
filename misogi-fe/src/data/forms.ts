// --- Forms ---

export const saveForm = (form: any) => {
  const oldForms = JSON.parse(localStorage.getItem("forms") || "[]");
  const updatedForms = [...oldForms, form];
  localStorage.setItem("forms", JSON.stringify(updatedForms));
};

export const getFormBySlug = (slug: string | undefined) => {
  if (!slug) return null;

  const forms = JSON.parse(localStorage.getItem("forms") || "[]");
  return forms.find((form: any) => form.slug === slug);
};

export const getAllForms = () => {
  return JSON.parse(localStorage.getItem("forms") || "[]");
};

// --- Responses ---

export const saveResponse = (slug: string | undefined, answers: { [key: string]: string }) => {
  console.log('slug', slug);
  const normalizedSlug = slug?.trim().toLowerCase();
  if (!normalizedSlug) return;

  const oldResponses = JSON.parse(localStorage.getItem("responses") || "[]");
  const newResponse = { formSlug: normalizedSlug, answers, submittedAt: new Date() };
  const updatedResponses = [...oldResponses, newResponse];
  localStorage.setItem("responses", JSON.stringify(updatedResponses));
};

export const getResponsesBySlug = (slug: string | undefined) => {
  const normalizedSlug = slug?.trim().toLowerCase();
  if (!normalizedSlug) return [];

  const responses = JSON.parse(localStorage.getItem("responses") || "[]");
  return responses.filter((r: any) => r.formSlug === normalizedSlug);
};
