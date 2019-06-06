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

//I wanted to try async
router.get('/', async (req, res) => {
    try {
        const posts = await postDB.get();
        res.status(200).json(posts);
    } catch(err) {
        res.status(418).json(err);
    }
});

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

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const post = await postDB.get(id);
        res.status(200).json(post);
    } catch(err) {
        res.status(418).json(err);
    }
});

router.post('/', async (req, res) => {
    try
})
router.delete('/:id', async (req, res) => {
    try {
        const
    }

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;