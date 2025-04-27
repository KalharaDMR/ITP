import React from 'react';
import Calendar from './Calendar';

const CalendarPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Leave Calendar</h2>
                <Calendar isAdmin={false} />
            </div>
        </div>
    );
};

export default CalendarPage; 