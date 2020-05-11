const Category = require('../models/Category.js')
const Bank = require('../models/Bank.js')
module.exports = {  
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard', { title: "Admin | Dashboard" })
    },
    viewBank: async (req, res) => {
        try{
            const bank = await Bank.find()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {
                message: alertMessage,
                status: alertStatus
            }
            res.render('admin/bank/view_bank', { title: "Admin | Bank", alert, bank })
        }catch(error){
            res.redirect('/admin/bank')
        }
    },
    addBank: async (req, res) => {
        try{
            const {
                nameBank,
                nomorRekening,
                name
            } = req.body
            await Bank.create({
                nameBank,
                nomorRekening,
                name,
                imageUrl: `images/${req.file.filename}`
            })
            req.flash('alertMessage', 'Successfully add bank')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/bank')
        }catch(error){
            req.flash('alertMessage', 'Failed add category')
            req.flash('alertStatus', 'danger')
            console.log(error)
        }
    },
    viewCategory: async (req, res) => {
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
    },
    addCategory: async (req, res) => {
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
    },
    updateCategory: async (req, res) => {
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
    },
    deleteCategory: async (req, res) => {
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
    },
    viewItem: (req, res) => {
        res.render('admin/item/view_item', {title: "Admin | Item"})
    },
    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking', {title: "Admin | Booking"})
    }
}