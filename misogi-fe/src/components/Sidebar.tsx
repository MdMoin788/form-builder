
// import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab }: any) => {
  // const location = useLocation();
  const menuItems = [
    { name: "Task Lists", path: "taskLists" },
    { name: "Calendar", path: "calendar" },
  ];

  return (
    <div className="h-screen w-64 bg-white shadow-md p-4 flex flex-col">
      <div className="text-2xl font-bold mb-6 text-blue-600">TaskPal</div>
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => setActiveTab(item?.path)}
            // to={item.path}
            className={`cursor-pointer p-2 rounded-lg text-gray-700 hover:bg-blue-100 ${activeTab === item.path ? "bg-blue-100 font-semibold" : ""
              }`}
          >
            {item.name}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
