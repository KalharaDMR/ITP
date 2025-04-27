import React from 'react';
import Calendar from '../calendar/Calendar';

const EmployeeDashboard = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-6">
                {/* Welcome Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
                    <p className="text-gray-600">View your leave calendar and manage your requests.</p>
                </div>

                {/* Calendar Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">Leave Calendar</h2>
                    <Calendar isAdmin={false} />
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard; 