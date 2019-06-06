const express = require('express');
const router = express.Router();
const postDB = require('./postDb');
const userDB = require('../users/userDb');

// router.get('/', (req, res) => {
//     postDB
//     .get()
//     .then(posts => {
//         res.status(200).json(posts);
//     })
//     .catch(err => {
//         res.status(418).json({ //i'm a teapot, short and stout
//             success: false,
//             err
//         });
//     });
// });


// router.get('/:id', (req, res) => {
//     const {id} = req.params;
//     postDB
//     .get(id)
//     .then(post => {
//         res.status(200).json(post)
//     })
//     .catch(err => {
//         res.status(404).json({
//             success: false,
//             err
//         });
//     });
// });

// custom middle jessie ware

const validateUserId = async (req, res, next) => {
    const {user_id} = req.body;
    const user = await userDB.get(user_id);

    user 
    ? req.user = user.json() 
    : res.status(400).json({message: "invalid user id"});
    next();      
}

// i didn't want to write two error catchers i'm real lazy

const validatePost = (req, res, next) => {
    const {user_id, text} = req.body;
    
    user_id && text 
    ? next() 
    : res.status(400).json({message: "missing post data or text field"});
} 

//I wanted to try AYYYYY sync, it's lit
router.get('/', async (req, res) => {
    try {
        const posts = await postDB.get();

        res.status(200).json(posts);
    } catch(err) {
        res.status(418).json({message: `I'm a teapot.`, err});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const post = await postDB.getById(id);

        res.status(200).json(post);
    } catch(err) {
        res.status(418).json({message: `I'm a teapot.`, err});
    }
});

router.post('/', validateUserId, validatePost, async (req, res) => {
    try {
        const newPost = await postDB.insert(req.body);

        res.status(201).json(newPost);
    } catch(err) {
        res.status(418).json({message: `I'm a teapot.`, err});
    }
});

router.put('/:id', validateUserId, validatePost, async (req, res) => {
    try {
        const {id} = req.params;
        const updatePost = await postDB.update(id, req.body);

        updatePost 
        ? res.status(200).json(updatePost) 
        : res.status(404).end();
    } catch(err) {
        res.status(418).json({message: `I'm a teapot.`, err});
    }
});

router.delete('/:id', validateUserId, async (req, res) => {
    try {
        const {id} = req.params;
        const success = await postDB.remove(id);
        
        success ?
         res.status(204).end() : res.status(404).end();
    } catch(err) {
        res.status(418).json({message: `I'm a teapot.`, err});
    }
});


module.exports = router;