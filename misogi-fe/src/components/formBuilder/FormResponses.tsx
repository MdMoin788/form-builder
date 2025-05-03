import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormBySlug,} from "../../data/forms";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement } from "chart.js";
import IsLoading from "../../screens/IsLoading";
import { getAllformResponsesByFormId } from "../../services/api";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement);

const FormResponses = () => {
  const { slug ,formId} = useParams();
  const form = getFormBySlug(slug || "");
  // const slugString = slug ?? "";
  // const allResponses = getResponsesBySlug(slugString);
  const [allResponses, setAllResponses] = useState([])
   const [loader, setLoader] = useState(false)
 
   const getOpenForm = async () => {
     try {
       setLoader(true)
       const response = await getAllformResponsesByFormId(formId)
       setAllResponses(response?.data?.data)
       setLoader(false)
     } catch (error) {
       setLoader(false)
     }
   }
 
   useEffect(() => {
     getOpenForm()
     return () => { }
   }, [])
  
  
  const [dateFilter, setDateFilter] = useState({
    from: "",
    to: "",
  });

  if (loader) {
    return <IsLoading />
  }
  if (!form) return <p className="p-6">Form not found!</p>;

  const filteredResponses = allResponses.filter((res: any) => {
    const submittedAt = new Date(res.submittedAt);
    const fromDate = dateFilter.from ? new Date(dateFilter.from) : null;
    const toDate = dateFilter.to ? new Date(dateFilter.to) : null;

    if (fromDate && submittedAt < fromDate) return false;
    if (toDate && submittedAt > toDate) return false;

    return true;
  });

  const exportCSV = () => {
    const csvRows = [];

    const headers = ["Submitted At", ...form.fields.map((f: any) => f.label)];
    csvRows.push(headers.join(","));

    filteredResponses.forEach((response: any) => {
      const row = [
        response.submittedAt,
        ...form.fields.map((f: any) => `"${response.answers[f.id] ?? ""}"`),
      ];
      csvRows.push(row.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `${slug}-responses.csv`);
    a.click();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Responses Analytics → "{form.slug}"</h2>
      <div className="space-x-4 mb-6">
        <input
          type="date"
          value={dateFilter.from}
          onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })}
          className="border p-2 rounded mb-2"
        />
        <input
          type="date"
          value={dateFilter.to}
          onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
          className="border p-2 rounded mb-2"
        />
        <button
          onClick={exportCSV}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export CSV
        </button>
      </div>

      {form.fields.map((field: any) => {
        const fieldResponses = filteredResponses.map((res: any) => res.answers[field.id]).filter(Boolean);

        if (field.type === "dropdown" || field.type === "checkbox") {
          const counts: Record<string, number> = {};

          fieldResponses.forEach((resp: any) => {
            const values = field.type === "checkbox" ? resp.split(",") : [resp];
            values.forEach((val: string) => {
              counts[val] = (counts[val] ?? 0) + 1;
            });
          });

          const labels = Object.keys(counts);
          const data = Object.values(counts);

          return (
            <div key={field.id} className="space-y-6 mt-6">
              <h4 className="font-semibold">{field.label} (Bar Chart)</h4>
              <Bar
                data={{
                  labels,
                  datasets: [
                    {
                      label: "Responses",
                      data,
                      backgroundColor: "#3b82f6",
                    },
                  ],
                }}
              />

              <h4 className="font-semibold mt-4">{field.label} (Pie Chart)</h4>
              <Pie
                data={{
                  labels,
                  datasets: [
                    {
                      label: "Responses",
                      data,
                      backgroundColor: ["#3b82f6", "#f59e0b", "#ef4444", "#10b981"],
                    },
                  ],
                }}
              />
            </div>
          );
        }

        // return (
        //   <div key={field.id} className="space-y-2 mt-6">
        //     <h4 className="font-semibold">{field.label} (Responses)</h4>
        //     {fieldResponses.length === 0 && <p>No responses</p>}
        //     {fieldResponses.map((resp: any, index: number) => (
        //       <p key={index} className="bg-gray-100 p-2 rounded">{resp}</p>
        //     ))}
        //   </div>
        // );
      })}

      <h3 className="text-xl font-bold mt-10">Responses Table</h3>

      <table className="w-full mt-4 border">
        <thead>
          <tr>
            <th className="border p-2">Submitted At</th>
            {form.fields.map((field: any) => (
              <th key={field.id} className="border p-2 bg-gray-100 text-left">
                {field.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredResponses.length === 0 && (
            <tr>
              <td colSpan={form.fields.length + 1} className="text-center p-4">
                No responses yet.
              </td>
            </tr>
          )}

          {filteredResponses?.map((response: any, index: number) => (
            <tr key={index}>
              <td className="border p-2">{response.submittedAt}</td>
              {form.fields.map((field: any) => (
                <td key={field.id} className="border p-2">
                  {response.answers[field.id] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormResponses;
