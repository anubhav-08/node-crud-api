const router = require('express').Router();
let Excercise = require('../models/excercise.model');
let User = require('../models/user.model');

router.route('/').get((req, res)=>{
    Excercise.find()
        .then(excs=>res.json(excs))
        .catch(err=>res.status(400).json({"err": err}));
});

router.route('/').post((req, res)=>{
    
    let description = req.body.description;
    let duration = Number(req.body.duration);
    let date = Date(req.body.date);
    User.findById(req.body.user_id)
    .then(user=>{
        console.log(user);
        let excercise = new Excercise({
            description,
            duration,
            date,
            user,
        });
        excercise.save()
            .then(()=>res.json({"messgage":"created"}))
            .catch(err=>res.status(400).json({"Error" : err}));
    })
    .catch(err=>res.status(400).json({"Error" : err}));    
});

router.route('/:id').delete((req, res)=>{
    const id = req.params.id;
    Excercise.findByIdAndDelete(id)
        .then(()=>res.json({"message" : "Excercise deleted successfully"}))
        .catch(err=>res.status(400).json({"err": err}));
});

router.route('/').put((req, res)=>{
    if(!req.body){
        return res.json({"message" : "please enter details to be updated"});
    }
    const id = req.params.id;
    Excercise.findById(id)
    .then(excercise=>{
        excercise.name = req.body.name || excercise.name;
        excercise.duration = req.body.duration || excercise.duration;
        excercise.date = req.body.date || excercise.date;
        excercise.save()
        .then(()=>res.json({"message" : "excercise updated successfully"}))
        .catch(err => res.json({"error" : err.message}));
    })
    .catch(err => res.json({"error" : err.message}));
});
module.exports = router;