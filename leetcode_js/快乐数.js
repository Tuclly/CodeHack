/*
 * @Author: Tuclly
 * @Date: 2020-12-04 00:00:57
 * @LastEditTime: 2020-12-04 00:08:29
 */
 
/* hashset*/
function getNext(n) {
    let totalSum = 0 
    while(n !== 0){
        let d = n % 10
        n = parseInt(n / 10)
        totalSum += d * d
    }
    return totalSum
}
var isHappy = function(n) {
    let hashset = new Set()
    while(n !== 1 && !hashset.has(n)){
        hashset.add(n)
        n = getNext(n)
    }
    return n === 1
};

/* 快慢指针*/
// 因为本质上数据的变化像是一个链表，如果能进入环说明不可能是快乐数，要么就进环，要么就变为1，越来越大的可能性被否定。

var isHappy = function(n) {
    let slow = n
    let fast = getNext(n)
    while(slow !== fast && fast !== 1){//碰上了说明有环 && 跑的快的如果到1了 说明就是快乐数
        slow = getNext(slow)
        fast = getNext(getNext(fast))
    } 
    return fast === 1
};