
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import {
    createGroupMeeting,
    getAllGroupMeetings
} from '../../models/forms/groupmeeting.js';
import {requireAdmin } from './users.js';

const router = Router();

/**
 * Display the add group/meeting form and existing groupmeetings.
 */
const showAddGroupMeetingForm = async (req, res) => {
    try {
        const groupmeetings = await getAllGroupMeetings();

        res.render('forms/login/addgroupmeeting', {
            title: 'Add Group/Meeting',
            groupmeetings,
            errors: []
        });
    } catch (error) {
        console.error('Error retrieving groupmeetings:', error);

        res.status(500).send('Unable to retrieve groupmeetings.');
    }
};

/**
 * Handle group/meeting form submission.
 */
const handleAddGroupMeeting = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const groupmeetings = await getAllGroupMeetings();

        return res.status(400).render('forms/login/addgroupmeeting', {
            title: 'Add Group/Meeting',
            groupmeetings,
            errors: errors.array(),
            submittedGroupMeeting: req.body.groupmeeting
        });
    }

    const { groupmeeting } = req.body;

    try {
        await createGroupMeeting(groupmeeting);

        console.log('Group/Meeting created successfully');

        res.redirect('/addgroupmeeting');
    } catch (error) {
        console.error('Error saving group/meeting:', error);

        res.status(500).send('Unable to create group/meeting.');
    }
};

/**
 * GET /addgroupmeeting
 */
router.get('/', requireAdmin, showAddGroupMeetingForm);

/**
 * POST /addgroupmeeting
 */
router.post(
    '/',
    [
        body('groupmeeting')
            .trim()
            .notEmpty()
            .withMessage('Group/Meeting is required.')
            .isLength({ min: 2 })
            .withMessage('Group/Meeting must be at least 2 characters.')
    ],
    handleAddGroupMeeting
);

export default router;
