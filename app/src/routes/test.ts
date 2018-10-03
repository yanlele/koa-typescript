/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-03 16:20
 */

import * as Router from 'koa-router';
import {testController} from '../controller/'

const router:Router = new Router();
router.prefix('/test');

const userRouter = router
    .get('/get-session/', testController.getSession)
    .get('/set-session/', testController.setSession);


export default userRouter;