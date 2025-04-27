import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const List = () => {

    const [leaves, setLeaves] = useState(null)
    let sno = 1;
    const {id} = useParams()
    const {user} = useAuth()

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:4003/api/leave/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                setLeaves(response.data.leaves);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);   

    if(!leaves) {
        return <div>Loading...</div>
    }

    return (
    <div className="manage-leaves-section min-h-screen">
        <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-6">Manage Leaves</h3>
        </div>
        <div className="flex justify-between items-center mb-6">
            {/* Search bar removed */}
            {user.role === "employee" && (
            <Link
                to="/employee-dashboard/add-leave"
                className="px-6 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-300"
            >
                Add New Leave
            </Link>
            )}
        </div>

        <table className="admin-table mt-6">
            <thead>
                <tr>
                    <th>SNO</th>
                    <th>Leave Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Description</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {leaves.map((leave) => (
                    <tr key={leave._id}>
                        <td>{sno++}</td>
                        <td>{leave.leaveType}</td>
                        <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                        <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                        <td>{leave.reason}</td>
                        <td>{leave.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default List;