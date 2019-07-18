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
    html ='';
    arr.forEach(e => {
      // 拼接出html结构
      html += `<div class="item" data-id="${e.pID}">
      <div class="row">
        <div class="cell col-1 row">
          <div class="cell col-1">
            <input type="checkbox" checked class="item-ck">
          </div>
          <div class="cell col-4">
            <img src="${e.imgSrc}" alt="">
          </div>
        </div>
        <div class="cell col-4 row">
          <div class="item-name">${e.name}</div>
        </div>
        <div class="cell col-1 tc lh70">
          <span>￥</span>
          <em class="price">${e.price}</em>
        </div>
        <div class="cell col-1 tc lh70">
          <div class="item-count">
            <a href="javascript:void(0);" class="reduce fl">-</a>
            <input autocomplete="off" type="text" class="number fl" value="${e.number}">
            <a href="javascript:void(0);" class="add fl">+</a>
          </div>
        </div>
        <div class="cell col-1 tc lh70">
          <span>￥</span>
          <em class="computed">${e.price * e.number}</em>
        </div>
        <div class="cell col-1">
          <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
        </div>
      </div>
    </div>`;
    });
    $('.item-list').html(html)
    // 计算一次总价和件数
    calculateTotal();
  }

  // 封装一个计算总价和总件数的方法
  function calculateTotal(){
    // 找到所有勾选的商品
    let cked = $('.item-list .item-ck:checked');
    // console.log(cked);
    // 获取对应的勾选的商品的id
    let temp = [];
    cked.each(function(i,e){
      // 根据id到本地数据里面查找对应的商品数据
      let id = parseInt($(e).parents('.item').attr('data-id'));
      // console.log(id);
      // 只要 本地数据里面的id和我们获取的id一致，就是我们勾选的商品
      let target = arr.find(function(e){
        return e.pID === id;
      });
      temp.push(target);
    })

    // 进行件数和总价的计算
    let totalCount = 0;
    let totalMoney = 0;
    temp.forEach(e=>{
      totalCount += e.number;
      totalMoney += e.number * e.price;
    });
    // 修改文字
    $('.selected').text(totalCount);
    $('.total-money').text(totalMoney);
  }

  // 全选
  $(".pick-all").on('click',function(){
    // 判断自身的选中状态
    let status = $(this).prop('checked');
    // 设置点选的选中
    $('.item-list .item-ck').prop('checked',status);
    $(".pick-all").prop('checked',status);
    // 重新计算
    calculateTotal();
  })

  //点选
  $('.item-list').on('click','.item-ck',function(){
    // 思路是判断勾选的个数和总个数是否一致
    let cks = $('.item-ck');
    let cked = $('.item-ck:checked');
    let status = cks.length === cked.length;
    $(".pick-all").prop('checked',status);
    calculateTotal();
  });
});