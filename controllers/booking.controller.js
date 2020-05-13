const viewBooking = (req, res) => {
    res.render('admin/booking/view_booking', {title: "Admin | Booking"})
}

module.exports = {
    viewBooking
}