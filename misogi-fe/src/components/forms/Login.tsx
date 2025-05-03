import React, { useState } from 'react';
import CInputField from './CInputField';
import CButton from './CButton';
import { loginUser } from '../../services/api';
import { setLocalStorage, showToastMessage } from '../../utils/utils';

interface LoginProps {
  onSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      const response = await loginUser({
        email,
        password,
      })
      showToastMessage(response, true)
      onSuccess();
      setLocalStorage("user", response?.data?.data, true)
      setLoading(false)
    window.location.href = '/';
    } catch (error) {
      showToastMessage(error, false)
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <CInputField
        name="email"
        type="text"
        placeholder="email"
        value={email}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
      />
      <CInputField
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
      />
      <CButton
        label="Submit"
        loading={loading}
        onClick={handleLogin}
      />
    </div>
  );
};

export default Login;
