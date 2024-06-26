const express = require('express');
const router = express.Router();
const Order = require('../models/Orders')

router.post('/orderData', async(req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date})

    let eId = await Order.findOne({ 'email': req.body.email })
    // console.log(eId);
    if(eId === null){
        try{
            Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(()=>{
                res.json({ success: true })
            })
        }catch(err){
            console.log(err.message);
            res.send("Server error", err.message)
        }
    }
    else{
        try{
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data}}
            ).then(()=> {
                res.json({ success: true })
            })
        }catch(err){
            res.send("Server error", err.message)
        }
    }
})

router.post('/myOrderData', async (req, res) => {
    try{
        let myData = await Order.findOne({ 'email': req.body.email })
        res.json({ orderData: myData})
        // res.send(myData)
    }catch(err){
        res.send("Server Error", err.message)
    }
})

module.exports = router;
