import db from '../db.js';

const promoteUserToAdmin = async (id) => {
    console.log('Model received user ID:', id);

    const query = `
        UPDATE usersfp
        SET role = 'admin'
        WHERE id = $1
        RETURNING id, role
    `;

    const result = await db.query(query, [id]);

    console.log('Rows updated:', result.rowCount);
    console.log('Updated record:', result.rows[0]);

    return result.rows[0];
};

const demoteUserFromAdmin = async (id) => {
    console.log('Model received user ID:', id);

    const query = `
        UPDATE usersfp
        SET role = 'user'
        WHERE id = $1
        RETURNING id, role
    `;

    const result = await db.query(query, [id]);

    console.log('Rows updated:', result.rowCount);
    console.log('Updated record:', result.rows[0]);

    return result.rows[0];
};

export {promoteUserToAdmin, demoteUserFromAdmin};