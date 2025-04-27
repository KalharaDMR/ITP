import multer from "multer";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import path from "path";

// File upload configuration (unchanged)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Add Employee (unchanged)
const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already registered!" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : ""
        });
        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        });

        await newEmployee.save();
        return res.status(200).json({ success: true, message: "Employee created successfully" });

    } catch (error) {
        console.error("Add employee error:", error);
        return res.status(500).json({ success: false, error: "Server error in adding employee" });
    }
};

// Get All Employees (unchanged)
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate('userId', { password: 0 })
            .populate("department");
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        console.error("Get employees error:", error);
        return res.status(500).json({ success: false, error: "Error fetching employees" });
    }
};

// Get Single Employee (unchanged)
const getEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        let employee;
        employee = await Employee.findById(id)
            .populate('userId', { password: 0 })
            .populate("department");
        
        if (!employee) {
            employee = await Employee.findOne({ userId: id })
                .populate('userId', { password: 0 })
                .populate("department");
        }

        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        return res.status(200).json({ success: true, employee });
    } catch (error) {
        console.error("Get employee error:", error);
        return res.status(500).json({ success: false, error: "Error fetching employee" });
    }
};

// Update Employee (unchanged)
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            maritalStatus,
            designation,
            department,
            salary,
        } = req.body;

        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        const user = await User.findById(employee.userId);
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        await User.findByIdAndUpdate(employee.userId, { name });
        await Employee.findByIdAndUpdate(id, {
            maritalStatus,
            designation,
            salary,
            department
        });

        return res.status(200).json({ success: true, message: "Employee updated successfully" });

    } catch (error) {
        console.error("Update employee error:", error);
        return res.status(500).json({ success: false, error: "Error updating employee" });
    }
};

// Get Employees by Department (unchanged)
const fetchEmployeesByDepId = async (req, res) => {
    const { id } = req.params;
    try {
        const employees = await Employee.find({ department: id })
            .populate('userId', { password: 0 });
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        console.error("Fetch employees by department error:", error);
        return res.status(500).json({ success: false, error: "Error fetching department employees" });
    }
};

// Delete Employee (IMPROVED VERSION)
const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Find employee first to get associated user ID
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ 
                success: false, 
                error: "Employee not found" 
            });
        }

        // 2. Delete associated user record
        const deletedUser = await User.findByIdAndDelete(employee.userId);
        if (!deletedUser) {
            console.warn(`Associated user ${employee.userId} not found (proceeding with employee deletion)`);
        }

        // 3. Delete employee record
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Employee and associated user deleted successfully",
            deletedEmployee,
            deletedUser: deletedUser || { message: "No associated user found" }
        });

    } catch (error) {
        console.error("Delete employee error:", error);
        return res.status(500).json({
            success: false,
            error: "Error deleting employee",
            systemError: error.message
        });
    }
};

export {
    addEmployee,
    upload,
    getEmployees,
    getEmployee,
    updateEmployee,
    fetchEmployeesByDepId,
    deleteEmployee
};