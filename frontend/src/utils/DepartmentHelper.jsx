import axios from "axios";
import { useNavigate } from "react-router-dom";


export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to remove?");
    if (confirm) {
      try {
        const response = await axios.delete(
          `http://localhost:4003/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          onDepartmentDelete(id);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="flex space-x-3 ">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}>
        Update
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded"
        onClick={() => handleDelete(_id)}>
        Remove
      </button>
    </div>
  );
};
