
const Topbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("user"); 
    window.location.href = '/login';
  };

  return (
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
      <div className="text-lg font-semibold text-gray-700">Welcome Back 👋</div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
