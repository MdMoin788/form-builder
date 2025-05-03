import React, { useState } from 'react';
import CInputField from './CInputField';
import CButton from './CButton';
import { createUser } from '../../services/api';
import { setLocalStorage, showToastMessage } from '../../utils/utils';

interface RegisterProps {
  onSuccess: () => void;
}

const SignUp: React.FC<RegisterProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await createUser({
        name,
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
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <CInputField
        name="name"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <CInputField
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CInputField
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <CButton
        label="Register"
        loading={loading}
        onClick={handleRegister}
      />
    </div>
  );
};

export default SignUp;
