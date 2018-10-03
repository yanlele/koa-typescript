/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-03 16:06
 */
interface Session {
    setSession: Test
}

interface Test {
    name: string,
    age: number
}



class TestController {
    static setSession(ctx) {
        let session: Session = ctx.session;
        let test: Test = {
            name: 'yanle',
            age: 35
        };
        session.setSession = test;
        return ctx.body = test;
    }

    static getSession(ctx) {
        let session: Session = ctx.session;
        return ctx.body = session.setSession;
    }
}


export default TestController
