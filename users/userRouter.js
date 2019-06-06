const express = require('express');
const router = express.Router();
const postDB = require('./postDb');
const userDB = require('../users/userDb');

// custom middle jessie ware

const validatePostProp = async (req, res, next) => {
    const {user_id} = req.body;
    const user = await userDB.getById(user_id);

    user 
    ? req.user = user.json() 
    : res.status(400).json({message: "invalid user id"});
    next();      
}

const validateUserId = async (req, res, next) => {
    const {id} = req.params;
    const user = await userDB.getById(id);

    user
    ? req.user = user.json()
    : res.status(400).json({message: "invalid user id"});
    next();
}

const validatePost = (req, res, next) => {
    const {user_id, text} = req.body;

    user_id
    ? text
    ? next()
    : res.status(400).json({message: "missing text field"})
    : res.status(400).json({message: "missing post data"});
} 

const validateUser = (req, res, next) => {
    const { name } = req.body;

    name 
    ? next() 
    : res.status(400).json({message: "missing required name field"});
};

//endpoints
//P.S: I won't actually use 418 for real programs. I'm just having a little fun.

router.get('/', async (req, res) => {
    try {
        const users = await usersDB.get();

        res.status(200).json(users);
    } catch(err) {
        res.status(418).json({message: `I'm a teapot.`, err});
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

router.post('/:id/posts', validatePostProp, validatePost, async (req, res) => {
    try {
        const newPost = await postDB.insert(req.body);

        res.status(201).json(newPost);
    } catch(err) {
        res.status(418).json({message: `I'm a teapot.`, err});
    }
});

router.put('/:id', validateUser, validateUserId, async (req, res) => {
    try {
        const {id} = req.params;
        const updateUser = await userDB.update(id, req.body);

        updateUser
        ? res.status(200).json(updateUser)
        : res.status(404).end()
    } catch(err) {
        res.status(418).json({message: `I'm a teapot.`, err});
    }
});

router.delete('/:id', validateUserId, async (req, res) => {
    try {
        const {id} = req.params;
        const success = await userDB.remove(id);

        success ?
         res.status(204).end() : res.status(404).end();
    }  catch(err) {
         res.status(418).json({message: `I'm a teapot.`, err});
    }
});



module.exports = router;
