$(function () {
    let id = parseInt(this.location.search.substring(4));
    // console.log(id);

    let target = phoneData.find(e => {
        return e.pID === id;
    })

    if (!target) {
        return;
    }

    $('.sku-name').text(target.name);
    $('.summary-price em').text('￥' + target.price);
    $('.preview-img>img').attr('src', target.imgSrc);


    // 点击加入购物车
    $('.addshopcar').on('click', function () {
        let number = parseInt($('.choose-number').val());
        console.log(number);
        let storage = kits.loadData('shopCartData');
        if (storage.length !== 0) {
            let exits = storage.find(e => {
                return e.pID === id;
            })
            if (exits) {
                exits.number += number;
            } else {
                target.number = number;
                storage.push(target);
            }
        } else {
            target.number = number;
            storage.push(target);
        }

        kits.saveData('shopCartData', storage);
    })
});