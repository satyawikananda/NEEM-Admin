module.exports = {  
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard', { title: "Admin | Dashboard" })
    },
    viewItem: (req, res) => {
        res.render('admin/item/view_item', {title: "Admin | Item"})
    },
    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking', {title: "Admin | Booking"})
    }
}