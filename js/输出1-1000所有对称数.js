/*
 * @Author: Tuclly
 * @Date: 2020-11-06 01:12:50
 * @LastEditTime: 2020-11-06 01:12:56
 * @FilePath: /dianping-webapp/Users/tuclly/Downloads/codehack/输出1-1000所有对称数.js
 * @Description: Do not edit
 */
function getSymmetryNum (start, end) {
    let arr = [];
    for( let i = start; i < end; i++) {
        if (i.toString() === i.toString().split('').reverse().join('') && i.toString().length > 1) {
            arr.push(i);
        }
    }
    return arr;
}
console.log(getSymmetryNum(1,10000));