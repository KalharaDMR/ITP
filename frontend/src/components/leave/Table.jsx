import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/LeaveHelper";
import axios from "axios";
import { LeaveButtons } from "../../utils/LeaveHelper";
import "../../styles/adminDashboard.css";

const Table = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredLeaves, setFilteredLeaves] = useState(null);


    const fetchLeaves = async () => {
        try {
            const response = await axios.get(
                "http://localhost:4003/api/leave",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            
            console.log("API Response:", response.data);

            if (response.data.success) {
                let sno = 1;
                const data = response.data.leaves.map((leave) => {
                    console.log("Single leave:", leave);
                    
                    // Calculate days difference correctly
                    const startDate = new Date(leave.startDate);
                    const endDate = new Date(leave.endDate);
                    const timeDiff = endDate - startDate;
                    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days

                    return {
                        _id: leave._id,
                        sno: sno++,
                        employeeId: leave.employeeId?.employeeId || 'N/A',
                        name: leave.employeeId?.userId?.name || 'N/A',
                        leaveType: leave.leaveType || 'N/A',
                        department: leave.employeeId?.department?.dep_name || 'N/A',
                        days: daysDiff,
                        status: leave.status || 'Pending',
                        action: <LeaveButtons Id={leave._id} />,
                    };
                });
                setLeaves(data);
                setFilteredLeaves(data)
            }
        } catch (error) {
            console.error("Error fetching leaves:", error);
            setError(error.response?.data?.error || "Failed to fetch leaves");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const filterByInput = (e) => {
        const data = leaves.filter(leave => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredLeaves(data)
    }

    const filterByButton = (status) => {
        const data = leaves.filter(leave => leave.status.toLowerCase().includes(status.toLowerCase()));
        setFilteredLeaves(data)
    }

    if (loading) {
        return <div className="p-6">Loading leaves...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-500">Error: {error}</div>;
    }

    return (
        <>
        {filteredLeaves ? (
        <div className="manage-leaves-section">
            <div className="text-center">
                <h3>Manage Leaves</h3>
            </div>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search By Emp Id"
                    className="search-bar"
                    onChange={filterByInput}
                />
                <div className="filter-buttons">
                    <button 
                        className="filter-button"
                        data-status="Pending"
                        onClick={() => filterByButton("Pending")}>
                        Pending
                    </button>
                    <button 
                        className="filter-button"
                        data-status="Approved"
                        onClick={() => filterByButton("Approved")}>
                        Approved
                    </button>
                    <button 
                        className="filter-button"
                        data-status="Rejected"
                        onClick={() => filterByButton("Rejected")}>
                        Rejected
                    </button>
                </div>
            </div>
            <div className="mt-3">
            <DataTable 
                columns={columns} 
                data={filteredLeaves} 
                pagination 
                highlightOnHover
                responsive
                className="admin-table"
            />
            </div>
        </div>
        ) : (
            <div>Loading...</div>
        )}
        </>
    );
};

export default Table;