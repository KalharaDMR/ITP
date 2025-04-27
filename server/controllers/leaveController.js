import Employee from '../models/Employee.js'
import Leave from '../models/Leave.js'

const addLeave = async (req, res) => {

    try {
            const {userId, leaveType, startDate, endDate, reason} = req.body
            const employee = await Employee.findOne({userId})
        
            const newLeave = new Leave({
                employeeId: employee._id, leaveType, startDate, endDate, reason
            })
    
            await newLeave.save()
    
            return res.status(200).json({success: true})
    
        } catch (error) {
            return res.status(500).json({success: false, error: "Leave and Server error"})
        }

}

const getLeave = async (req, res) => {
    try{

        const {id} = req.params;
        let leaves = await Leave.find({ employeeId: id });
        if (!leaves || leaves.length === 0) {
            const employee = await Employee.findOne({ userId: id });
            leaves = await Leave.find({ employeeId: employee._id });
        }
        
        return res.status(200).json({success: true, leaves})

    } catch (error) {
            return res.status(500).json({success: false, error: "Leave and Server error"})
        }
}


const getLeaves = async (req, res) => {
    try{
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [
                {
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name'
                }
            ],
            select: '_id employeeId userId department' // Include employeeId in the selection
        })
        return res.status(200).json({success: true, leaves})

    } catch (error) {
            console.log(error.message)
            return res.status(500).json({success: false, error: "Leave and Server error"})
        }
}

const getLeaveDetail = async (req, res)  => {
    try{
        const {id} = req.params;
        const leave = await Leave.findById({_id: id}).populate({
            path: "employeeId",
            populate: [
                {
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name, profileImage'
                }
            ],
            select: '_id employeeId userId department' // Include employeeId in the selection
        })
        return res.status(200).json({success: true, leave})

    } catch (error) {
            console.log(error.message)
            return res.status(500).json({success: false, error: "Leave and Server error"})
        }
}

const updateLeave = async (req, res) => {
    try{
        const {id} = req.params;
        console.log(req.body.status)
        const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})
        if(!leave){
            return res.status(404).json({success: false, error: "Leave not found"})
        }
        return res.status(200).json({success: true})
    } catch (error) {
            console.log(error.message)
            return res.status(500).json({success: false, error: "Leave update Server error"})
        }
}

const getApprovedLeaves = async (req, res) => {
    try {
        const { employeeId, month, year } = req.params;
        
        // Convert month and year to Date objects for comparison
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const leaves = await Leave.find({
            employeeId: employeeId,
            status: "Approved",
            startDate: { $gte: startDate, $lte: endDate }
        });

        return res.status(200).json({
            success: true,
            leaves: leaves
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error fetching approved leaves"
        });
    }
};

export const getLeavesByMonth = async (req, res) => {
    try {
        const { month, year } = req.params;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const leaves = await Leave.find({
            startDate: { $gte: startDate },
            endDate: { $lte: endDate }
        }).populate('employeeId', 'name employeeId');

        res.json({
            success: true,
            leaves
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
};

export const getLeavesByEmployee = async (req, res) => {
    try {
        const { employeeId, month, year } = req.params;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const leaves = await Leave.find({
            employeeId,
            startDate: { $gte: startDate },
            endDate: { $lte: endDate }
        });

        res.json({
            success: true,
            leaves
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
};

export {addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave, getApprovedLeaves}