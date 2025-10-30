const validateAttendance = (req, res, next) => {
  const { employeeName, employeeID, date, status } = req.body;

  if (!employeeName || !employeeID || !date || !status) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required: employeeName, employeeID, date, status'
    });
  }

  if (!['Present', 'Absent'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Status must be either "Present" or "Absent"'
    });
  }

  next();
};

module.exports = {
  validateAttendance
};