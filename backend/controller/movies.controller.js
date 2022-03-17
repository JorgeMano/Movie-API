const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//const { Actor } = require('../models/actors.model');
const { Movie } = require('../models/movies.model');
//const { User } = require('../models/users.model');

const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObject');

dotenv.config({ path: './config.env' });

exports.getAllMovies = catchAsync(async (req, res, next) => {
    
});

exports.getMovieById = catchAsync(async (req, res, next) => {
    
});

exports.createNewMovie = catchAsync(async (req, res, next) => {
    
});

exports.updateMovie = async (req, res) => {
};

exports.deleteMovie = async (req, res) => {
};
