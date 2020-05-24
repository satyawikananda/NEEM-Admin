const Category = require('../models/Category')
const Item = require('../models/Item.js')
const Image = require('../models/Image')
const fs = require('fs-extra')
const path = require('path')

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

const updateItem = async (req, res) => {
    try {
        const { id } = req.params
        const {
             categoryId,
             title,
             price,
             city,
             description
         } = req.body
        const item = await Item.findOne({_id: id})
         .populate({
             path: 'imageId',
             select: 'id imageUrl'
         })
         .populate({
             path: 'categoryId',
             select: 'id name'
         })
         if(req.files.length > 0){
             for(let i = 0; i < item.imageId.length; i++){
                 const imageUpdate = await Image.findOne({_id: item.imageId[i]._id})
                 await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`))
                 imageUpdate.imageUrl = `images/${req.files[i].filename}`
                 await imageUpdate.save()
             }
             item.title = title
             item.price = price
             item.city = city
             item.description = description
             item.categoryId = categoryId
             await item.save()
             req.flash('alertMessage', 'Successfully edit item')
             req.flash('alertStatus', 'success')
             res.redirect('/admin/item')
         }else{
             item.title = title
             item.price = price
             item.city = city
             item.description = description
             item.categoryId = categoryId
             await item.save()
             req.flash('alertMessage', 'Successfully edit item')
             req.flash('alertStatus', 'success')
             res.redirect('/admin/item')
         }
    } catch (error) {
     req.flash('alertMessage', `${error.message}`)
     req.flash('alertStatus', 'danger')
     res.redirect('/admin/item')
     console.log(error)
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params
        const item = await Item.findOne({_id: id})
         .populate('imageId')
         for(let i = 0; i < item.imageId.length; i++){
            Image.findOne({_id: item.imageId[i]._id})
             .then( async (image) => {
                 await fs.unlink(path.join(`public/${image.imageUrl}`))
                 image.remove()
             })
             .catch((err) => {
                req.flash('alertMessage', `${error.message}`)
                req.flash('alertStatus', 'danger')
                res.redirect('/admin/item')
                console.log(error)
             })
         }
         await item.remove()
         req.flash('alertMessage', 'Successfully delete item')
         req.flash('alertStatus', 'success')
         res.redirect('/admin/item')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/item')
        console.log(error)
    }
}

module.exports = {
    viewItem,
    addItem,
    showImageItem,
    showEditItem,
    updateItem,
    deleteItem
}