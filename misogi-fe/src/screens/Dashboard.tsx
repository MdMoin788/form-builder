import { useEffect, useState } from "react";
// import { getAllForms } from "../data/forms";
import { Link } from "react-router-dom";
import { getAllForms } from "../services/api";
import IsLoading from "./IsLoading";

const Dashboard = () => {
  // const forms = getAllForms()?.filter((ele: any) => ele?.slug != undefined);
  const [formData, setFormData] = useState([])
  console.log('formData', formData);
  const [loader, setLoader] = useState(false)
  const getForms = async () => {
    setLoader(true)
    const response = await getAllForms()
    console.log('response', response?.data?.data);
    setFormData(response?.data?.data || [])
    setLoader(false)
  }
  useEffect(() => { getForms() }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Published Forms</h2>

      {formData?.length === 0 && <p>No forms published yet.</p>}

      <div className="space-y-4">
        {
          loader ? <IsLoading /> :
            formData?.map((form: any) => (
              <div
                key={form.slug}
                className="p-4 bg-white rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{form.slug}</p>
                  <p className="text-sm text-gray-500">/{form.slug}</p>
                </div>

                <div className="space-x-4">
                  <Link
                    to={`/f/${form.slug}/${form?._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Open Form
                  </Link>
                  <Link
                    to={`/responses/${form.slug}/${form?._id}`}
                    className="text-green-500 hover:underline"
                  >
                    View Responses
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
