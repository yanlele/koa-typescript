import * as Router from 'koa-router';
import {UserController} from '../controller/'

const router:Router = new Router();
router.prefix('/user');

const userRouter = router
    .post('/signIn/',UserController.signIn)


export default userRouter;