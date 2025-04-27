import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4003/api/auth/login", { email, password });

            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                if (response.data.user.role === "admin") {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/employee-dashboard');
                }
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Server Error");
            }
        }
    };

    return (
        <div className='flex items-center justify-center h-screen overflow-hidden relative'>
            <div
                className='absolute inset-0 bg-cover bg-center transform transition-transform duration-1000 hover:scale-110'
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
            ></div>

            <div className='absolute inset-0 bg-black bg-opacity-50'></div>

            <div className='relative z-10 bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-96 transform transition-transform hover:scale-105'>
                <h2 className='text-4xl font-bold mb-8 text-center text-teal-800'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-6'>
                        <label htmlFor="email" className='block text-gray-700 font-medium mb-2'>Email</label>
                        <input
                            type="email"
                            placeholder='Enter email'
                            className='w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="password" className='block text-gray-700 font-medium mb-2'>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='********'
                                className='w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all pr-12'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                style={{
                                    position: 'absolute',
                                    right: '18px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    color: '#4B5563',
                                    fontSize: '1.25rem',
                                    zIndex: 2
                                }}
                                tabIndex={0}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <div className='mb-6 flex items-center justify-between'>
                        <label className='inline-flex items-center'>
                            <input type="checkbox" className='form-checkbox h-5 w-5 text-teal-600 rounded focus:ring-teal-500' />
                            <span className='ml-2 text-gray-700'>Remember Me</span>
                        </label>
                        <a href="#" className='text-teal-600 hover:text-teal-700 transition duration-300'>
                            Forgot password?
                        </a>
                    </div>
                    <div className='mb-4'>
                        <button
                            type='submit'
                            className='w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
                        >
                            Login
                        </button>
                    </div>
                </form>
                {error && <p className='text-red-500 text-center mt-4 animate-shake'>{error}</p>}
            </div>

            <div className='absolute top-10 left-10 text-white text-5xl font-ConcertOne drop-shadow-2xl animate-float'>
                Nature's Lake View
            </div>

            <div className='absolute bottom-10 right-10 text-white text-xl font-medium drop-shadow-2xl animate-float-delay'>
                Your Gateway to Luxury
            </div>
        </div>
    );
};

export default Login;