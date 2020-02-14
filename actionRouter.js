const express = require('express');

const Actions = require('./data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) =>{
    Actions.get()
    .then(actions =>{
        res.status(200).json(actions)
    })
    .catch(err =>{
        res.status(500).json({errorMessage:'Failed to get actions'})
    })
})//working

router.get('/:id', (req,res) => {
    const {id} = req.params;
    Actions.get(id)
    .then( action => {
        if(!action){
            res.status(404).json({ errorMessage: 'The ID does not exist'})
        } else {
            res.status(200).json(action)
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'Could not get specific action, try again later'})
    })
})//working

router.delete('/:id', (req,res) =>{
    const id = req.params.id;
    Actions.remove(id)
    .then(data =>{res.status(200).json({message:'Delete Succesful'})})
    .catch(err =>{res.status(500).json({errorMessage:'Failed to delete action'})})

})//working

router.put('/:id', (req, res) => {
    if (!req.body.project_id || !req.body.description) {
        res.status(400).json({errorMessage: "Please provide a project_id and description"})
    } else {
        Actions.update(req.params.id, req.body)
            .then(post => {
                if(post) {
                    res.status(200).json(req.body)
                } else {
                    res.status(404).json({message: "Failed to edit"})
                }
            })
            .catch(error => {
                res.status(500).json({errorMessage: 'There was an error saving your changes' })
            })
    }
})//working

router.post('/', (req,res) => {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({errorMessage: "Please provide a project_id and description"})
    } else {
        Actions.get(req.body.project_id)
        .then(action => {
            console.log(action)
            if(action === null) {
                res.status(404).json({message: "The specified ID does not exist"})
            } else {
                Actions.insert(req.body)
                .then(post => {
                    res.status(201).json(req.body)
                })
                .catch(err => {
                    res.status(500).json({errorMessage: 'There was an error saving this to the database' })
                })
            }
        })
    }
})




module.exports = router;