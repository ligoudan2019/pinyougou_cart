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