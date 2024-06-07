const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    try{
        res.send([global.food_items])
    }catch(err){
        console.log(err.message)
        res.send("Server error")
    }
})

module.exports = router;