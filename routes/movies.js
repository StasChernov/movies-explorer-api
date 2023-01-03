const router = require('express').Router();
const { movieDeleteValidator, movieCreateValidator } = require('../validators/movies');

const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.delete('/:_id', movieDeleteValidator, deleteMovie);

router.post('/', movieCreateValidator, createMovie);

module.exports = router;
