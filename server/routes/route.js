const express = require('express');
const { adduser, getall, getuser, edituser, deleteuser , first} = require('../controller/user-controller.js');

const router = express.Router();

router.post('/add', adduser);
router.get('/all', getall);
router.get('/:id', getuser);
router.put('/:id', edituser);
router.delete('/:id', deleteuser);

module.exports = router;
