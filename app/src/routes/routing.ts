import * as Router from 'koa-router';
const router:Router = new Router();

import {
    userRouter,
    testRouter,
    userManageRouter
} from './index';

router.prefix('/api');

router.use(userRouter.routes(), userRouter.allowedMethods());
router.use(testRouter.routes(), testRouter.allowedMethods());
router.use(userManageRouter.routes(), userManageRouter.allowedMethods());

export default router;