const express = require('express');

const {
  getAllActor,
  getActorById,
  createNewActor,
  updateActor,
  deleteActor
} = require('../controller/actors.controller');

const router = express.Router();

router.get('/', getAllActor);
router.get('/:id', getActorById);
router.post('/', createNewActor);
router.patch('/:id', updateActor);
router.delete('/:id', deleteActor);

module.exports = { actorsRouter: router };
