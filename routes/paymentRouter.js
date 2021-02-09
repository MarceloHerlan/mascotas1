const router=require('express').Router()
const paymentController=require('../controllers/paymentController')
const authAdmin = require('../middleware/authAdmin')
const auth=require('../middleware/authAdmin')

router.route('/payment')
    .get(paymentController.getPayments)
    .post(paymentController.createPayment)


    module.exports=router