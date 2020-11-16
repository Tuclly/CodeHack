/*
 * @Author: Tuclly
 * @Date: 2020-11-16 14:57:41
 * @LastEditTime: 2020-11-16 15:00:36
 * @Description: leetcode 11
 * 1.一开始想到的都是暴力解法，两重循环，O(n^2)复杂度
 * 2.双指针的做法巧妙的在于，避开了 固定了左边的短柱子，右边的柱子再如何长都不可能比一开始水的面积大这样的一个无效遍历
 * 3.当左右指针相互运动的时候，想要水的面积更大，在width每次变小的情况下，追求的是高度的变大，所以哪边矮就哪边动，去追求更大的高度。
 */

var maxArea = function(height) {
    let left = 0
    let right = height.length - 1
    let max = 0
    while ( left <= right){
        let high = Math.min(height[left],height[right])
        let width = right - left
        max = Math.max(max,high * width)
        if (height[left] <= height[right]){
            left++
        }else{
            right--
        }
    }
    return max
};