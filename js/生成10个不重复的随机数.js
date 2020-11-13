/*
 * @Author: Tuclly
 * @Date: 2020-11-12 22:56:06
 * @LastEditTime: 2020-11-12 23:07:50
 * @discription:从1-1000中生成10个不重复的随机数，输出结果的集合
 * @return array
 */

function generateRandomNumberFrom(start,end){
    res = new Set()
    // get random number between start and end
    for(let i = start; i <= end; i++ ){
        randomNumber = Math.random() * (end - start) + start
        res.add(parseInt(randomNumber)) // convert to int number
        if (res.size == 10){
            return [...res]
        }
    }
}

console.log(generateRandomNumberFrom(1,1000))
