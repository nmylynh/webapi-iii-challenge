const express = require('express');
const router = express.Router();
const postDB = require('./postDb');
const userDB = require('../users/userDb');

// custom middle jessie ware

const validateUserId = async (req, res, next) => {
    const {user_id} = req.body;
    const user = await userDB.getById(user_id);

    user 
    ? req.user = user.json() 
    : res.status(400).json({message: "invalid user id"});
    next();      
}

const validatePost = (req, res, next) => {
    const {user_id, text} = req.body;
    user_id && text 
    ? next() 
    : res.status(400).json({message: "missing post data or text field"});
} 


const validateUser = (req, res, next) => {
    const { name } = req.body;
    name 
    ? next() 
    : res.status(400).json({message: "missing required name field"});
};

//endpoints

router.get('/', async (req, res) => {
    try {
        const users = await usersDB.get();
        res.status(200).json(users);
    } catch(err) {
        res.status(418).json('err');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userDB.getById(id);
        res.status(200).json(user);
    } catch(err) {
        res.status(418).json({message: `I'm a teapot.`, err});
    }
}); 

router.get('/:id/posts', async (req, res) => {
    try {
        const {id} = req.params;
        const posts = await usersDB.getUserPosts(id);
        res.status(200).json(posts);
    } catch (err) {
        res.status(418).json({message: `I'm a teapot.`, err});
    }
});

router.post('/', validateUser, async (req, res) => {
    try {
        const newUser = await userDB.insert(req.body);
        res.status(201).json(newUser);
    } catch(err) {
        res.status(418).json({message: `I'm a teapot.`, err});
    }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
    try {
        const newPost = await postDB.insert(req.body);
        res.status(201).json(newPost);
    } catch(err) {
        res.status(418).json({message: `I'm a teapot.`, err});
    }
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});


module.exports = router;
