const express = require('express');
const router = express.Router();
const { getAll, getById, create, update, remove } = require('../controllers/menuController');
const { auth, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', auth, adminOnly, create);
router.put('/:id', auth, adminOnly, update);
router.delete('/:id', auth, adminOnly, remove);

module.exports = router;
