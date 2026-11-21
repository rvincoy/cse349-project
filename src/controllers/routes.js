// TODO: Add import statements for controllers and middleware
import { homePage, aboutPage, testErrorPage } from './index.js';
import contactRoutes from './forms/contact.js';
import priorityRoutes from './forms/priority.js';
import statusRoutes from './forms/status.js';
import registrationRoutes from './forms/registration.js';
import loginRoutes from './forms/login.js';
import { processLogout, showDashboard } from './forms/login.js';
import usersRoutes, { showPromoteUserForm, requireAdmin } from './forms/users.js';
import { requireLogin } from '../middleware/auth.js';

import { Router } from 'express';

// Create a new router instance
const router = Router();

// TODO: Add route definitions
// Home and basic pages
router.get('/', homePage);
router.get('/about', aboutPage);

// Contact form routes
router.use('/contact', contactRoutes);

// Add contact-specific styles to all contact routes
router.use('/contact', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/contact.css">');
    next();
});
router.use('/addpriority', priorityRoutes);
router.use('/addstatus', statusRoutes);


// Registration routes
router.use('/register', registrationRoutes);
router.use('/register', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/registration.css">');
    next();
});

router.use('/login', loginRoutes);
// Add login-specific styles to all login routes
router.use('/login', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/login.css">');
    next();
});

// Login routes (form and submission)
router.use('/login', loginRoutes);

// Authentication-related routes at root level
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);

// Route to trigger a test error
router.get('/test-error', testErrorPage);

router.get('/users', requireLogin, requireAdmin, showPromoteUserForm);
router.use(usersRoutes);

export default router;