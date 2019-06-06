const express = require('express');
const router = express.Router();
const postDB = require('../posts/postDb');
const userDB = require('./userDb');

// custom middle jessie ware

const validatePostProp = async (req, res, next) => {
    try {
    const {user_id} = req.body;
    const user = await userDB.getById(user_id);

    user 
    ? next()
    : res.status(404).json({message: "invalid id"});  
    } catch(err) {
        res.status(400).json({message: "missing user id"});
    }
}

const validateUserId = async (req, res, next) => {
    try {
    const {id} = req.params;
    const user = await userDB.getById(id);

    user 
    ? next()
    : res.status(404).json({message: "invalid id"});  
    } catch(err) {
        res.status(400).json({message: "missing user id"});
    }
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
        const users = await userDB.get();

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
        const posts = await userDB.getUserPosts(id);

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
        ? res.status(200).json({message: "successfully updated user"})
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
