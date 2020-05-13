const viewItem = (req, res) => {
    res.render('admin/item/view_item', {title: "Admin | Item"})
}

module.exports = {
    viewItem
}