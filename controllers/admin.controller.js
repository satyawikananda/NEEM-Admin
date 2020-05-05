module.exports = {
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard')
    },
    viewBank: (req, res) => {
        res.render('admin/bank/view_bank')
    },
    viewCategory: (req, res) => {
        res.render('admin/category/view_category')
    },
    viewItem: (req, res) => {
        res.render('admin/item/view_item')
    },
    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking')
    }
}