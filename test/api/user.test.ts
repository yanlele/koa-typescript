/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-05 14:51
 */

import {expect} from 'chai'
import {CommonTool} from '../../app/src/common/util'
import 'mocha'


const baseUrl: string = '/api/user';

export default function(request) {
    describe('user', function () {
        it('登录接口', function (done) {
            request.post(`${baseUrl}/signIn/`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .send({
                    username: 'yanlele',
                    password: '123456'
                })
                .end(function (err, res) {
                    console.log(res.body);
                    expect(res.body).have.property('success', true);
                    done();
                })
        });


        it.only('获取用户信息', function (done) {
            request.get(`${baseUrl}/user-info/`)
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
}

