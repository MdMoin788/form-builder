import { useState } from "react";
import { FormBuilderProvider, useFormBuilder } from "../../context/FormBuilderContext";
import FieldSelector from "./FieldSelector";
import FormCanvas from "./FormCanvas";
import FieldEditor from "./FieldEditor";
import PreviewForm from "./PreviewForm";
import { saveForm } from "../../data/forms";
import { createForm } from "../../services/api";
import { getLocalStorage } from "../../utils/utils";

const CreateFormInner = () => {
  const { fields } = useFormBuilder();
  
  const [formSettings, setFormSettings] = useState({
    password: "",
    openDate: "",
    closeDate: "",
  });

  const handlePublish = async () => {
    const slug = prompt("Enter form slug (unique identifier):");

    if (!slug) return;

    saveForm({
      slug,
      fields,
      responses: [],
      password: formSettings.password || null,
      schedule: {
        open: formSettings.openDate || null,
        close: formSettings.closeDate || null,
      }
    });
    await createForm({
      slug,
      title:slug,
      userId: getLocalStorage("user", true)?._id,
      fields,
      responses: [],
      password: formSettings.password || null,
      schedule: {
        open: formSettings.openDate || null,
        close: formSettings.closeDate || null,
      }
    })
    saveForm(formSettings);
    alert(`Form published! Access it at /f/${slug}`);
  };

  return (
    <div className="space-y-6 relative">
      <h2 className="text-2xl font-bold">Create Your Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow md:col-span-2">
          <h3 className="font-semibold mb-3">Add Fields</h3>
          <FieldSelector />
        </div>

        <div className="bg-white p-4 rounded shadow md:col-span-2">
          <h3 className="font-semibold mb-3">Form Canvas</h3>
          <FormCanvas />
        </div>
      </div>

      <FieldEditor />

      <div className="mt-10 bg-white p-4 rounded shadow space-y-4">
        <PreviewForm />
        <div className="bg-white p-4 rounded shadow space-y-4 mt-6">
          <h3 className="text-lg font-semibold">Form Settings</h3>

          <input
            type="text"
            placeholder="Form Password (optional)"
            value={formSettings.password}
            onChange={(e) => setFormSettings({ ...formSettings, password: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <div className="space-y-2">
            <label>Schedule (optional)</label>
            <input
              type="date"
              value={formSettings.openDate}
              onChange={(e) => setFormSettings({ ...formSettings, openDate: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              type="date"
              value={formSettings.closeDate}
              onChange={(e) => setFormSettings({ ...formSettings, closeDate: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
        <button
          onClick={handlePublish}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Publish Form
        </button>
      </div>
    </div>
  );
};

const CreateForm = () => {
  return (
    <FormBuilderProvider>
      <CreateFormInner />
    </FormBuilderProvider>
  );
};

export default CreateForm;

// import { FormBuilderProvider } from "../../context/FormBuilderContext";
// import FieldSelector from "./FieldSelector";
// import FormCanvas from "./FormCanvas";
// import FieldEditor from "./FieldEditor";
// import PreviewForm from "./PreviewForm";

// const CreateForm = () => {
//   return (
//     <FormBuilderProvider>
//       <div className="space-y-6 relative">
//         <h2 className="text-2xl font-bold">Create Your Form</h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-4 rounded shadow md:col-span-1">
//             <h3 className="font-semibold mb-3">Add Fields</h3>
//             <FieldSelector />
//           </div>

//           <div className="bg-white p-4 rounded shadow md:col-span-2">
//             <h3 className="font-semibold mb-3">Form Canvas</h3>
//             <FormCanvas />
//           </div>
//         </div>

//         <FieldEditor />
//         <div className="mt-10 bg-white p-4 rounded shadow">
//           <PreviewForm />
//         </div>
//       </div>
//     </FormBuilderProvider>
//   );
// };

// export default CreateForm;
