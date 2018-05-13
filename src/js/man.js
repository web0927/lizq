var str = '';
var mySwipers = new Swiper(".cont",{
    slideChange:function () {
        alert(1)
    }
})
var mySwiper = new Swiper('.contion', {
    loop:true,
    autoplay:{
        delay:1000
    },
    pagination:{
        el:"swiper-pagination",
    }
})

$('nav').on('click', 'span', function () {
    $(this).toggleClass('action').siblings().removeClass('action');
    mySwipers.slideTo($(this).index())
})
$.ajax({
    url:'/login',
    success:function (data) {
        $.each(data, function (i, v) {
            console.log(i, v)
            // str += `<div class="cont-img">
            //             <img src="${v.pic}" alt="">
            //             <span>
            //                 ${v.text}
            //             </span>
            //         </div>`
        })
        // $('.cont-cont').append(str)
    }
})