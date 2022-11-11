const Receipe = require("../models/CreateDish");

exports.createDish = async(req, res) => {
    const {dishName, ingredients} = req.body;
    console.log("req body is",req.body)
    let myData = await Receipe.create({dishName: dishName, ingredients});
    return res.json(myData);
}

