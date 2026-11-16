import { getAllUsers } from '../../models/forms/registration.js';
import { promoteUserToAdmin, demoteUserFromAdmin } from '../../models/forms/users.js';
import { Router } from 'express';

const router = Router();

/**
 * Promote a user to administrator.
 */
const handlePromoteUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        console.log('Promoting user:', id);

        const updatedUser = await promoteUserToAdmin(id);

        console.log('Database update result:', updatedUser);

        if (!updatedUser) {
            console.error('No user found with ID:', id);
            return res.status(404).send('User not found');
        }

        res.redirect('/users');

    } catch (error) {
        console.error('Error promoting user:', error);
        next(error);
    }
};

const handleDemoteUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        console.log('Demoting user:', id);

        const updatedUser = await demoteUserFromAdmin(id);

        console.log('Database update result:', updatedUser);

        if (!updatedUser) {
            console.error('No user found with ID:', id);
            return res.status(404).send('User not found');
        }

        res.redirect('/users');

    } catch (error) {
        console.error('Error demoting user:', error);
        next(error);
    }
};

/**
 * Ensure the logged-in user is an administrator.
 */
const requireAdmin = (req, res, next) => {
    if (!req.session?.user) {
        return res.redirect('/login');
    }

    if (req.session.user.role !== 'admin') {
        return res.status(403).send('Access denied. Admin privileges required.');
    }

    next();
};

// Show promoteUser form
const showPromoteUserForm = async (req, res) => {
        // Initialize users as empty array
    let users = [];

    try {
        // TODO: Call getAllUsers() and assign to users variable
        users = await getAllUsers();
    } catch (error) {
        // TODO: Log the error to console
        // users remains empty array on error
        console.error('Error occurred while fetching users:', error);
    }
    res.render('forms/login/users', { title: 'Promote User', users });
};

// Routes
router.post('/users/promote/:id', requireAdmin, handlePromoteUser);
router.post('/users/demote/:id', requireAdmin, handleDemoteUser);

// Export router as default, and specific functions for root-level routes
export default router;
export { showPromoteUserForm, requireAdmin };