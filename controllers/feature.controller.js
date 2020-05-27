const Feature = require('../models/Feature')

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
    addFeature
}