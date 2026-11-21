
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import {
    createStatus,
    getAllStatuses
} from '../../models/forms/status.js';

const router = Router();

/**
 * Display the add status form and existing statuses.
 */
const showAddStatusForm = async (req, res) => {
    try {
        const statuses = await getAllStatuses();

        res.render('forms/login/addstatus', {
            title: 'Add Status',
            statuses,
            errors: []
        });
    } catch (error) {
        console.error('Error retrieving statuses:', error);

        res.status(500).send('Unable to retrieve statuses.');
    }
};

/**
 * Handle status form submission.
 */
const handleAddStatus = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const statuses = await getAllStatuses();

        return res.status(400).render('forms/login/addstatus', {
            title: 'Add Status',
            statuses,
            errors: errors.array(),
            submittedStatus: req.body.status
        });
    }

    const { status } = req.body;

    try {
        await createStatus(status);

        console.log('Status created successfully');

        res.redirect('/addstatus');
    } catch (error) {
        console.error('Error saving status:', error);

        res.status(500).send('Unable to create status.');
    }
};

/**
 * GET /addstatus
 */
router.get('/', showAddStatusForm);

/**
 * POST /addstatus
 */
router.post(
    '/',
    [
        body('status')
            .trim()
            .notEmpty()
            .withMessage('Status is required.')
            .isLength({ min: 2 })
            .withMessage('Status must be at least 2 characters.')
    ],
    handleAddStatus
);

export default router;
