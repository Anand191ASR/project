const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body; // [{ menuItemId, quantity }]
    if (!items || !items.length) return res.status(400).json({ message: 'No items' });

    // Compute total on server to prevent tampering
    let total = 0;
    for (const it of items) {
      const menu = await MenuItem.findById(it.menuItemId);
      if (!menu) return res.status(400).json({ message: `Menu item not found: ${it.menuItemId}` });
      if (!menu.available) return res.status(400).json({ message: `Item not available: ${menu.name}` });
      total += menu.price * it.quantity;
    }

    const order = await Order.create({
      userId: req.user._id,
      items,
      totalAmount: total
    });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('items.menuItemId');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.menuItemId').populate('userId', 'name email');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status, updatedAt: Date.now() }, { new: true });
    if (!order) return res.status(404).json({ message: 'Not found' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalMenuItems = await (await require('../models/MenuItem').countDocuments());
    const agg = await Order.aggregate([
      { $group: { _id: null, revenue: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = agg[0]?.revenue || 0;
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    res.json({ totalOrders, totalMenuItems, totalRevenue, pendingOrders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
