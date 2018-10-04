/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-04 10:07
 */


function checkModelResult(result) {
    if(Array.isArray(result) && result.length > 0) {
        result = result[0];
    } else {
        result = null;
    }
    return result;
}

export default checkModelResult;