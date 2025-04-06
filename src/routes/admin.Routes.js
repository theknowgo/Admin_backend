// // src/routes/adminRoutes.js
// const express = require('express');
// const router = express.Router();
// const { authenticate, restrictTo } = require('../middleware/auth');

// // Example: Super Admin-only route
// router.get('/super-admin-dashboard', authenticate, restrictTo('Super Admin'), (req, res) => {
//   res.status(200).json({ message: 'Welcome to the Super Admin Dashboard' });
// });

// // Example: Product Manager-only route
// router.get('/product-manager-dashboard', authenticate, restrictTo('Product Manager'), (req, res) => {
//   res.status(200).json({ message: 'Welcome to the Product Manager Dashboard' });
// });

// // Example: Tech Manager-only route
// router.get('/tech-manager-dashboard', authenticate, restrictTo('Tech Manager'), (req, res) => {
//   res.status(200).json({ message: 'Welcome to the Tech Manager Dashboard' });
// });

// module.exports = router;
