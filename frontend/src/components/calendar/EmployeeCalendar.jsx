import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Calendar from './Calendar';

const EmployeeCalendar = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4003/api/employee/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                if (response.data.success) {
                    setEmployee(response.data.employee);
                } else {
                    setError('Failed to fetch employee details');
                }
            } catch (error) {
                console.error('Error fetching employee:', error);
                setError('Error loading employee details');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center space-x-4 mb-6">
                    <img 
                        src={`http://localhost:4003/${employee?.userId?.profileImage}`}
                        alt="Employee"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{employee?.userId?.name}</h2>
                        <p className="text-gray-600">Employee ID: {employee?.employeeId}</p>
                        <p className="text-gray-600">Department: {employee?.department?.dep_name}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Leave Calendar</h3>
                <Calendar isAdmin={true} employeeId={id} />
            </div>
        </div>
    );
};

export default EmployeeCalendar; 