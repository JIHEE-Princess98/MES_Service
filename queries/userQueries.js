module.exports = {
  getAllUser: `select 
	ms.user_idx,
	ms.user_login_id,
	ms.user_username,
	ms.user_role ,
	ms.user_use_yn ,
	pf.user_client_type ,
	pf.user_client_name ,
	pf.user_phone ,
	pf.user_email ,
	pf.user_factory ,
	pf.user_part ,
	pf.user_rank ,
	pf.user_description 
from tb_user_master100 as ms
inner join test_solpack.tb_user_profile150 as pf
	on ms.user_idx = pf.user_idx;`,

  createUser: `INSERT INTO tb_user_master100 (user_login_id, user_username, user_password, user_role)
      VALUES (?, ?, ?, ?)`,
      
  createProfile: `INSERT INTO tb_user_profile150 (
        user_idx, user_client_type, user_client_name, user_phone, user_email, user_factory, user_part, user_rank
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
}