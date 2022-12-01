//-------------------------------------------
// Import Our Dependencies
//-------------------------------------------

const express = require("express"); // bring in express to make our app.
const { default: mongoose } = require("mongoose");
const Fruit = require("./fruit")

mongoose.connection.on('open', () => {

        // array of starter fruits
        const startFruits = [
            { name: "Orange", color: "orange", readyToEat: false },
            { name: "Grape", color: "purple", readyToEat: false },
            { name: "Banana", color: "orange", readyToEat: false },
            { name: "Strawberry", color: "red", readyToEat: false },
            { name: "Coconut", color: "brown", readyToEat: true },
            ]
    
        // Delete all fruits
        Fruit.deleteMany({}, (err, data) => {
        // Seed Starter Fruits
        Fruit.create(startFruits,(err, data) => {
            // send created fruits as response to confirm creation
            console.log(data)
            }
        );
    });

})
