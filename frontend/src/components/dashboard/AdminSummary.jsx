import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SummaryCard from './SummaryCard';
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa';

const AdminSummary = () => {
  const [leaveStats, setLeaveStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0
  });
  const [staffCount, setStaffCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch leave statistics
        const leaveResponse = await axios.get('http://localhost:4003/api/leave', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (leaveResponse.data.success) {
          const leaves = leaveResponse.data.leaves;
          const stats = {
            total: leaves.length,
            approved: leaves.filter(leave => leave.status === 'Approved').length,
            pending: leaves.filter(leave => leave.status === 'Pending').length,
            rejected: leaves.filter(leave => leave.status === 'Rejected').length
          };
          setLeaveStats(stats);
        }

        // Fetch staff count
        const staffResponse = await axios.get('http://localhost:4003/api/employee', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (staffResponse.data.success) {
          setStaffCount(staffResponse.data.employees.length);
        }

        // Fetch department count
        const departmentResponse = await axios.get('http://localhost:4003/api/department', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (departmentResponse.data.success) {
          setDepartmentCount(departmentResponse.data.departments.length);
        }

        // Fetch monthly total salary
        const monthlyTotalResponse = await axios.get('http://localhost:4003/api/salary/monthly-total', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (monthlyTotalResponse.data.success) {
          setMonthlyTotal(monthlyTotalResponse.data.total);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className='p-8'>
      <h3 className='text-3xl font-bold text-white mb-8'>Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <SummaryCard icon={<FaUsers className='text-4xl' />} text="Total Staff Members" number={staffCount} color="bg-gradient-to-r from-teal-600 to-teal-700" />
        <SummaryCard icon={<FaBuilding className='text-4xl' />} text="Total Departments" number={departmentCount} color="bg-gradient-to-r from-yellow-500 to-yellow-600" />
        <SummaryCard icon={<FaMoneyBillWave className='text-4xl' />} text="Monthly Pay" number={`Rs. ${monthlyTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} color="bg-gradient-to-r from-red-500 to-red-600" />
      </div>
      <div className='mt-12'>
        <h3 className='text-3xl font-bold text-white mb-8 text-center'>Leave Details</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <SummaryCard icon={<FaFileAlt className='text-4xl' />} text="Leave Applied" number={leaveStats.total} color="bg-gradient-to-r from-teal-600 to-teal-700" />
          <SummaryCard icon={<FaCheckCircle className='text-4xl' />} text="Leave Approved" number={leaveStats.approved} color="bg-gradient-to-r from-green-500 to-green-600" />
          <SummaryCard icon={<FaHourglassHalf className='text-4xl' />} text="Leave Pending" number={leaveStats.pending} color="bg-gradient-to-r from-yellow-500 to-yellow-600" />
          <SummaryCard icon={<FaTimesCircle className='text-4xl' />} text="Leave Rejected" number={leaveStats.rejected} color="bg-gradient-to-r from-red-500 to-red-600" />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;