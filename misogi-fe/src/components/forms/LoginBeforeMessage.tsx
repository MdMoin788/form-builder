
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

const LoginBeforeMessage = ({ title, setIsLoggedIn }: { title: string, setIsLoggedIn: any }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAuthSuccess = () => {
        setIsModalOpen(false);
        setIsLoggedIn(true);
        navigate('/');
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center h-[400px] text-center md:p-8">
                <span className="font-bold text-gray-800 mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    Login to Access {title}
                </span>
                <p className="text-gray-600 mb-6 ">
                    You need to be logged in to view and manage your {title}.
                </p>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white py-2 px-6  hover:bg-blue-700">
                    Login Now
                </button>
            </div>

            {isModalOpen && <AuthForm onSuccess={handleAuthSuccess} setIsModalOpenMain={setIsModalOpen} />}

        </>
    )
}

export default LoginBeforeMessage