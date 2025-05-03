
const IsLoading = ({  color = "black" }) => {
  return (
    <div className="flex items-center justify-center">
      <div
      style={{width:"20px", height:"20px"}}
        className={`border-4 border-t-transparent border-${color} rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default IsLoading;
