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