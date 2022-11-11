const mongoose = require("mongoose");
const DB=process.env.MONGO_URI

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connnection successful");
}).catch((err) => console.log("no connection", err));