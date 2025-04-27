import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const Setting = () => {

    const navigate = useNavigate();
    const { user } = useAuth()
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(setting.newPassword !== setting.confirmPassword){
            setError("Password not matched");
        } else {
            try{
                const response = await axios.put(
                    "http://localhost:4003/api/setting/change-password",
                    setting,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                if(response.data.success) {
                    if(user.role === "admin"){
                    navigate("/admin-dashboard");
                    setError("")
                    } else{
                        navigate("/employee-dashboard");
                        setError("") 
                    }
                }
            } catch (error) {
                if(error.response && !error.response.data.success) {
                    setError(error.response.data.error)
                }
            }
        }
    };

    return (
        <div className="settings-section max-w-3xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Change Password</h2>
            <p className="text-red-400 text-center">{error}</p>
            <form onSubmit={handleSubmit} className="settings-form">
                {/* Old Password Input */}
                <div className="form-group">
                <label className="text-sm font-medium text-white">
                    Old Password
                </label>
                <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    onChange={handleChange}
                    className="settings-input"
                    required
                />
                </div>

                <div className="form-group">
                    <label className="text-sm font-medium text-white">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        onChange={handleChange}
                        className="settings-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="text-sm font-medium text-white">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className="settings-input"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="settings-submit-button"
                >
                    Change Password
                </button>

            </form>
        </div>
    );
};

export default Setting;