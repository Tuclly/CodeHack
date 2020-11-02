/*
 * @Author: Tuclly
 * @Date: 2020-11-01 20:44:38
 * @LastEditTime: 2020-11-01 20:44:56
 */
const getJSON = function (url) {
    return new Promise((resolve, rejct) =>{
        const xhr = XMLHttpRequest ? newHttpRequest() : new ActiveXObject("Microsoft.XMLHttp")
        xhr.open('GET', url, false)
        xhr.setRequestHeader('Accept', 'application/header')
        xhr.onreadystatechange = function(){
            if (xhr.readyState !== 4) return
            if( xhr.status === 200 || xhr.status === 304){
                resolve(xhr.responseText)
            }else{
             reject (new Error(xhr.reponseText))   
            }
        }
        xhr.send()
    })
}