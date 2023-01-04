const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
const { login, createUser } = require('../controllers/users');
const { userLoginValidator, userRegisterValidator } = require('../validators/users');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');

router.post('/signin', userLoginValidator, login);
router.post('/signup', userRegisterValidator, createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
