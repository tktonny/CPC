$(function(){
    $totop = $('.totop');
    $(window).scroll(function(){
        // 获取滚动条滚动的高度
        var iNum = $(document).scrollTop();
        if(iNum>400){
            $totop.fadeIn();
        }
        else
        {
            $totop.fadeOut();
        }
    })
    $totop.click(function(){
        $('html,body').animate({'scrollTop':0});
    })
})