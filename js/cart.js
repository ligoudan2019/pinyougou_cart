$(function(){
  // 读取本地数据，判断有无，显示空空如也或者是显示商品数据
  // 已经把读取本地数据的方法，封装到了 kit.js里面了，直接调用
  // 封装好的方法返回值是一个数组
  let arr = kits.loadData('shopCartData');
  // console.log(arr);
  // 如果arr是一个空数组，就显示空空如也
  // 如果不是空数组，把空空如也，隐藏，把其他该显示的显示(表头,表主体,总计的部分)
  if(arr.length != 0){
    // 先把空空如也隐藏
    $('.empty-tip').addClass('hidden');
    // 显示
    $('.cart-header').removeClass('hidden');
    $('.item-list').removeClass('hidden');
    $('.total-of').removeClass('hidden');

    // 再根据数组，动态的生成表格
  }
});