const express = require('express');
const router = express.Router();
const Projects = require('../data/helpers/projectModel.js');

router.get('/', (req,res) =>{
    Projects.get()
    .then(projects =>{res.status(200).json(projects);})
    .catch(err =>{res.status(500).json({errorMessage:'Failed to get projects'})})
});//working

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Projects.get(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch((err) => {
            res.status(500).json({ error: "Couldn't find the project."})
        })
})// working

router.post('/', (req, res) =>{
    Projects.insert(req.body)
    .then(projects =>{
        res.status(201).json(projects)
    })
    .catch(err =>{res.status(500).json({errorMessage:'Failed to post project'})})
})//working

router.get('/actions/:id', (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(projects=> {
        if(projects){
            res.status(200).json(projects)
        } else {
            res.status(404).json({ error: 'ID not found'})
        }
    })
    .catch(() => {
        res.status(500).json({ errorMessage: 'Could not retrieve project Actions'})
    })
})//working


router.delete('/:id', (req,res) =>{
    const id = req.params.id;
    Projects.remove(id)
    .then(data =>{res.status(200).json({message:'Delete Succesful'})})
    .catch(err =>{res.status(500).json({errorMessage:'Failed to delete action'})})
})//working

router.put('/:id', (req, res)=> {
    const {name, description} = req.body;
    if(!name || !description){
        res.status(400).json({ error: ' Name and Description Required'})
    }
    Projects.update(req.params.id, req.body)
    .then( proj => {
        if(proj){
            res.status(200).json(proj)
        } else {
            res.status(404).json({ error: 'cannot find that post'})
        }
    })
    .catch(() => {
        res.status(500).json({ errorMessage: 'Failed to edit '})
    })
})// working


module.exports = router; 