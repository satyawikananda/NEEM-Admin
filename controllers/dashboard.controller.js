const viewDashboard = (req, res) => {
    res.render('admin/dashboard/view_dashboard', { title: "Admin | Dashboard" })
}

module.exports = {
    viewDashboard
}