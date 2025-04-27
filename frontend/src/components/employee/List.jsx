import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Changed: Simplified the refresh function
  const refreshEmployees = () => {
    fetchEmployees();
  };

  const fetchEmployees = async () => {
    setEmpLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:4003/api/employee",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        let sno = 1;
        const data = response.data.employees.map((emp) => ({
          _id: emp._id,
          sno: sno++,
          dep_name: emp.department.dep_name,
          name: emp.userId.name,
          dob: new Date(emp.dob).toLocaleDateString(),
          profileImage: (
            <img
              width={40}
              className="rounded-xl"
              src={`http://localhost:4003/${emp.userId.profileImage}`}
              alt="Profile"
            />
          ),
          // Changed: Pass refreshEmployees as onEmployeeDelete
          action: <EmployeeButtons _id={emp._id} onEmployeeDelete={refreshEmployees} />,
        }));
        setEmployees(data);
        setFilteredEmployees(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setEmpLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  return (
    <div className="p-8 min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
      }}>
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl shadow-2xl p-8 relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white">Manage Staff Members</h3>
        </div>
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search by Name"
            className="px-4 py-2 w-1/4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            onChange={handleFilter}
          />
          <Link
            to="/admin-dashboard/add-employee"
            className="px-6 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-300"
          >
            Add New Staff Member
          </Link>
        </div>
        <div className="mt-6">
          <DataTable
            columns={columns}
            data={filteredEmployees}
            pagination
            progressPending={empLoading}
            customStyles={{
              rows: {
                style: {
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(10px)",
                },
              },
              headCells: {
                style: {
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(10px)",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default List;