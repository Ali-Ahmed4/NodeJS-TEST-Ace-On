const mongoose = require("mongoose")

const connection = async () => {
    try
    {
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        
        console.log("DB connected")
    }
    catch(err)
    {
        console.log(`Error: ${err}`)
        process.exit(1)
    }
    

}


module.exports = connection