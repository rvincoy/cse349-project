
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import {
    createPriority,
    getAllPriorities
} from '../../models/forms/priority.js';

const router = Router();

/**
 * Display the add priority form and existing priorities.
 */
const showAddPriorityForm = async (req, res) => {
    try {
        const priorities = await getAllPriorities();

        res.render('forms/login/addpriority', {
            title: 'Add Priority',
            priorities,
            errors: []
        });
    } catch (error) {
        console.error('Error retrieving priorities:', error);

        res.status(500).send('Unable to retrieve priorities.');
    }
};

/**
 * Handle priority form submission.
 */
const handleAddPriority = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const priorities = await getAllPriorities();

        return res.status(400).render('forms/login/addpriority', {
            title: 'Add Priority',
            priorities,
            errors: errors.array(),
            submittedPriority: req.body.priority
        });
    }

    const { priority } = req.body;

    try {
        await createPriority(priority);

        console.log('Priority created successfully');

        res.redirect('/addpriority');
    } catch (error) {
        console.error('Error saving priority:', error);

        res.status(500).send('Unable to create priority.');
    }
};

/**
 * GET /addpriority
 */
router.get('/', showAddPriorityForm);

/**
 * POST /addpriority
 */
router.post(
    '/',
    [
        body('priority')
            .trim()
            .notEmpty()
            .withMessage('Priority is required.')
            .isLength({ min: 2 })
            .withMessage('Priority must be at least 2 characters.')
    ],
    handleAddPriority
);

export default router;
