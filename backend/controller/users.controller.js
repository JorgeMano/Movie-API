const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//const { Actor } = require('../models/actors.model');
//const { Movie } = require('../models/movies.model');
const { User } = require('../models/users.model');

const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObject');

dotenv.config({ path: './config.env' });

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({
        where: { status: 'active' },
        include: [
            {
                
            }
        ]
    });
    res.status(200).json({
        status: 'success',
        data: { users }
    });
});

exports.getUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if(!user){
        return next(new AppError(404, 'User not found'));
    }
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.createNewUser = catchAsync(async (req, res, next) => {
    const { username, email, password, role } = req.body;
    if(!username || !email || !password || !role ) {
        return next(new AppError(400, 'Must provide a valid, username, email, password, role'));
    };
    const newUser = await User.create({
        username, 
        email,
        password,
        role
    });
    res.status(200).json({
        status: 'success',
        data: {
            newUser
        }
    });
});

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = filterObj(
            req.body,
            'username',
            'email',
            'password',
            'role'
        );
        const user = await User.findOne({
            where: { id: id, status: 'active' }
        });
        if(!user) {
            res.status(404).json({
                status: 'error',
                message: 'Cant update user, invalid ID'
            });
            return;
        }
        await user.update({ ...data });
        res.status(204).json({
            status: 'success'
        });
    }  catch (error) {
        console.log(error);       
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: {id: id, status: 'active'}
        });
        if(!user){
            res.status(404).json({
                status: 'error',
                message: 'Cant delete user, invalid ID'
            });
            return;
        }
        await user.update({ status: 'deleted' });
        res.status(204).json({
            status: 'success'
        });
    } catch (error) {
        console.log(error);
    }
};
