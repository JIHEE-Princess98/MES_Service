const db = require('../config/db');
const userQueries = require('../queries/userQueries');

async function getAllUser() {
    const [rows] = await db.query(userQueries.getAllUser);
    return rows;
}

async function createUserWithProfile(userData, profileData) {
    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();

        const [result] = await conn.execute(userQueries.createUser, [userData.loginId, userData.name, userData.passwordHash, userData.role]);

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
        throw err;
    } finally {
        conn.release();
    }
}



module.exports = {
    getAllUser,
    createUserWithProfile,
};