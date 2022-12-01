//-------------------------------------------
// Import Our Dependencies
//-------------------------------------------

const express = require("express") // bring in express to make our app.
const Fruit = require("../models/fruit")

//-------------------------------------------
// Create Router
//-------------------------------------------

const router = express.Router()  // router will have all routes attached to it.
//-------------------------------------------
// Router Middleware
//-------------------------------------------
// Authorization Middleware
router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/user/login")
  }
});

//-------------------------------------------
// Routes
//-------------------------------------------

// index route
router.get("/", (req, res) => {

    //Get all fruits from mongo and send them back
    Fruit.find({})
    .then((fruits) => {
        // res.json(fruits)
        res.render("fruits/index.ejs", { fruits })
    })
    .catch(err => console.log(err))
});

// new route
router.get("/new", (req, res) => {
  res.render("fruits/new.ejs")
})

// create route
router.post("/", (req, res) => {
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false
  
  // create the new fruit
  Fruit.create(req.body, (err, fruit) => {
         // redirect the user back to the main fruits page after fruit created
      res.redirect("/fruits")
  })
})

// edit route
router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id
  // get the fruit from the database
  Fruit.findById(id, (err, fruit) => {
      // render template and send it fruit
//        res.json(fruit)
        res.render("fruits/edit.ejs", {fruit})
  })
})

//update route
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id
  // check if the readyToEat property should be true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false
  // update the fruit
  Fruit.findByIdAndUpdate(id, req.body, {new: true}, (err, fruit) => {
      // redirect user back to main page when fruit 
      // res.redirect("/fruits")
      res.redirect(`/fruits/${req.params.id}`)
  })
})
router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id
  // delete the fruit
  Fruit.findByIdAndRemove(id, (err, fruit) => {
      // redirect user back to index page
      res.redirect("/fruits")
  })
})

// show route
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id

  // find the particular fruit from the database
  Fruit.findById(id, (err, fruit) => {
      // render the template with the data from the database
      res.render("fruits/show.ejs", {fruit})
  })
})

    // Fruit.findById(id, (err, fruit) => {
    //     // render the template with the data from the database
    //     //res.send(req.params)
    //     res.json(fruit)
    //     res.render("fruits/show.ejs", {fruit})
    // })


//----------------------------------------
//  Export Router to use in other files
//----------------------------------------
module.exports = router