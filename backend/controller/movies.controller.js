//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { Review } = require('../models/reviews.model');
const { Movie } = require('../models/movies.model');
const { User } = require('../models/users.model');
const { Actor } = require('../models/actors.model');

const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObject');

dotenv.config({ path: './config.env' });

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
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
    data: { movies }
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const movie = await Movie.findOne({ where: { id } });

  if (!movie) {
    return next(new AppError(404, 'Movie not found'));
  }
  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});

exports.createNewMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, img, genre, Actor } = req.body;
  if (!title || !description || !duration || !rating || !img || !genre) {
    return next(
      new AppError(
        400,
        'Must provide a valid, title, description, duration, rating, img, genre'
      )
    );
  }
  const newMovie = await Movie.create({
    title,
    description,
    duration,
    rating,
    img,
    genre
  });

  const actorsInMoviesPromises = actors.map(async (actorId) => {
    return await ActorInMovie.create({ actorId, movieId: newMovie.id });
  });

  await Promise.all(actorsInMoviesPromises);
  
  res.status(200).json({
    status: 'success',
    data: {
      newMovie
    }
  });
});

exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const data = filterObj(
      req.body,
      'title',
      'description',
      'duration',
      'genre'
    );
    const movie = await Movie.findOne({
      where: { id: id, status: 'active' }
    });
    if (!movie) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update movie, invalid ID'
      });
      return;
    }
    await movie.update({ ...data });
    res.status(204).json({
      status: 'success'
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findOne({
      where: { id: id, status: 'active' }
    });
    if (!movie) {
      res.status(404).json({
        status: 'error',
        message: 'Cant delete movie, invalid ID'
      });
      return;
    }
    await movie.update({ status: 'deleted' });
    res.status(204).json({
      status: 'success'
    });
  } catch (error) {
    console.log(error);
  }
};
