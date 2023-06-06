const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter username"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already taken"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }

},
{
    timestamps: true
})



module.exports = mongoose.model("Users", userSchema)