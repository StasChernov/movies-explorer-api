const { constants } = require('http2');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params._id)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Фильм не найдена'));
      } else if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Запрещено'));
      } else {
        movie.remove();
        res.send(movie);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный запрос фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movieDocument) => {
      const movie = movieDocument.toObject();
      movie.owner = { _id: req.user._id };
      res.status(constants.HTTP_STATUS_CREATED).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные для фильма'));
      } else {
        next(err);
      }
    });
};