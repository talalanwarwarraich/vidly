const Joi = require('joi');
const express = require('express');

const router = express.Router();

const apiEndPoint = '/';
const apiEndPointWithId = `/:id`;

const genreCollection = [
    {
        id: 1,
        name: 'Action'
    },
    {
        id: 2,
        name: 'Horror'
    },
    {
        id: 3,
        name: 'Comedy'
    },
    {
        id: 4,
        name: 'Adventure'
    }
]

//get generes
router.get(apiEndPoint, (req, res) => {
    res.send(genreCollection);
});

//post new genre
router.post(apiEndPoint, (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    const genre = {
        id: genreCollection.length + 1,
        name: req.body.name
    };
    genreCollection.push(genre);
    res.send(genre);
})

//update existing genre
router.put(apiEndPointWithId, (req, res) => {
    const genre = genreCollection.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`There was no genre for id ${req.params.id}`);

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    genre.name = req.body.name;
    const index = genreCollection.indexOf(genre);
    genreCollection[index] = genre;
    res.send(genre);
})

//delete existing genre
router.delete(apiEndPointWithId, (req, res) => {
    const genre = genreCollection.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`There was no genre for id ${req.params.id}`);

    const index = genreCollection.indexOf(genre);
    genreCollection.splice(index, 1);
    res.send(genre);
})

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().required().min(3)
    })
    return schema.validate(genre);
}

module.exports = router;