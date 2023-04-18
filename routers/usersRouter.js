const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'mysecret';

const generateToken = (data) => {
  return jwt.sign(data, secret, { expiresIn: '1800s' });
};

//Create new user
router.post('/', (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  bcrypt
  .hash(password, 10)
  .then((hashedPassword) => {
    User.create({ first_name, last_name, email,password: hashedPassword })
    .then(data => res.json(data))
    .catch(err => {
      console.log(err.message);
      res.sendStatus(500);
    });
  })
  .catch((err) => {
    console.log(err.message);
    res.sendStatus(500);
  });
  
});


router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).send('Invalid credentials');
      }
  
      bcrypt.compare(password, user.password)
      .then((validPassword) => {
        if (!validPassword) {
          return res.status(400).send('Invalid credentials');
        }
        const token = generateToken({ email: user.email });
  
        res.json({ token });
      });
    });
  });

  

// router.get('/', (req, res) => {
//   Film.find({})
//     .then(data => res.json(data))
// });

// router.get('/:id', (req, res) => {
//   const { id } = req.params;
//   Film.findById(id)
//     .then(data => {
//       if (!data) {
//         return res.sendStatus(404); // Send 404 if no film is found with the specified _id
//       }
//       res.json(data);
//     })
//     .catch(err => {
//       console.log(err.message);
//       res.sendStatus(500);
//     });
// });

// router.put('/:id', (req, res) => {
//   const { id } = req.params;
//   const { name, year, genre } = req.body;
//   Film.findByIdAndUpdate(id, { name, year, genre }, { new: true })
//     .then(data => {
//       if (!data) {
//         return res.sendStatus(404); // Send 404 if no film is found with the specified _id
//       }
//       res.json(data);
//     })
//     .catch(err => {
//       console.log(err.message);
//       res.sendStatus(500);
//     });
// });

// router.delete('/:id', (req, res) => {
//   const id = req.params.id;
//   Film.findByIdAndDelete(id)
//     .then(data => {
//       if (!data) {
//         return res.sendStatus(404); // Send 404 if no film is found with the specified _id
//       }
//       res.sendStatus(204);
//     })
//     .catch(err => {
//       console.log(err.message);
//       res.sendStatus(500);
//     });
// });
   

module.exports = router


