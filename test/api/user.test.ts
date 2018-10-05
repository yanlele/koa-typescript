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
        it.skip('登录接口', function (done) {
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

        /*因为通过测试是没有办法模拟发送cookie， 所以通过测试的方法是拿不到session的， 但是通过浏览器端的请求是可以拿到信息的， 这个地方的测试可以忽略*/
        it.skip('获取用户信息', function (done) {
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


        it.skip('注册用户信息', function (done) {
            request.post(`${baseUrl}/register/`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .send({
                    username: 'yanlele4',
                    password: '123456',
                    confirmPassword: '123456',
                    email: '331393627@qq.com'
                })
                .end(function (err, res) {
                    console.log(res.body);
                    expect(res.body).have.property('success', true);
                    done();
                })
        });

        it('退出登录接口', function (done) {
            request.get(`${baseUrl}/signOut/`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    console.log(res.body);
                    expect(res.body).have.property('success', false);
                    done();
                })
        });
    });
}

