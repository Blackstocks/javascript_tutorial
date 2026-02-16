const prisma = require("../utils/prisma");
const bcrypt = require('bcrypt');

// create user 
const createUser = async (req, res) => {
    try{
        const {name,email,password,role} = req.body;
        const hashed = await bcrypt.hash(password,5);
        const user = await prisma.create({
            data: {
                name,email,password:hashed,role
            }
        });
        res.status(201).json(user);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};
// Get all user detail
const getAllUser = async (req,res) => {
    try{
        const users = await prisma.user.findMany({
            select: {
                id:true,
                name:true,
                email:true,
                role:true,
                createdAt:true
            }
        });
        res.json(users);
    }
    catch(error) {
        res.status(500).json({error: error.message});
    }
};

// get particular user
const getUser = async (req,res) => {
    try{
        const id = parseInt(req.params.id);
        const user = await prisma.user.findUnique({
            where: {id},
            select: {
                id:true,
                name:true,
                email:true,
                role:true,
            }
        });
        if(!user) return res.status(404).json({message:"USER NOT FOUND"});
        res.json(user);
    }
    catch(error) {
        res.status(500).json({error: error.message});
    }
};

//Delete User


// Updating User
