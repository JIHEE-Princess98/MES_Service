module.exports = {
    getAllUser: 'select * from test_solpack.tb_user_master100',
    createUser: `INSERT INTO tb_user_master100 (user_login_id, user_username, user_password, user_role)
      VALUES (?, ?, ?, ?)`,
    createProfile: `INSERT INTO tb_user_profile150 (
        user_idx, user_client_type, user_client_name, user_phone, user_email, user_factory, user_part, user_rank
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
}