const Category = require('../models/Category')
const Item = require('../models/Item.js')
const Image = require('../models/Image')

const viewItem = async (req, res) => {
    try {
        const item = await Item.find()
            .populate({
                path: 'imageId',
                select: 'id imageUrl'
            })
            .populate({
                path: 'categoryId',
                select: 'id name'
            })
        console.log(JSON.stringify(item, null, 2))
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
            item,
            alert,
            action: "view"
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

const showImageItem = async (req,res) => {
    try {
        const {id} = req.params
        const item = await Item.findOne({_id: id})
            .populate({
                path: 'imageId',
                select: 'id imageUrl'
            })
        const category = await Category.find()
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')
        const alert = {
            message: alertMessage,
            status: alertStatus
        }
        res.render('admin/item/view_item', {
            title: "Admin | Show image item",
            category,
            item,
            alert,
            action: 'showImg'
        })
    } catch (error) {
        req.flash('alertMessage', 'Something went wrong')
        req.flash('alertStatus', 'danger')
        console.log(error)
    }
}

const showEditItem = async (req, res) => {
    try {
        const {id} = req.params
        const item = await Item.findOne({_id: id})
            .populate({
                path: 'imageId',
                select: 'id imageUrl'
            })
            .populate({
                path: 'categoryId',
                select: 'id name'
            })
        console.log(item)
        const category = await Category.find()
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')
        const alert = {
            message: alertMessage,
            status: alertStatus
        }
        res.render('admin/item/view_item', {
            title: "Admin | Edit item",
            category,
            item,
            alert,
            action: 'edit'
        })
    } catch (error) {
        req.flash('alertMessage', 'Something went wrong')
        req.flash('alertStatus', 'danger')
        console.log(error)
    }
}

module.exports = {
    viewItem,
    addItem,
    showImageItem,
    showEditItem
}