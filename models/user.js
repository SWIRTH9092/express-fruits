//----------------------------------------
//  Mongoose connection
//----------------------------------------
const mongoose = require('./connection')

//----------------------------------------
//  User Model
//----------------------------------------

const { Schema, model } = mongoose  //destructuring , grabbing mode and Schema off mongoose variable

// make user schema
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// make user model
const User = model("User", userSchema)

//----------------------------------------
//  Export Model
//----------------------------------------
module.exports = User