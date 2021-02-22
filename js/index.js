// 鼠标经过头顶的导航栏事件
$('.header_nav_li').hover(function() {
    $(this).css('border-top', '3px solid #ffffff');
    $(this).children('.header_nav_li_ul').show();
}, function() {
    $(this).css('border-top', '3px solid rgba(0, 0, 0, 0)');
    $(this).children('.header_nav_li_ul').hide();
});

$('.header_nav_li_ul li').hover(function() {
    $(this).css('background', '#abccdf');
}, function() {
    $(this).css('background', '#ffffff');
});

//搜索栏
var search = {
    searchKeyword: function() {
        var nWord = $("#search-input").val();
        //var temarray = nWord.split(""); //分割
        var array = this.unique(nWord.split(""));
        var dsa = $("#search").find("ul li a"); //获取全部列表
        var linumber = 0;

        $("#search ul li").show();
        for (var t = 0; t < dsa.length; t++) {
            $(dsa[t]).html($(dsa[t]).text());
            var temstr = ($(dsa[t]).text()).split("");
            var yes = false;
            for (var i = 0; i < array.length; i++) {
                var posarr = this.findAll(temstr, array[i]);
                if (posarr.length > 0) {
                    yes = true;
                    for (var j = 0; j < posarr.length; j++) {
                        temstr[posarr[j]] = "<em style='color:red;'>" + temstr[posarr[j]] + "</em>";
                    }
                }
            }
            if (!yes) {
                $(dsa[t]).closest("li").hide();
            } else {
                linumber++;
                var htmlstr = "";
                for (var m = 0; m < temstr.length; m++) {
                    htmlstr += temstr[m];
                }
                $(dsa[t]).html(htmlstr);
            }

        }
        if (linumber == 0) {
            $("#search ul li").show();
            $("#search ul").slideDown(200);
        }
    },
    findAll: function(arr, str) {
        var results = [],
            len = arr.length,
            pos = 0;
        while (pos < len) {
            pos = arr.indexOf(str, pos);
            if (pos === -1) {
                break;
            }
            results.push(pos);
            pos++;
        }
        return results;
    },
    unique: function(arr) {
        var new_arr = [];
        for (var i = 0; i < arr.length; i++) {
            var items = arr[i];
            //判断元素是否存在于new_arr中，如果不存在则插入到new_arr的最后
            if ($.inArray(items, new_arr) == -1) {
                new_arr.push(items);
            }
        }
        return new_arr;
    },
    changeValue: function(obj) {
        $('.dropdown ul').slideUp(200);
        var input = $(obj).find('.dropdown-selected');
        var ul = $(obj).find('ul');
        if (!ul.is(':visible')) {
            ul.slideDown('fast');
        } else {
            ul.slideUp('fast');
        }

        $(obj).find('ul a').click(function() {
            input.val($(this).text());
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active')
            $(this).closest('ul').slideUp(200);
            return false;
        })
        var e = this.getEvent();
        window.event ? e.cancelBubble = true : e.stopPropagation();
    },
    _init: function() {
        $("#search").on("click", "ul li a", function() {
            $("#search-input").val($(this).text());
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active')
            $(this).closest('ul').slideUp(200);
            return false;
        })
    },
    getEvent: function() {
        if (window.event) {
            return window.event;
        }
        var f = arguments.callee.caller;
        do {
            var e = f.arguments[0];
            if (e && (e.constructor === Event || e.constructor === MouseEvent || e.constructor === KeyboardEvent)) {
                return e;
            }
        } while (f = f.caller);
    }

}

search._init();

// tab变更事件
$('#tab1').click(function() {
    $('.panel-place').show();
    $('.panel-notes').hide();
    $('#tab1').addClass("current");
    $('#tab2').removeClass("current");
})

$('#tab2').click(function() {
    $('.panel-place').hide();
    $('.panel-notes').show();
    $('#tab2').addClass("current");
    $('#tab1').removeClass("current");
})

//图片加阴影
$('.con_1_ul li').hover(function() {
    $(this).addClass('current');
}, function() {
    $(this).removeClass('current');
});
$('.mgs').hover(function() {
    $(this).children('p').css('color', '#28cc7b');
}, function() {
    $(this).children('p').css('color', '#323232');
});

// 商城切换
$('.box_1_ctr span').hover(function() {
    var i = $(this).index();
    $(this).css('background', '#fff');
    $(this).siblings('span').css('background', 'transparent');
    $('.con_2_box1 ul').eq(i).css('display', 'block');
    $('.con_2_box1 ul').eq(i).siblings('ul').css('display', 'none');

});
$('.con_2_box1 .box_1_mr').hover(function() {
    $(this).children('a').addClass('current-shadow')
}, function() {
    $(this).children('a').removeClass('current-shadow')
});

// 热门游记与话题
$('.box_3_ctr span').hover(function() {
    var i = $(this).index();
    $(this).css('background', '#1ab05f');
    $(this).siblings('span').css('background', 'transparent');
    $('.con3_box1 ul').eq(i).css('display', 'block');
    $('.con3_box1 ul').eq(i).siblings('ul').css('display', 'none');

});
$('.con_3 .box_3_mr a').hover(function() {
    $(this).addClass('current-shadow')
}, function() {
    $(this).removeClass('current-shadow')
});



// con4
// 头像滑动
var num1 = 0;
setInterval(function() {
    num1++;
    if (num1 > 9) {
        num1 = 0;
        $('.right2 .right2_roll ul').css('left', -num1 * 60);
        num1 = 1;
    }
    $('.right2 .right2_roll ul').animate({ 'left': -num1 * 60 });
}, 2000)

// 右侧鼠标切换图片
var mun = 0;
$('.wapper .title li').hover(function() {
    mun = $(this).index();
    $(this).addClass('current');
    $(this).siblings().removeClass('current');
    $('.wapper .w_img li').eq(mun).fadeIn();
    $('.wapper .w_img li').eq(mun).siblings().fadeOut();

});
// 右侧图片自动切换
var timer1;
clearInterval(timer1);

function fade() {
    timer1 = setInterval(function() {
        mun++;
        if (mun > 2) {
            mun = 0;
        }
        $('.wapper .w_img li').eq(mun).fadeIn();
        $('.wapper .w_img li').eq(mun).siblings().fadeOut();
        $('.wapper .title li').eq(mun).addClass('current');
        $('.wapper .title li').eq(mun).siblings().removeClass('current');
    }, 2000)
}
fade();
$('.wapper').hover(function() {
    clearInterval(timer1);
}, function() {
    fade();
});

// footer鼠标移入加阴影
$('.con_m_left .l_left').hover(function() {
    $(this).addClass('current-shadow');
}, function() {
    $(this).removeClass('current-shadow');
});

//头顶图片切换
var timer;
var num = 0;
var arr = ['上海', '北京', '延安', '瑞金', '遵义']

function go() {
    timer = setInterval(function() {
        var w = $('.header_img_ul li img').width();
        num++;
        if (num > 4) {
            num = 0;
            $('.header_img_ul').css('left', -num * w);
            num = 1;
        }
        $('.header_img_ul').animate({ 'left': -num * w });
        if (num == 4) {
            $('.txt').attr("placeholder", arr[0]);
            $('.text_paint').eq(0).fadeIn();
            $('.text_paint').eq(0).siblings('.text_paint').fadeOut(1000);
        }
        $('.txt').attr("placeholder", arr[num]);
        $('.text_paint').eq(num).fadeIn();
        $('.text_paint').eq(num).siblings('.text_paint').fadeOut(1000);
    }, 3000)
}
go();
$('.header_img').hover(function() {
    clearInterval(timer);
}, function() {
    go();
});

// 点击左右切换图片
$('.left').click(function(event) {
    var w = $('.header_img_ul li img').width();
    num--;
    if (num < 0) {
        num = 4;
        $('.header_img_ul').css('left', -num * w);
        num = 3;
    }
    if (num == 4) {
        $('.txt').attr("placeholder", arr[0]);
        $('.text_paint').eq(0).fadeIn();
        $('.text_paint').eq(0).siblings('.text_paint').fadeOut(1000);
    }
    $('.header_img_ul').animate({ 'left': -num * w });
    $('.txt').attr("placeholder", arr[num]);
    $('.text_paint').eq(num).fadeIn();
    $('.text_paint').eq(num).siblings('.text_paint').fadeOut(1000);
});
$('.right').click(function(event) {
    var w = $('.header_img_ul li img').width();
    num++;
    if (num > 4) {
        num = 0;
        $('.header_img_ul').css('left', -num * w);
        num = 1;
    }
    if (num == 4) {
        $('.txt').attr("placeholder", arr[0]);
        $('.text_paint').eq(0).fadeIn();
        $('.text_paint').eq(0).siblings('.text_paint').fadeOut(1000);
    }
    $('.header_img_ul').animate({ 'left': -num * w });
    $('.txt').attr("placeholder", arr[num]);
    $('.text_paint').eq(num).fadeIn();
    $('.text_paint').eq(num).siblings('.text_paint').fadeOut(1000);
});

$('.tour_fixed ul li:nth-of-type(2)').hover(function() {
    $('.tour_app').css('display', 'block');
}, function() {
    $('.tour_app').css('display', 'none');
});
$(window).scroll(function(event) {
    if ($(window).scrollTop() >= 500) {
        $('.tour_fixed').css('display', 'block');
    } else {
        $('.tour_fixed').css('display', 'none');
    }
});
$('.tour_fixed ul li:nth-of-type(1)').click(function(event) {
    $('html,body').animate({ 'scrollTop': '0' }, 500)
});
$('.tour_fixed li').hover(function() {
    $(this).css({ 'background': '#95d195', 'color': '#fff' });
}, function() {
    $(this).css({ 'background': '#fff', 'color': '#b2b2b2' });
});