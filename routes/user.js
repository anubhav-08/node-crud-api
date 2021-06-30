const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res)=>{
    User.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json({"error": err}));
});

router.route('/').post((req, res)=>{
    let username = req.body.username;
    let age = req.body.age;
    let user = new User({
        username,
        age
    });
    user.save()
        .then(()=>res.json({"messgage":"created"}))
        .catch(err=>res.status(400).json({"Error" : err}));
});

router.route('/:id').get((req, res)=>{
    User.findById(req.params.id)
        .then(user=>res.json(user))
        .catch(err=>res.status(400).json({"error":err}));
});

router.route('/:id').delete((req, res)=>{
    User.findByIdAndDelete(req.params.id)
        .then(()=>res.json({"Message":"user deleted successfully"}))
        .catch(err=>res.status(400).json({"error":err}));
});

module.exports = router;