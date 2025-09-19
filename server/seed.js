require('dotenv').config();
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const MenuItem = require('./models/MenuItem');

const seed = async () => {
  await connectDB(process.env.MONGO_URI);

  // create admin
  const adminEmail = 'admin@restaurant.com';
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    const hashed = await bcrypt.hash('admin123', 10);
    admin = await User.create({ name: 'Admin', email: adminEmail, password: hashed, role: 'admin' });
    console.log('Admin created', adminEmail, 'password: admin123');
  } else {
    console.log('Admin already exists');
  }

  // sample menu items
  const sample = [
    { name: 'Margherita Pizza', description: 'Classic cheese & tomato', price: 8.99, category: 'Main', image: '', available: true },
    { name: 'Caesar Salad', description: 'Romaine, parmesan, croutons', price: 6.5, category: 'Appetizer', image: '', available: true },
    { name: 'Chocolate Brownie', description: 'Warm with ice cream', price: 4.5, category: 'Dessert', image: '', available: true }
  ];
  for (const s of sample) {
    const exists = await MenuItem.findOne({ name: s.name });
    if (!exists) {
      await MenuItem.create(s);
      console.log('Inserted', s.name);
    }
  }

  console.log('Seeding done');
  process.exit(0);
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
