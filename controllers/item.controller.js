const Category = require('../models/Category')
const Item = require('../models/Item.js')
const Image = require('../models/Image')

const viewItem = async (req, res) => {
    try {
        const category = await Category.find()
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')
        const alert = {
            message: alertMessage,
            status: alertStatus
        }
        res.render('admin/item/view_item', {
            title: "Admin | Item",
            category,
            alert
        })
    } catch (error) {
        req.flash('alertMessage', 'Something went wrong')
        req.flash('alertStatus', 'danger')
        console.log(error)
    }
}

const addItem = async (req, res) => {
    try {
        const {
            categoryId,
            title,
            price,
            city,
            description
        } = req.body
        if(req.files.length > 0){
            const category = await Category.findOne({_id: categoryId})
            const newItem = {
                categoryId: category._id,
                title,
                price,
                city,
                description
            }
            const item = await Item.create(newItem)
            category.itemId.push({_id: item._id})
            await category.save()
            for(let i = 0; i < req.files.length; i++){
                const imageSave = await Image.create({imageUrl: `images/${req.files[i].filename}`})
                item.imageId.push({_id: imageSave._id})
                await item.save()
                console.log(req.files.filename)
                req.flash('alertMessage', 'Successfully add item')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/item')
            }
        }
    } catch (error) {
        req.flash('alertMessage', 'Something went wrong')
        req.flash('alertStatus', 'danger')
        console.log(error)
    }
}

module.exports = {
    viewItem,
    addItem
}