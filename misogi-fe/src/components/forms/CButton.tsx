import React from 'react';

interface CButtonProps {
  label: string;
  loading: boolean;
  onClick: () => void;
}

const CButton: React.FC<CButtonProps> = ({ label, loading, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full p-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
    >
      {loading ? 'Loading...' : label}
    </button>
  );
};

export default CButton;
