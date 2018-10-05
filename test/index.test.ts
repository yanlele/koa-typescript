/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-05 11:30
 */
import 'mocha';
import {expect} from "chai";
import {
    user
} from './api'
import common from './common'

import app from '../app/app'
import * as supertest from 'supertest'

const request = supertest(app.listen(3000));


describe('main', (): void => {
    // common();
    user(request)
});