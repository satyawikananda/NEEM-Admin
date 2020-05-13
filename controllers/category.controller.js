const Category = require('../models/Category.js')

const viewCategory = async (req, res) => {
    try {
        const category = await Category.find()
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')
        const alert = {
            message: alertMessage,
            status: alertStatus
        }
        res.render('admin/category/view_category', {category, alert, title: "Admin | Category"})
    } catch (error) {
        res.redirect('/admin/category')
    }
}

const addCategory = async (req, res) => {
    try {
        const {name} = req.body
        await Category.create({name})
        req.flash('alertMessage', 'Successfully add category')
        req.flash('alertStatus', 'success')
        res.redirect('/admin/category')
    } catch (error) {   
        req.flash('alertMessage', `Failed add category`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/category')
    }
}

const updateCategory = async (req, res) => {
    try {
        const {id, name} = req.body
        const category = await Category.findOne({_id: id})
        category.name = name
        await category.save()
        req.flash('alertMessage', 'Successfully update category')
        req.flash('alertStatus', 'success')
        res.redirect('/admin/category')
    } catch (error) {
        req.flash('alertMessage', 'Failed add category')
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/category')
    }
}

const deleteCategory = async (req, res) => {
    try {
        const {id} = req.params
        const category = await Category.findOne({ _id: id })
        await category.remove()
        req.flash('alertMessage', 'Successfully delete category')
        req.flash('alertStatus', 'success')
        res.redirect('/admin/category')
    } catch (error) {
        req.flash('alertMessage', 'Failed update category')
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/category')
    }
}

module.exports = {
    viewCategory,
    addCategory,
    updateCategory,
    deleteCategory
}