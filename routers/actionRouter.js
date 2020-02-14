const express = require('express');
const router = express.Router();
const Actions = require('../data/helpers/actionModel.js');


router.post('/', (req, res) => {
    const {project_id, description, notes} = req.body;

    if(!project_id || !description || !notes){
        res.status(400).json({ error: 'Missing required field or fields'})
    }

    Actions.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Cannot add the action "})
    })
})




router.get('/', (req, res) => {
    Actions.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Could not get action info"})
    })
}) //working

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



router.put('/:id', (req,res) => {
    const {project_id, notes} = req.body;

    if(!project_id || !notes){
        res.status(400).json({ error: 'Missing required fields'})
    }

    Actions.update(req.params.id, req.body)
    .then(action => {
        if(action){
            res.status(200).json(action)
        } else {
            res.status(404).json({ error: 'cannot find the action you are looking for, please retry with another ID'})
        }
    })
    .catch( err => {
        res.status(500).json({errorMessage: 'Could not update action'})
    })
})//working, had to ditch description



router.delete('/:id', (req,res) => {
    const id = req.params.id

    Actions.remove(id)
    .then( action => {
        if(action){
            res.status(204).end()
        } else {
            res.status(404).json({ error: 'ID was not found'})
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'Could not delete from Database' })
    })
})

module.exports = router; 