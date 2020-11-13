/*
 * @Author: Tuclly
 * @Date: 2020-11-12 23:05:56
 * @LastEditTime: 2020-11-12 23:33:25
 * @description: 查找字符串中的最长公共前缀，示例：["flower","flow","flight"] 输出"fl"
 * 既然要求最长的公共前缀，说明这个每个元素都包含了这个前缀，可以先求某两个的公共前缀;
 * 然后拿这个公共前缀与后面的元素进行比较，继续找公共前缀，比到最后要么没有公共，要么找到
 */


 function findLongestCommonPrefix(arr){
    if(!arr.length) return ""
    let temp = arr[0]
    for(let i = 0; i < arr.length; i++){
        if(!temp) return ""
        temp = findCommonPrefix(temp,arr[i])
    }
    // 所有元素遍历完，比较完
    return temp
 }

 // 任意两个字符串找公共前缀
 function findCommonPrefix(str1,str2){
     let commpareLen = Math.min(str1.length,str2.length)
     let res = ""
     for (let i = 0; i< commpareLen; i++){
         if (str1[i] !== str2[i]){
             return res
         }
         res += str1[i]
     }
     return res
 }

 arr = ["flower","flow","flight"]
 console.log(findLongestCommonPrefix(arr)) //"fl"