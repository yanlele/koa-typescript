/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-05 11:30
 */
import 'mocha';
import {expect} from "chai";


describe('main', (): void => {
    it('expect 10 = 10', function () {
        expect(10).equal(10);
        console.log(true);
    });


    describe('hello', function () {
        it('test', function () {
            expect(100).equal(100);
        })
    })
});