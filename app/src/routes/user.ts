import * as Router from 'koa-router';
import {UserController} from '../controller/'

const router:Router = new Router();
router.prefix('/user');

const userRouter = router
    .post('/signIn/',UserController.signIn)
    .get('/signOut/', UserController.signOut)
    .post('/register/', UserController.signUp)
    .get('/user-info/', UserController.getUserInfo)
    .get('/check-valid/', UserController.checkValid)
    .get('/forget-get-question/', UserController.forgetGetQuestion)
    .get('/forget-check-answer/', UserController.forgetCheckAnswer)
    .get('/forget-reset-password/', UserController.forgetRestPassword)
    .get('/reset-password', UserController.resetPassword)



export default userRouter;