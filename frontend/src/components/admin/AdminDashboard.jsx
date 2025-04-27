import Calendar from '../calendar/Calendar';

const AdminDashboard = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ... existing dashboard content ... */}
                
                {/* Calendar Section */}
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">Leave Calendar</h2>
                    <Calendar isAdmin={true} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard; 