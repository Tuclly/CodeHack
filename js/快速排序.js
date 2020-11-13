/*
 * @Author: Tuclly
 * @Date: 2020-11-12 23:33:44
 * @LastEditTime: 2020-11-13 00:06:36
 * @description: quickSort of a array from 
 */

 function sortArray(nums) {
    if (nums.length < 2) return nums;
    return  quickSort(nums, 0, nums.length - 1);
};

function quickSort(nums, left, right) {
    if (left >= right) return;
    let pivotIndex = partition(nums, left, right)
    quickSort(nums, left, pivotIndex - 1)
    quickSort(nums, pivotIndex + 1, right)
    return nums;
}

function partition (nums, left, right) {
    let pivot = right;
    let leftIndex = left;
    for (let i = left; i < right; i++) {
        if (nums[i] < nums[pivot]) {
            [nums[leftIndex], nums[i]] = [nums[i], nums[leftIndex]];
            leftIndex++;
        }
    }
    [nums[leftIndex], nums[pivot]] = [nums[pivot], nums[leftIndex]];
    return leftIndex;
}

 var test = [2,3,1,5,4,6]
 console.log(sortArray(test))