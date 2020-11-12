/*
 * @Author: Tuclly
 * @Date: 2020-11-12 01:48:21
 * @LastEditTime: 2020-11-12 11:38:49
 * @Description: 
 * 给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。
 * [[1,2],[2,3],[4,5]] => 0
 * [[1,2],[1,2],[1,2]] => 2
 * 先求出最多不重叠的区间count个，然后用n - count即可得到结果(n为intervals的长度)
 * 1.intervals的各个区间先根据区间的最后一个元素排序，排序完后intervals的第一个区间里的末尾元素是intervals所有区间中末尾元素最小的
 * 2.遍历intervals各个区间，取每个区间的第一个元素（curStart），和end做比较，
 * 如果curStart >= end，说明这两个区间不会重叠，更新计数和更新end的值；
 * 如果curStart< end ，说明此时这两个区间重叠，跳过不处理
 * 3.最后所求的count即为最多不重叠的区间数，所以答案要求就是n-count
 * [[1,11],[2,12],[11,22],[1,100]]
 */


var eraseOverlapIntervals = function (intervals) {
    let len = intervals.length
    if(len === 0) return 0

    intervals.sort( (a,b)=> a[1]-b[1] ) //不要加花括号，加了要return
    let end = intervals[0][1]
    
    let count = 1 //不重合的区间数目，至少为1，最后一个总是不重合的
    for(let i = 0 ; i < len; i++){
        let curStart = intervals[i] //每个区间的第一个元素
        if (curStart[0] >= end){ 
            //如果curStart 比 end 大，表示没有重合，那么end作为比较元素就失效了
            // 更新end 到下一个interval的第二个元素（因为是排序过的，越来越大的end
            // 同时count自增，表示不重合的区间数目+1
            count++
            end = curStart[1]
        }
        //如果curStart比end小，表示重合了，不对count和end做处理
        //不对end处理，是因为end仍然是第一个interval的第二个元素，是按照从小到大顺序排的
        //后面的interval仍然可能比他大，从而对count影响
    return len - count
    }
}


