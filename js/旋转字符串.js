/*
 * @Author: Tuclly
 * @Date: 2020-11-04 00:56:01
 * @LastEditTime: 2020-11-04 00:56:09
 * @FilePath: /dianping-webapp/Users/tuclly/Downloads/codehack/js/旋转字符串.js
 * @Description: Do not edit
 */
// # Leet796

// 给定两个字符串, A 和 B。

// A 的旋转操作就是将 A 最左边的字符移动到最右边。 例如, 若 A = 'abcde'，在移动一次之后结果就是'bcdea' 。如果在若干次旋转操作之后，A 能变成B，那么返回True。

// > 示例 1:
// > 输入: A = 'abcde', B = 'cdeab'
// > 输出: true
// >
// > 示例 2:
// > 输入: A = 'abcde', B = 'abced'
// > 输出: false

// 这题的精髓在于，无论A如何旋转，想要返回true，**B必然是A+A这个字符串里的一部分**。


var rotateString = function(A, B) {
    if(A.length !== B.length) return false
    A = A + A
    return A.includes(B)
};