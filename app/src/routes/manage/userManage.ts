/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-06 21:48
 */

import * as Router from 'koa-router';
import {UserManageController} from '../../controller'

const router:Router = new Router();
router.prefix('/manage/user');

const userRouter = router
    .post('/signIn/',UserManageController.signIn)



export default userRouter;