/*
 * @Author: Tuclly
 * @Date: 2020-12-02 23:55:00
 * @LastEditTime: 2020-12-02 23:55:00
 * @FilePath: /undefined/Users/tuclly/Downloads/codehack/js/千分位.js
 * @Description: Do not edit
 */
//*写一个方法对字符串进行处理，需要从后往前每隔3位插入一个逗号。例如，字符串1234567，生成结果1,234,567
function addcomma(str){
	let arr = str.split("").reverse()// [7 6 5 4 3 2 1] 
    let res = []
    for (let i = 0; i < arr.length; i++){
        res.unshift(arr[i])
    	if ( (i+1) % 3 === 0 ){
        	res.unshift(",")
        }
    }
    return res.join("")
}

let str = "1234567"
console.log(addcomma(str))