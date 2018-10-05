/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-05 14:51
 */

import {expect} from 'chai'
import 'mocha'
import app from '../../app/app'
import * as supertest from 'supertest'

const request = supertest(app.listen(3000));

describe('user', function () {
    it('获取用户信息', function (done) {
        request.get('/api/user/user-info/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                console.log(res.body);
                expect(res.body).is.to.be.an('object');
                done();
            })
    });
});