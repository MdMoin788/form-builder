import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

interface AuthFormProps {
    onSuccess: () => void
    setIsModalOpenMain: any;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess, setIsModalOpenMain }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-35 backdrop-blur-md z-50
">
            <div className="bg-white p-6 rounded shadow-lg w-80 relative">
                {/* Close */}
                <button
                    onClick={() =>{
                        setIsModalOpen(false)
                        setIsModalOpenMain(false)
                    }}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                    ✖
                </button>

                {/* Dynamic Form */}
                {isLogin ? (
                    <>
                        <Login onSuccess={onSuccess} />
                        <p className="text-center mt-4 text-sm">
                            Don't have an account?{" "}
                            <button onClick={toggleForm} className="text-blue-500 hover:underline">
                                Create New Account
                            </button>
                        </p>
                    </>
                ) : (
                    <>
                        <SignUp onSuccess={onSuccess} />
                        <p className="text-center mt-4 text-sm">
                            Already have an account?{" "}
                            <button onClick={toggleForm} className="text-blue-500 hover:underline">
                                Login
                            </button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthForm;
