import * as Router from 'koa-router';
import {UserController} from '../controller/'

const router:Router = new Router();
router.prefix('/user');

const userRouter = router
    .post('/signIn/',UserController.signIn)
    .get('/signOut/', UserController.signOut)
    .post('/signUp/', UserController.signUp)
    .get('/user-info/', UserController.getUserInfo)



export default userRouter;