import db from '../db.js';

const createStatus = async (status) => {
    const trimmedStatus = status?.trim();
    if (!trimmedStatus) {
        throw new Error('Status is required.');
    }
    const query = `
        INSERT INTO aistatus (status)
        VALUES ($1)
        RETURNING *
    `;
    const result = await db.query(query, [status]);
    return result.rows[0];
};

const getAllStatuses = async () => {
    const query = `
        SELECT status
        FROM aistatus
        ORDER BY status ASC
    `;
    const result = await db.query(query);
    return result.rows;
};

export { createStatus, getAllStatuses };