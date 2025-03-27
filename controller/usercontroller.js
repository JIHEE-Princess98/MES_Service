const userModel = require('../model/usermodel');

const getUsers = async (req, res) => {
    try{
        const users= await userModel.getAllUser();
        res.json(users);
    }catch(err){
        res.status(500).json({message: `사용자 조회 실패, ${err}`});
    }
};

const createUser = async (req, res) => {
    const { loginId, name, password, role, clientType, clientName, phone, email, factory, part, rank } = req.body;
  
    try {
      const userIdx = await userModel.createUserWithProfile(
        { loginId, name, password, role },
        { clientType, clientName, phone, email, factory, part, rank }
      );
  
      res.status(201).json({ user_idx: userIdx });
    } catch (err) {
      console.error('Error inserting user:', err);
      res.status(500).json({ message: 'Error inserting user' });
    }
  };

module.exports = {
    getUsers,
    createUser
};