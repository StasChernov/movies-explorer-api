const router = require('express').Router();
const { userUpdateValidator } = require('../validators/users');

const {
  updateUser,
  getUserMe,
} = require('../controllers/users');

router.get('/me', getUserMe);
router.patch('/me', userUpdateValidator, updateUser);

module.exports = router;
