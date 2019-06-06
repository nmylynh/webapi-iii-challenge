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


// custom middleware

function validatePostId(req, res, next) {

};

//I wanted to try AYYYYY sync, it's lit
router.get('/', async (req, res) => {
    try {
        const posts = await postDB.get();
        res.status(200).json(posts);
    } catch(err) {
        res.status(418).json('err');
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

router.post('/', async (req, res) => {
    try {
        const newPost = await postDB.insert(req.body);
        res.status(201).json(newPost);
    } catch(err) {
        res.status(418).json({message: `I'm a teapot.`, err});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const updatePost = await postDB.update(id, req.body);

        updatePost ? 
         res.status(200).json(updatePost) : res.status(404).end();
    } catch(err) {
        res.status(418).json({message: `I'm a teapot.`, err});
    }
});

router.delete('/:id', async (req, res) => {
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