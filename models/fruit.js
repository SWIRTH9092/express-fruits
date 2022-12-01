//----------------------------------------
//  Mongoose connection
//----------------------------------------
const mongoose = require('./connection')

//----------------------------------------
//  Fruits Model
//----------------------------------------

const { Schema, model } = mongoose  //destructuring , grabbing mode and Schema off mongoose variable

// make fruits schema
const fruitsSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

// make fruit model
const Fruit = model("Fruit", fruitsSchema)

//----------------------------------------
//  Export Fruit
//----------------------------------------
module.exports = Fruit