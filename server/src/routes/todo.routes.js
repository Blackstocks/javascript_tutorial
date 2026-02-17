const router = require('express').Router();
const auth = require('../middlewares/auth.middlewares');
const todoController = require('../controllers/todo.controller');


router.use(auth());

router.post('/',todoController.createTodo);
router.get('/',todoController.getTodo);


module.exports = router;