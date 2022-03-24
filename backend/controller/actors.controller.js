//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { Actor } = require('../models/actors.model');
const { Movie } = require('../models/movies.model');
const { User } = require('../models/users.model');
const { Review } = require('../models/reviews.model');

const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObject');

dotenv.config({ path: './config.env' });
/*
exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    where: { status: 'active' },
    include: [
      {
        model: Movie,
        include: [
          {
            model: Review,
            include: [
              {
                model: User,
                attributes: { exclude: ['password'] }
              }
            ]
          }
        ]
      },
      { model: Review, include: [{ model: Movie }] }
    ]
  });
  res.status(200).json({
    status: 'success',
    data: { actors }
  });
});
*/
exports.getActorById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const actor = await Actor.findOne({ where: { id } });

  if (!actor) {
    return next(new AppError(404, 'Actor not found'));
  }
  res.status(200).json({
    status: 'success',
    data: {
      actor
    }
  });
});

exports.createNewActor = catchAsync(async (req, res, next) => {
  const { name, country, oscarsPrizes, rating, age, profilePic } = req.body;
  if (!name || !country || !oscarsPrizes || !rating || !age || !profilePic) {
    return next(
      new AppError(
        400,
        'Must provide a valid, name, country, oscarsPrizes, rating, age, profilePic'
      )
    );
  }
  const newActor = await Actor.create({
    name,
    country,
    oscarsPrizes,
    rating,
    age,
    profilePic
  });
  res.status(200).json({
    status: 'success',
    data: {
      newActor
    }
  });
});

exports.updateActor = async (req, res) => {
  try {
    const { id } = req.params;
    const data = filterObj(req.body, 'name', 'country', 'age');
    const actor = await Actor.findOne({
      where: { id: id, status: 'active' }
    });
    if (!actor) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update actor, invalid ID'
      });
      return;
    }
    await actor.update({ ...data });
    res.status(204).json({
      status: 'success'
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteActor = async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await Actor.findOne({
      where: { id: id, status: 'active' }
    });
    if (!actor) {
      res.status(404).json({
        status: 'error',
        message: 'Cant delete actor, invalid ID'
      });
      return;
    }
    await actor.update({ status: 'deleted' });
    res.status(204).json({
      status: 'success'
    });
  } catch (error) {
    console.log(error);
  }
};
