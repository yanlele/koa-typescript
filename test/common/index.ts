/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-05 15:31
 */

import {expect} from 'chai'
import 'mocha'


export default function() {
    describe('common test', function () {
        it('expect 10 = 10', function () {
            expect(10).equal(10);
            console.log(true);
        });
    });


    describe('hello', function () {
        it('test', function () {
            expect(100).equal(100);
        })
    });
}