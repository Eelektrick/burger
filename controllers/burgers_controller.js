//connections
let express = require("express");
let router = express.Router();
let burger = require("../models/burger.js");

//get route to the index
router.get("/", function(req, res){
    burger.all(function(data){
        let hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res){
    burger.create(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result){
        res.json({id: result.insertId})
    });
});

router.put("/api/burgers/:id", function(req,res){
    let condition = "id = " + req.params.id;

    burger.update({
        devoured: req.body.devoured
    },condition, function(result){
        if (result.changedRows === 0){
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } 
         else{
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function(req,res){
    let condition = "id = " + req.params.id;

    burger.delete(condition, function(result){
        if(result.affectedRows == 0){
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }else{
            res.status(200).end();
        }
    });
})

module.exports = router;