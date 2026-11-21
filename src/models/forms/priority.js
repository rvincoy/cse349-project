import db from '../db.js';

const createPriority = async (priority) => {
    const trimmedPriority = priority?.trim();
    if (!trimmedPriority) {
        throw new Error('Priority is required.');
    }
    const query = `
        INSERT INTO aipriority (priority)
        VALUES ($1)
        RETURNING *
    `;
    const result = await db.query(query, [priority]);
    return result.rows[0];
};

const getAllPriorities = async () => {
    const query = `
        SELECT priority
        FROM aipriority
        ORDER BY priority ASC
    `;
    const result = await db.query(query);
    return result.rows;
};

export { createPriority, getAllPriorities };