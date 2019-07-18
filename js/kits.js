// 这个文件叫工具类
/**
 *  工具类和jquery有什么区别？
 *      jquery是一些常用操作的封装 - 非常的全面
 * 
 *      但是jquery也是无法面面俱到，也是有一些涉及不到的地方
 * 
 *      就需要我们自己封装一些自己的常用代码来补充jquery里面不足的地方
 * 
 *      而我们封装的代码又和jquery没有关联性,独立的封装成一个js代码 —— 工具类
 */
var kits = {};
kits.randomInt = function(n,m){
    return Math.floor(Math.random() * (m-n+1) + n);
}

kits.loadData = function(key){
    let json = localStorage.getItem(key);
    let arr = [];
    if(json){
        arr = JSON.parse(json);
        if(!(arr instanceof Array)){
            console.warn('读取出来的数组不是一个数组');
        }
    }
    return arr;
}

kits.saveData = function(key,arr){
    let json = JSON.stringify(arr);
    localStorage.setItem(key,json);
}