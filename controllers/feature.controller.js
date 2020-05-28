const Feature = require('../models/Feature')

const viewDetailItem = async (req, res) => {
    const { itemId } = req.params
    try {
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')
        const alert = {
            message: alertMessage,
            status: alertStatus
        }
        res.render('admin/item/detail_item/view_detail_item', {
            title: "Admin | Detail item",
            alert,
            itemId
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect(`/admin/item/show-detail-item/${itemId}`)
        console.log(error)
    }
}

const addFeature = async (req, res) => {
    try{
        const {
            name,
            qty,
            itemId
        } = req.body
        if(!req.file){
            req.flash('alertMessage', 'Successfully add feature')
            req.flash('alertStatus', 'success')
            res.redirect(`/admin/item/show-detail-item/${itemId}`)
        }
        await Feature.create({
            name,
            qty,
            itemId,
            imageUrl: `images/${req.file.filename}`
        })
        req.flash('alertMessage', 'Successfully add feature')
        req.flash('alertStatus', 'success')
        res.redirect(`/admin/item/show-detail-item/${itemId}`)
    }catch(error){
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect(`/admin/item/show-detail-item/${itemId}`)
        console.log(error)
    }
}

module.exports = {
    addFeature,
    viewDetailItem
}