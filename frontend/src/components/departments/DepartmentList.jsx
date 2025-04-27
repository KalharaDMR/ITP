import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartment] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete =  () => {
    fetchDepartments()
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:4003/api/department",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />
          ),
        }));
        setDepartment(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  return (
    <div className="p-20 min-h-screen bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
      backgroundBlendMode: "multiply"
    }}>
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-2xl p-10">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-300">Manage Departments</h3>
        </div>
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search by Department Name"
            className="px-4 py-2 w-1/4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            onChange={filterDepartments}
          />
          <Link
            to="/admin-dashboard/add-department"
            className="px-6 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-300"
          >
            Add New Department
          </Link>
        </div>
        <div className="mt-6">
          <DataTable
            columns={columns}
            data={filteredDepartments}
            pagination
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

export default DepartmentList;