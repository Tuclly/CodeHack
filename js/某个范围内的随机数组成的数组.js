/*
 * @Author: Tuclly
 * @Date: 2020-12-02 23:55:56
 * @LastEditTime: 2020-12-02 23:56:06
 * @FilePath: /undefined/Users/tuclly/Downloads/codehack/js/某个范围内的随机数组成的数组.js
 * @Description: Do not edit
 */
//编写一个javscript函数 fn，该函数有一个参数 n（数字类型），其返回值是一个数组，该数组内是 n 个随机且不重复的整数，且整数取值范围是 [3, 40]。
// 0 -> 1 => a ,b -> 0 ~ b-a -> a~b  
function fn(n){
	let hashset = new Set()
    while(hashset.size !== n){
        let randomNumber = Math.random()*(40-3)+3
        let intNumber = parseInt(randomNumber)
    	hashset.add(intNumber)
    }
    return [...hashset]
}

let n = 10
console.log(fn(10))