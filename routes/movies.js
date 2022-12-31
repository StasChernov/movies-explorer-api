const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
}), deleteMovie);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(/(https?:\/\/)([www.]?[a-zA-Z0-9-]+\.)([^\s]{2,})/),
    trailerLink: Joi.string().required().regex(/(https?:\/\/)([www.]?[a-zA-Z0-9-]+\.)([^\s]{2,})/),
    thumbnail: Joi.string().required().regex(/(https?:\/\/)([www.]?[a-zA-Z0-9-]+\.)([^\s]{2,})/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

module.exports = router;
