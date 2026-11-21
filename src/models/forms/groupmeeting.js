import db from '../db.js';

const createGroupMeeting = async (groupmeeting) => {
    const trimmedGroupMeeting = groupmeeting?.trim();
    if (!trimmedGroupMeeting) {
        throw new Error('Group/Meeting is required.');
    }
    const query = `
        INSERT INTO aigroupmeetings (groupmeeting)
        VALUES ($1)
        RETURNING *
    `;
    const result = await db.query(query, [groupmeeting]);
    return result.rows[0];
};

const getAllGroupMeetings = async () => {
    const query = `
        SELECT groupmeeting
        FROM aigroupmeetings
        ORDER BY groupmeeting ASC
    `;
    const result = await db.query(query);
    return result.rows;
};

export { createGroupMeeting, getAllGroupMeetings };