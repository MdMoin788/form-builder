import React from 'react';

interface CInputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CInputField: React.FC<CInputFieldProps> = ({ type, placeholder, value, onChange, name }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className="w-full p-2 mb-3 border rounded"
    />
  );
};

export default CInputField;
