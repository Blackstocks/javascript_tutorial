const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = require('../utils/prisma');

 exports.register = async (req, res) => {
    const {name, email, password} = req.body;
    const hashed = await bcrypt.hash(password, 5);
    const user = await prisma.user.create({
        data: {
            name, email, password:hashed
        }
    });
    res.status(201).json({message: 'User created successfully', user});
}

exports.login = async (req,res) => {
    const {email,password} = req.body;
    const user = await prisma.user.findUnique({
        where: {email}
    });
    const validation = await bcrypt.compare(password, user.password);
    if(!validation) res.status(401).json({message:`${user.name} is not there or invalid credential`});
    const token = jwt.sign(
        {userId: user.id, role:user.role},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );
    res.json({token});
};
// module.exports = {
//     register,
//     login
// };