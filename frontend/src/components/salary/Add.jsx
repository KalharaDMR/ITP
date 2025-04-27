import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/adminDashboard.css";

const Add = () => {
    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: '',
        allowances: '',
        deductions: '',
        leaveDeduction: '',
        otherDeductions: '',
        payDate: null
    });
    const [departments, setDepartments] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    // Function to fetch approved leaves for a specific month and year
    const fetchApprovedLeaves = async (employeeId, month, year) => {
        try {
            const response = await axios.get(
                `http://localhost:4003/api/leave/approved/${employeeId}/${month}/${year}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success) {
                return response.data.leaves.length || 0;
            }
            return 0;
        } catch (error) {
            console.error("Error fetching leaves:", error);
            return 0;
        }
    };

    // Calculate leave deduction
    const calculateLeaveDeduction = (basicSalary, approvedLeaveCount) => {
        if (approvedLeaveCount <= 2) return 0;
        
        const perDaySalary = basicSalary / 30;
        const excessLeaves = approvedLeaveCount - 2;
        return perDaySalary * excessLeaves;
    };

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value);
        setEmployees(emps);
        // Reset selected employee and salary when department changes
        setSelectedEmployee(null);
        setSalary(prev => ({
            ...prev,
            employeeId: null,
            basicSalary: '',
            leaveDeduction: '',
            otherDeductions: '',
            deductions: ''
        }));
    };

    const handleEmployeeChange = async (e) => {
        const employeeId = e.target.value;
        const employee = employees.find(emp => emp._id === employeeId);
        
        if (employee) {
            setSelectedEmployee(employee);

            // Get the current month and year for leave calculation
            const currentDate = new Date();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();

            // Fetch approved leaves
            const approvedLeaveCount = await fetchApprovedLeaves(employee._id, month, year);
            
            // Calculate leave deduction
            const leaveDeduction = calculateLeaveDeduction(employee.salary, approvedLeaveCount);

            setSalary(prev => ({
                ...prev,
                employeeId: employee._id,
                basicSalary: employee.salary,
                leaveDeduction: leaveDeduction,
                deductions: leaveDeduction + (prev.otherDeductions || 0)
            }));
        } else {
            setSelectedEmployee(null);
            setSalary(prev => ({
                ...prev,
                employeeId: null,
                basicSalary: '',
                leaveDeduction: '',
                otherDeductions: '',
                deductions: ''
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'otherDeductions') {
            // When other deductions change, update both other deductions and total deductions
            const otherDeductions = parseFloat(value) || null;
            setSalary(prev => ({
                ...prev,
                otherDeductions,
                deductions: otherDeductions + (prev.leaveDeduction || 0)
            }));
        } else if (name === 'payDate') {
            // When pay date changes, recalculate leave deductions
            setSalary(prev => ({ ...prev, [name]: value }));
            handlePayDateChange(value);
        } else {
            setSalary(prev => ({ ...prev, [name]: value }));
        }
    };

    const handlePayDateChange = async (payDate) => {
        if (selectedEmployee && payDate) {
            const date = new Date(payDate);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            // Fetch approved leaves for the selected month
            const approvedLeaveCount = await fetchApprovedLeaves(selectedEmployee._id, month, year);
            
            // Calculate leave deduction
            const leaveDeduction = calculateLeaveDeduction(salary.basicSalary, approvedLeaveCount);

            setSalary(prev => ({
                ...prev,
                leaveDeduction: leaveDeduction,
                deductions: leaveDeduction + (prev.otherDeductions || 0)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `http://localhost:4003/api/salary/add`,
                salary,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <>
            {departments ? (
                <div className="salary-section">
                    <h2>Add Salary</h2>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                {/* Left Column */}
                                <div className="form-column">
                                    <div className="form-group">
                                        <label>Department</label>
                                        <select
                                            name="department"
                                            onChange={handleDepartment}
                                            className="w-full"
                                            required
                                        >
                                            <option value="">Select Department</option>
                                            {departments.map((dep) => (
                                                <option key={dep._id} value={dep._id}>
                                                    {dep.dep_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Staff Member</label>
                                        <select
                                            name="employeeId"
                                            onChange={handleEmployeeChange}
                                            className="w-full"
                                            required
                                        >
                                            <option value="">Select Staff Member</option>
                                            {employees.map((emp) => (
                                                <option key={emp._id} value={emp._id}>
                                                    {emp.employeeId} {emp.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Basic Salary</label>
                                        <input
                                            type="number"
                                            name="basicSalary"
                                            value={salary.basicSalary}
                                            onChange={handleChange}
                                            placeholder="Enter Basic Salary"
                                            className="w-full"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Allowances</label>
                                        <input
                                            type="number"
                                            name="allowances"
                                            value={salary.allowances}
                                            onChange={handleChange}
                                            placeholder="Enter Allowances"
                                            className="w-full"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="form-column">
                                    <div className="form-group">
                                        <label>Leave Deductions</label>
                                        <input
                                            type="number"
                                            value={salary.leaveDeduction ? salary.leaveDeduction.toFixed(2) : ''}
                                            placeholder="Leave Deductions"
                                            className="w-full bg-gray-50"
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Other Deductions</label>
                                        <input
                                            type="number"
                                            name="otherDeductions"
                                            value={salary.otherDeductions}
                                            onChange={handleChange}
                                            placeholder="Enter Other Deductions"
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Total Deductions</label>
                                        <input
                                            type="number"
                                            name="deductions"
                                            value={salary.deductions ? salary.deductions.toFixed(2) : ''}
                                            placeholder="Total Deductions"
                                            className="w-full bg-gray-50"
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Pay Date</label>
                                        <input
                                            type="date"
                                            name="payDate"
                                            value={salary.payDate}
                                            onChange={handleChange}
                                            className="w-full"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="submit-button w-full mt-6">
                                Add Salary
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default Add;