const prisma = require('../utils/prisma');

// creating a task in todo

exports.createTodo = async (req,res) => {
    try {
        const {title} = req.body;
        const todo = await prisma.Todo.create({
            data: {
                title,
                userId: req.user.userId
            }
        });
        res.status(201).json(todo);
    }
    catch(error) {res.status(500).json({error:error.message}) }  
};

//fetch all the todo for a single user

exports.getTodo = async (req,res) => {
    try{
        const todos = await prisma.Todo.findMany({
            where: {userId: req.user.userId}
        });
        res.status(201).json({message:"List of all todos are below", todos});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
};