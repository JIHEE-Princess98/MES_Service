const db = require('../config/db');
const userQueries = require('../queries/userQueries');
const bcrypt = require('bcrypt');

async function getAllUser() {
    const [rows] = await db.query(userQueries.getAllUser);
    return rows;
}

async function createUserWithProfile(userData, profileData) {
    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();

        if (!userData.password) {
            throw new Error('Password is required for hashing.');
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(userData.password, saltRounds); // 🔑 여기!

        const [result] = await conn.execute(userQueries.createUser, [
            userData.loginId,
            userData.name,
            passwordHash,
            userData.role
        ]);

        const userIdx = result.insertId;

        await conn.execute(userQueries.createProfile, [
            userIdx,
            profileData.clientType,
            profileData.clientName,
            profileData.phone,
            profileData.email,
            profileData.factory,
            profileData.part,
            profileData.rank
        ]);

        await conn.commit();
        return userIdx;
    } catch (err) {
        await conn.rollback();
        console.error('Error inserting user:', err);
        throw err;
    } finally {
        conn.release();
    }
}



module.exports = {
    getAllUser,
    createUserWithProfile,
};