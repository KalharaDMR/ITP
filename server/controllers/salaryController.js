import Salary from '../models/Salary.js'
import Employee from '../models/Employee.js'

const addSalary = async (req, res) => {
    try {
        const {employeeId, basicSalary, allowances, deductions, payDate} = req.body

        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions)

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        })

        await newSalary.save()

        return res.status(200).json({success: true})

    } catch (error) {
        return res.status(500).json({success: false, error: "Salary and Server error"})
    }
}

const getSalary = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id)
        let salary;
        salary = await Salary.find({employeeId: id}).populate('employeeId', 'employeeId')
        if(!salary || salary.length < 1){
            const employee = await Employee.findOne({userId: id})
            salary = await Salary.find({employeeId: employee._id}).populate('employeeId', 'employeeId')
            console.log(salary)
        }
        return res.status(200).json({success: true, salary})

    } catch (error) {
        return res.status(500).json({success: false, error: "Salary get and Server error"})
    }
}

const getMonthlyTotal = async (req, res) => {
    try {
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();

        const start = new Date(year, month, 1);
        const end = new Date(year, month + 1, 1);

        console.log('Filtering salaries from', start, 'to', end);

        const salaries = await Salary.find({
            payDate: {
                $gte: start,
                $lt: end
            }
        });

        console.log('Salaries found:', salaries);

        const total = salaries.reduce((sum, s) => sum + (s.netSalary || 0), 0);

        return res.status(200).json({ success: true, total });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error" });
    }
};

export {addSalary, getSalary, getMonthlyTotal}