const User = require('../models/User');

// GET all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
};

// POST: Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create user', error: err.message });
  }
};

// GET: Return a random user (fun & useful for testing)
exports.getRandomUser = async (req, res) => {
  try {
    const count = await User.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomUser = await User.findOne().skip(random);
    res.status(200).json(randomUser || { message: 'No users found' });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching random user', error: err.message });
  }
};

