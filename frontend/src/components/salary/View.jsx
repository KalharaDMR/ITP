import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import "../../styles/adminDashboard.css";

const View = () => {
    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setFilteredSalaries] = useState(null);
    const [approvedLeaves, setApprovedLeaves] = useState({});
    const { id } = useParams();
    let sno = 1;

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

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`http://localhost:4003/api/salary/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            
            if (response.data.success) {
                const salaryData = response.data.salary;
                
                // Fetch approved leaves for each salary record
                const updatedSalaries = await Promise.all(
                    salaryData.map(async (salary) => {
                        const payDate = new Date(salary.payDate);
                        const month = payDate.getMonth() + 1;
                        const year = payDate.getFullYear();
                        
                        const approvedLeaveCount = await fetchApprovedLeaves(
                            salary.employeeId._id,
                            month,
                            year
                        );

                        const leaveDeduction = calculateLeaveDeduction(
                            salary.basicSalary,
                            approvedLeaveCount
                        );

                        return {
                            ...salary,
                            approvedLeaves: approvedLeaveCount,
                            leaveDeduction: leaveDeduction,
                            deductions: (parseFloat(salary.deductions) || 0) + leaveDeduction,
                            netSalary: salary.basicSalary + (parseFloat(salary.allowances) || 0) - ((parseFloat(salary.deductions) || 0) + leaveDeduction)
                        };
                    })
                );

                setSalaries(updatedSalaries);
                setFilteredSalaries(updatedSalaries);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    const filterSalaries = (q) => {
        const filteredRecords = salaries.filter((leave) =>
            leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
        );
        setFilteredSalaries(filteredRecords);
    };

    const generatePDF = () => {
        try {
            if (!filteredSalaries || filteredSalaries.length === 0) {
                alert("No salary records available to generate PDF");
                return;
            }

            // Create new document
            const doc = new jsPDF();

            // Add title
            doc.setFontSize(16);
            doc.text("Salary Report", 15, 15);

            // Add employee ID
            doc.setFontSize(12);
            const employeeId = filteredSalaries[0]?.employeeId?.employeeId || "N/A";
            doc.text(`Employee ID: ${employeeId}`, 15, 25);

            // Add date
            doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 35);

            // Create table data
            const headers = [["SNO", "Member ID", "Salary", "Allowance", "Leave Deduction", "Other Deductions", "Total Deductions", "Net Salary", "Pay Date"]];
            const data = filteredSalaries.map((salary, index) => [
                (index + 1).toString(),
                salary.employeeId?.employeeId || "N/A",
                salary.basicSalary?.toFixed(2) || "0.00",
                salary.allowances?.toFixed(2) || "0.00",
                salary.leaveDeduction?.toFixed(2) || "0.00",
                (parseFloat(salary.deductions) - (salary.leaveDeduction || 0)).toFixed(2),
                parseFloat(salary.deductions).toFixed(2),
                parseFloat(salary.netSalary).toFixed(2),
                salary.payDate ? new Date(salary.payDate).toLocaleDateString() : "N/A"
            ]);

            // Add table
            autoTable(doc, {
                head: headers,
                body: data,
                startY: 45,
                theme: 'grid',
                styles: {
                    fontSize: 8,
                    cellPadding: 2,
                },
                headStyles: {
                    fillColor: [0, 128, 128],
                    textColor: [255, 255, 255],
                    fontStyle: 'bold',
                    halign: 'center'
                },
                columnStyles: {
                    0: { cellWidth: 10 },
                    1: { cellWidth: 20 },
                    2: { cellWidth: 20 },
                    3: { cellWidth: 20 },
                    4: { cellWidth: 25 },
                    5: { cellWidth: 25 },
                    6: { cellWidth: 25 },
                    7: { cellWidth: 20 },
                    8: { cellWidth: 20 }
                }
            });

            // Save PDF
            doc.save(`salary_report_${employeeId}.pdf`);

        } catch (error) {
            console.error("Error generating PDF:", error);
            alert(`Error generating PDF: ${error.message}`);
        }
    };

    return (
        <>
            {filteredSalaries === null ? (
                <div>Loading....</div>
            ) : (
                <div className="salary-section">
                    <div className="text-center">
                        <h2>Salary History</h2>
                    </div>
                    <div className="flex justify-between items-center my-3">
                        <button
                            onClick={generatePDF}
                            className="submit-button"
                        >
                            Generate Salary Report
                        </button>
                    </div>

                    {filteredSalaries.length > 0 ? (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>SNO</th>
                                    <th>Member ID</th>
                                    <th>Salary</th>
                                    <th>Allowance</th>
                                    <th>Leave Deduction</th>
                                    <th>Other Deductions</th>
                                    <th>Total Deductions</th>
                                    <th>Net Salary</th>
                                    <th>Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSalaries.map((salary) => (
                                    <tr key={salary.id}>
                                        <td>{sno++}</td>
                                        <td>{salary.employeeId.employeeId}</td>
                                        <td>{salary.basicSalary}</td>
                                        <td>{salary.allowances}</td>
                                        <td>{salary.leaveDeduction?.toFixed(2) || "0"}</td>
                                        <td>{(parseFloat(salary.deductions) - (salary.leaveDeduction || 0)).toFixed(2)}</td>
                                        <td>{parseFloat(salary.deductions).toFixed(2)}</td>
                                        <td>{parseFloat(salary.netSalary).toFixed(2)}</td>
                                        <td>{new Date(salary.payDate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : <div>No Records</div>}
                </div>
            )}
        </>
    );
};

export default View;