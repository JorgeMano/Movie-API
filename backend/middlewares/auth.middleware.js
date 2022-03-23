const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { promisify } = require('util');

//Models
const { User } = require('../util/appError');

//Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

dotenv.config({ path: './config.env' });

exports.validateSession = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError(401, 'Invalid session'));
  }

  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findOne({
    where: { id: decodedToken.id, status: 'active' },
    attributes: {
      exclude: ['password']
    }
  });

  if (!user) {
    return next(new AppError(401, 'Invalid session'));
  }
  console.log(user);
  next();
});
