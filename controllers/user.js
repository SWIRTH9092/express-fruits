//-------------------------------------------
// Import Our Dependencies
//-------------------------------------------

const express = require("express") // bring in express to make our app.
const User = require("../models/user")
const bcrypt = require("bcryptjs")
// const { model } = require("mongoose")

//-------------------------------------------
// Create Router
//-------------------------------------------

const router = express.Router()  // router will have all routes attached to it.

//-------------------------------------------
// Routes
//-------------------------------------------

// The Signup Routes (Get => form, post => submit form)
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})

router.post("/signup", async (req, res) => {
    // encrypt password
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    
    //create the new user
    User.create(req.body, (err, user) => {
        //redirect to login page
        res.redirect("/user/login")
    })
})

//The login Routes (Get => form, post => submit form)
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

router.post("/login", (req, res) => {
    // get the data from the request body
    const { username, password } = req.body;
    User.findOne ({ username }, (err, user) => {
        if (!user) {
            res.send("user doesn't exist")
        } else {
            // check if password matches
            const result = bcrypt.compareSync(password, user.password);
            if (result) {
                req.session.username = username
                req.session.loggedIn = true
                res.redirect("/fruits")
            } else {
                res.send ("wrong password")
            }
        }    
    })
})

// to end a login session
router.get("/logout", (req, res) => {
    //destroy the session and redirect to main page
    req.session.destroy((err) => {
        res.redirect("/")
    })
})

//-------------------------------------------
// Export the Router
//-------------------------------------------
module.exports = router