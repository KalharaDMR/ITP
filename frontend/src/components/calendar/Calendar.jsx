import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { useAuth } from '../../context/authContext';

const Calendar = ({ isAdmin = false, employeeId = null }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchLeaves();
    }, [currentDate, isAdmin, employeeId]);

    const fetchLeaves = async () => {
        try {
            setLoading(true);
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();

            let url;
            if (isAdmin && employeeId) {
                // Viewing specific employee's calendar
                url = `http://localhost:4003/api/leave/${employeeId}`;
            } else if (isAdmin) {
                // Admin viewing all leaves
                url = `http://localhost:4003/api/leave/month/${month}/${year}`;
            } else {
                // Employee viewing their own leaves
                url = `http://localhost:4003/api/leave/${user._id}`;
            }

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.success) {
                // Filter leaves for the current month
                const monthLeaves = response.data.leaves.filter(leave => {
                    const leaveDate = new Date(leave.startDate);
                    return leaveDate.getMonth() === currentDate.getMonth() &&
                           leaveDate.getFullYear() === currentDate.getFullYear();
                });
                setLeaves(monthLeaves);
            } else {
                setLeaves([]); // Set empty array if no leaves found
            }
        } catch (error) {
            console.error('Error fetching leaves:', error);
            setLeaves([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    const getDaysInMonth = () => {
        const start = startOfMonth(currentDate);
        const end = endOfMonth(currentDate);
        return eachDayOfInterval({ start, end });
    };

    const getLeaveForDate = (date) => {
        return leaves.find(leave => {
            const leaveStartDate = new Date(leave.startDate);
            const leaveEndDate = new Date(leave.endDate);
            const currentDate = new Date(date);
            
            // Check if the current date falls between start and end dates
            return currentDate >= leaveStartDate && currentDate <= leaveEndDate;
        });
    };

    const changeMonth = (increment) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + increment);
            return newDate;
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => changeMonth(-1)}
                    className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
                >
                    Previous
                </button>
                <h2 className="text-2xl font-bold">
                    {format(currentDate, 'MMMM yyyy')}
                </h2>
                <button
                    onClick={() => changeMonth(1)}
                    className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
                >
                    Next
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-semibold py-2">
                        {day}
                    </div>
                ))}

                {getDaysInMonth().map((date, index) => {
                    const leave = getLeaveForDate(date);
                    const isCurrentMonth = isSameMonth(date, currentDate);
                    const isCurrentDay = isToday(date);

                    return (
                        <div
                            key={index}
                            className={`
                                p-2 min-h-[80px] border rounded
                                ${!isCurrentMonth ? 'bg-gray-100' : ''}
                                ${isCurrentDay ? 'border-teal-500' : 'border-gray-200'}
                                ${leave ? 'bg-red-100' : ''}
                                transition-colors
                            `}
                        >
                            <div className="text-right">
                                <span className={`
                                    ${isCurrentDay ? 'bg-teal-500 text-white' : ''}
                                    ${leave ? 'text-red-600 font-bold' : ''}
                                    px-2 py-1 rounded
                                `}>
                                    {format(date, 'd')}
                                </span>
                            </div>
                            {leave && (
                                <div className="mt-1 text-sm text-red-600">
                                    <div>{leave.leaveType}</div>
                                    <div className="text-xs">{leave.reason}</div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            {leaves.length === 0 && (
                <div className="text-center text-gray-500 mt-4">
                    No leaves found for this month
                </div>
            )}
        </div>
    );
};

export default Calendar; 