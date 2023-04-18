const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const Film = require('../models/Film')
const {verifyToken} = require('../middlewares/auth');

router.get('/protected', verifyToken, (req, res) => {
  res.send(`Hello, ${req.user.email}!`);
});
router.post('/', verifyToken, (req, res) => {
  const { name, year, genre } = req.body;
  Film.create({ name, year, genre })
    .then(data => res.json(data))
    .catch(err => {
      console.log(err.message);
      res.sendStatus(500);
    });
});

router.get('/', (req, res) => {
  Film.find({})
    .then(data => res.json(data))
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Film.findById(id)
    .then(data => {
      if (!data) {
        return res.sendStatus(404); // Send 404 if no film is found with the specified _id
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err.message);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, year, genre } = req.body;
  Film.findByIdAndUpdate(id, { name, year, genre }, { new: true })
    .then(data => {
      if (!data) {
        return res.sendStatus(404); // Send 404 if no film is found with the specified _id
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err.message);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Film.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        return res.sendStatus(404); // Send 404 if no film is found with the specified _id
      }
      res.sendStatus(204);
    })
    .catch(err => {
      console.log(err.message);
      res.sendStatus(500);
    });
});
   

module.exports = router


