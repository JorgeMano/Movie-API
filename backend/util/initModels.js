const { User } = require('../models/users.model');
const { Actor } = require('../models/actors.model');
const { ActorInMovie } = require('../models/actorsInMovies.model');
const { Movie } = require('../models/movies.model');
const { Review } = require('../models/reviews.model');

const initModel = () => {
  User.hasMany(Review);
  Review.belogsTo(User);

  Movie.hasMany(Review);
  Review.belongsTo(Movie);

  Movie.belongsToMany(Actor, { through: ActorInMovie });
  Actor.belongsToMany(Movie, { through: ActorInMovie });
};

module.exports = { inirModels };
