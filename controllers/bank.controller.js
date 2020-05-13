const Bank = require('../models/Bank.js')
const fs = require('fs-extra')
const path = require('path')

const viewBank = async (req,res) => {
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
}

const addBank = async (req, res) => {
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
}

const updateBank = async (req, res) => {
    try {
        const {
            id,
            nameBank, 
            nomorRekening, 
            name
        } = req.body
        const bank = await Bank.findOne({_id: id})
        if(req.file == undefined){
            bank.name = name
            bank.nameBank = nameBank,
            bank.nomorRekening = nomorRekening
            await bank.save()
            req.flash('alertMessage', 'Successfully update bank')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/bank')
        }else{
            await fs.unlink(path.join(`public/${bank.imageUrl}`))
            console.log(req.file)
            bank.name = name
            bank.nameBank = nameBank,
            bank.nomorRekening = nomorRekening
            bank.imageUrl = `images/${req.file.filename}`
            await bank.save()
            req.flash('alertMessage', 'Successfully update bank')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/bank')
        }
    } catch (error) {
        req.flash('alertMessage', 'Failed add bank')
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/category')
    }
}

const deleteBank = async (req, res) => {
    try {
        const {id} = req.params
        const bank = await Bank.findOne({ _id: id })
        await fs.unlink(path.join(`public/${bank.imageUrl}`))
        await bank.remove()
        req.flash('alertMessage', 'Successfully delete bank')
        req.flash('alertStatus', 'success')
        res.redirect('/admin/bank')
    } catch (error) {
        req.flash('alertMessage', 'Failed update bank')
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/bank')
    }
}

module.exports = {
    viewBank,
    addBank,
    updateBank,
    deleteBank
}