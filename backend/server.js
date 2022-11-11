const dotenv = require("dotenv");
const express = require('express');
const cors=require('cors');
const app = express();
const port = 5000;
const path = require('path'); 
app.use(cors());

app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({ extended: true }))

dotenv.config();
require('./dB/connection')
// const d=require("../frontend/src/components/Left")
const alldishdata=require('./models/CreateDish')
const {createDish} = require("./controllers/CreateDish")

app.use('/', express.static(path.join(__dirname, '../frontend/build')));

app.get('/getAllDishData', (req, res) => alldishdata.find({},(err,receipe)=>{
    if(err){
        console.log("err",err);
    }
    else{
        res.send(receipe)
    }
}));


app.put('/editdish', async(req,res)=>{
    if (req.body._id) {
        const data = await alldishdata.findById({ _id: req.body._id });
        data.dishName = req.body.dishName;
        data.ingredients = req.body.ingredients;
        if (await data.save())
            return res.status(200).json({ message: "Dish updated successfully" });
    }
    return res.status(401).json({ message: "No id found." });
})

// app.get('/getalldishname',(req,res)=>{
//     console.log(req.body)
// })
app.post('/createdish', createDish);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));