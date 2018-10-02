import Application = require("koa");

const routesLoader = require('../common/util/routesLoader');

export default function (app: Application):void {
    routesLoader(`${__dirname}`).then(routers => {
        routers.forEach(router => {
            app
                .use(router.routes())
                .use(router.allowedMethods({
                    throw: true
                }))
        })
    }).catch(e => {
        console.log(e);
    })
};