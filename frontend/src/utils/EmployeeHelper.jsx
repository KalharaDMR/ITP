import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from 'react-icons/fa';
import { useState } from "react";
import DeleteConfirmationModal from "../components/common/DeleteConfirmationModal";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px"
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px"
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px"
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true
  },
];

// Changed: Added proper error handling for department fetch
export const fetchDepartments = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4003/api/department",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    if (response.data.success) {
      return response.data.departments;
    }
    throw new Error("Failed to fetch departments");
  } catch (error) {
    console.error("Department fetch error:", error);
    if (error.response?.data?.error) {
      alert(error.response.data.error);
    }
    return [];
  }
};

// Changed: Added proper error handling for employees by department
export const getEmployees = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:4003/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    if (response.data.success) {
      return response.data.employees;
    }
    throw new Error("Failed to fetch employees");
  } catch (error) {
    console.error("Employees fetch error:", error);
    if (error.response?.data?.error) {
      alert(error.response.data.error);
    }
    return [];
  }
};

// Changed: Complete rewrite of EmployeeButtons with proper deletion flow
export const EmployeeButtons = ({ _id, onEmployeeDelete }) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4003/api/employee/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (response.data.success) {
        alert("Employee deleted successfully");
        if (onEmployeeDelete) {
          onEmployeeDelete(); // Trigger refresh
        }
      } else {
        throw new Error(response.data.error || "Failed to delete employee");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.error || "Failed to delete employee");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <div className="flex space-x-2">
        <button
          className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
          onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
          title="View"
        >
          View
        </button>
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
          title="Edit"
        >
          Edit
        </button>
        <button
          className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
          onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
          title="Salary"
        >
          Salary
        </button>
        <button
          className="px-3 py-1 bg-orange-900 text-white rounded hover:bg-orange-800 transition"
          onClick={() => navigate(`/admin-dashboard/employees/leaves/${_id}`)}
          title="Leave"
        >
          Leave
        </button>
        <button
          className="p-2 text-purple-600 hover:text-purple-700 transition-colors"
          onClick={() => navigate(`/admin-dashboard/employees/calendar/${_id}`)}
          title="View Calendar"
        >
          <FaCalendarAlt className="text-xl" />
        </button>
        <button
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
          onClick={() => setIsDeleteModalOpen(true)}
          title="Remove"
        >
          Remove
        </button>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDelete(_id)}
        title="Delete Employee"
        message="Are you sure you want to delete this employee? This action cannot be undone."
      />
    </>
  );
};