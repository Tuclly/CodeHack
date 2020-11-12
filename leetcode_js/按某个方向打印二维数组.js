/*
 * @Author: Tuclly
 * @Date: 2020-11-04 00:56:33
 * @LastEditTime: 2020-11-04 00:57:32
 * @FilePath: /dianping-webapp/Users/tuclly/Downloads/codehack/js/按某个方向打印二维数组.js
 * @Description: Do not edit
 */
// 二维数组从右上角到左下角按照主对角线的方向打印


// 如果是从左上角到右下角，顺时针打印
function arrayPrint(arr,n){
    let res = []
	let x_index = 0 
	//次对角线打印完前都是从第一行开始打印，可以先不动x_index,每次更新y_index从哪一列开始打印
	let y_index = 0
	// 次对角线打印完后每次都是从同一列开始打印，不动y_index,每次更新x_inde从哪一行开始打印
    while (x_index < n){ // 最后才动x_index 所以这里对的
        let x = x_index
        let y = y_index
        while(x<n && y>=0){
			// 对角线(包括)之前用y>=0,后面用x<n
            res.push(arr[x++][y--])
        }
        if (y_index < n - 1){
			y_index++
		}else{
			x_index++
		}
	}
	return res
}
arr = [[1,2,3],[4,5,6],[7,8,9]]
arrayPrint(arr,3)
