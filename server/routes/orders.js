const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, updateStatus, getStats } = require('../controllers/orderController');
const { auth, adminOnly } = require('../middleware/authMiddleware');

router.post('/', auth, createOrder);
router.get('/myorders', auth, getMyOrders);
router.get('/', auth, adminOnly, getAllOrders);
router.patch('/:id/status', auth, adminOnly, updateStatus);
router.get('/admin/stats', auth, adminOnly, getStats);

module.exports = router;
