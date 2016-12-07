/*
* @Author: Ly
* @Date:   2016-11-26 10:14:41
* @Last Modified by:   Ly
* @Last Modified time: 2016-12-05 14:02:56
*/

//顶部导航广告
$(function() {
	setTimeout(function() {
		$('#top-adt-big').animate({'height':'0'},2000,function() {
			$('#top-adt').animate({'height':'100px'},1000)
		});
	},1000)
});

//顶部广告关闭按钮
$(document).ready(function () {
	$('#top-adt-x').click(function () {
		// $("#layout-adt").fadeOut("slow");
		$('#top-adt').animate({'height':'0'},1000);
		// $('#layout-adt').animate({'height':'0'},1000);
	});
});

//详细列表缓慢下拉效果
// $(document).ready(function () {
// 	$(".ng-bar-node-box").hover(function () {
// 		$(this).find(".ng-down-box").stop().slideDown("fast");
// 	}, function () {
// 		$(this).find(".ng-down-box").stop().slideUp("fast");
// 	});
// });

// 方案1.hover延时缓慢下拉效果
(function($){
    $.fn.hoverDelay_one = function(options){
        var defaults = {
            hoverDuring: 150,
            outDuring: 150,
            hoverEvent: function(){
                $.noop();
            },
            outEvent: function(){
                $.noop();    
            }
        };
        var sets = $.extend(defaults,options || {});
        var hoverTimer, outTimer;
        return $(this).each(function(){
            $(this).hover(function(){
            	var obj = $(this);
                clearTimeout(outTimer);
                hoverTimer = setTimeout(function () {
                	obj.find(".ng-down-box").stop().slideDown(100, function () {
            			obj.find(".ng-bar-node").addClass("ng-bar-node-hover");
                	});
                }, sets.hoverDuring);
            }, function(){
                var obj = $(this);
                clearTimeout(hoverTimer);
                outTimer = setTimeout(function () {
                	obj.find(".ng-down-box").stop().slideUp(100, function () {
            			obj.find(".ng-bar-node").removeClass("ng-bar-node-hover");
                	});
                }, sets.outDuring);
            });    
        });
    }      
})(jQuery);

// $(document).ready(function () {
// 	$(".ng-site-nav-box").hoverDelay();
// 	$(".shop-handle").hoverDelay();
// 	$(".myorder-handle").hoverDelay();
// 	$(".mysuning-handle").hoverDelay();
// 	$(".app-down-box").hoverDelay();
// 	$(".service-handle").hoverDelay();
// });

// 方案2.hover延时缓慢下拉效果
(function($){
    $.fn.hoverDelay = function(options){
        var defaults = {
            hoverDuring: 150,
            outDuring: 150,
            hoverEvent: function(){
                $.noop();
            },
            outEvent: function(){
                $.noop();    
            }
        };
        var sets = $.extend(defaults,options || {});
        var hoverTimer, outTimer;
        return $(this).each(function(){
            // 保存当前上下文的this对象
            var $this = $(this)
            $this.hover(function(){
                clearTimeout(outTimer);
                hoverTimer = setTimeout(function () {
                    // 改变上下文this
                    sets.hoverEvent.apply($this);
                }, sets.hoverDuring);
            }, function(){
                clearTimeout(hoverTimer);
                outTimer = setTimeout(function () {
                    sets.outEvent.apply($this);
                }, sets.outDuring);
            });
        });
    }      
})(jQuery);

$(document).ready(function () {
    $(".ng-bar-node-box").each(function (){
        $(this).hoverDelay({
            hoverEvent: function(){
                var $this = $(this);
                $this.find(".ng-down-box").stop().slideDown(100, function () {
                    $this.find(".ng-bar-node").addClass("ng-bar-node-hover");
                });
            },
            outEvent: function(){
                var $this = $(this);
                $this.find(".ng-down-box").stop().slideUp(100, function () {
                    $this.find(".ng-bar-node").removeClass("ng-bar-node-hover");
                });
            },
        })
    })
});

// 详细导航右拉淡入淡出
$(document).ready(function () {
	var box = $(".ng-sort-detail");
	box.each(function () {
		var hoverTimer, outTimer;
		$(this).parent().hover(function () {
			clearTimeout(outTimer);
			var obj = $(this);
			hoverTimer = setTimeout(function () {
				obj.find(".ng-sort-detail").slideDown(100, function () {
					obj.addClass("sort-list-hover");
				})
			}, 150);
		}, function () {
			clearTimeout(hoverTimer);
			var obj = $(this);
			outTimer = setTimeout(function () {
				obj.find(".ng-sort-detail").slideUp(100, function () {
					obj.removeClass("sort-list-hover");
				});
			}, 150)
		})
	})
});

// 大图轮播
$(document).ready(function () {
	var length,
		currentIndex = 0,
		interval,
		hasStarted = false,	// 是否已经开始轮播
		sliderTime = 3000;	// 轮播时间间隔
	length = $(".banner li").length;
	// 将第一个slider-item设为激活状态
    $('.page-item:first').addClass('current');
    //鼠标上悬时停止滑动，鼠标离开时开始滑动
    $('.banner li a, .angle-btn').hover(function () {
    	sliderStop();
    }, function () {
    	sliderStart();
    })

    $('.page-item').hover(function () {
    	stop();
    	var preIndex = $('.page-item').filter('.current').index();
    	currentIndex = $(this).index();
    	sliderPlay(preIndex, currentIndex);
    }, function() {
    	sliderStart();
    });

    $('.prev-btn').unbind('click');
    $('.prev-btn').bind('click', function () {
        prev();
    });
    $('.next-btn').unbind('click');
    $('.next-btn').bind('click', function () {
        next();
    });

    // 向前翻页
    function prev() {
        var preIndex = currentIndex;
        currentIndex = (--currentIndex + length) % length;
        sliderPlay(preIndex, currentIndex);
    }

    // 向后翻页
    function next() {
        var preIndex = currentIndex;
        currentIndex = ++currentIndex % length;
        sliderPlay(preIndex, currentIndex);
    }

    function sliderPlay(preIndex, currentIndex) {
        $('.banner li').eq(preIndex).stop(true).fadeOut(500)
            .parent().children().eq(currentIndex).stop(true).fadeIn(1000);
        $('.page-item').removeClass('current');
        $('.page-item').eq(currentIndex).addClass('current');
    }

    // 开始轮播
    function sliderStart() {
        if (!hasStarted) {
            hasStarted = true;
            interval = setInterval(next, sliderTime);
        }
    }
    function sliderStop() {
        clearInterval(interval);
        hasStarted = false;
    }
    //开始轮播
    sliderStart();
});

// 标签tab切换
$(document).ready(function () {
    $('.g-floor .floor-tab li').mouseenter(function () {
        $(this).addClass('on');
        $(this).siblings().removeClass('on');
        var num = $(this).index();
        var cont = $(this).parents('.g-floor').find('.main-cont').eq(num);
        if (cont.length > 0) {
            cont.css('display', 'block');
            cont.siblings('.main-cont').css('display', 'none');
        }
    });
});

// 顶部浮动导航
$(document).ready(function () {
    // var Logo = $("#layout_float_nav");
    // $(window).scroll(function () {
    //     if ($(window).scrollTop() > 700) {

    //         Logo.addClass("ScrollNav");
    //     } else {
    //         Logo.removeClass("ScrollNav");
    //     }
    // });
});

// 是否是大屏标志
var bigscreen = function () {
    return !!($(window).width() > 1190)
}();

// 判断大小屏
$(window).bind("resize", function () {
    bigscreen = !!($(window).width() > 1190);
});

// 左侧固定导航显隐
var floatBarEffect = function () {
    var bar = $('.ECode-floatBar'),
        floorHeight = $(".g-floor:first").offset().top,
        footerHeight = $(".ng-footer").offset().top;
        
    function barShow() {
        var scroll = parseInt($(document).scrollTop()),
            windowHeight = $(window).height();
        if (scroll + windowHeight > floorHeight
            && footerHeight > (scroll + windowHeight - 250)) {
            bar.show();
        } else {
            bar.hide();
        }
    }
    function barHide() {
        bar.hide();
    }
    // 文档加载时运行一次
    bigscreen && barShow();
    // 自定义绑定
    $(window).bind("scroll resize", function () {
        if (bigscreen) {
            barShow()
        } else {
            barHide();
        }
    });
};

// 左侧固定导航
var floorGuide = function () {
    var barList = $('.floor-guide'),
        barNodes = barList.find('li'),
        goTop = $("#goTop");
    // 返回顶部
    goTop.click(function () {
        $("html, body").stop().animate({scrollTop: 0}, 500)
    });
    if (barList.length == 0) {
        return
    }
    // 导航结点添加点击事件
    barNodes.click(function () {
        // 获取锚点链接
        var rel = "." + $(this).attr("rel");
        if ($(rel).length == 0) {
            return
        }
        // 点亮当前结点
        $(this).addClass("on").siblings().removeClass("on");
        $("html, body").stop(true).animate({scrollTop: $(rel).offset().top - 50}, "fast", function () {
        });
    });

    // 返回索引对应楼层的文档偏移差值
    function floorOffset(index) {
        var floor = $(".g-floor").eq(index);
        if (floor.length > 0) {
            return floor.offset().top - $(document).scrollTop()
        }
    }

    function barGuide() {
        if (floorOffset(0) - 150 <= 0) {
            // 浏览过第一个楼层才进入处理
            var floors = $(".g-floor");
            var num = floors.length;
            for (var index = 1; index < num; index++) {
                var len = floorOffset(index);
                if (floorOffset(index) - 150 < 0) {
                    barNodes.eq(index).addClass("on").siblings().removeClass("on");
                    return
                }
            }
            barNodes.eq(0).addClass("on").siblings().removeClass("on");
        } else {
            barNodes.removeClass("on");
        }
    }

    barGuide();
    $(window).scroll(function () {
        if (bigscreen) {
            barGuide();
        }
    });
};

// 右侧导航显隐
var sidebarEffect = function () {
    var sidebars = $(".sidebar"),
        member = sidebars.find(".sidebar-tab-member"),
        hideBars = sidebars.find(".sidebar-tab").not(".sidebar-tab-cart, .sidebar-to-top, .sidebar-tab-member"),
        bg = sidebars.find(".sidebar-bg")

    function sidebarShow () {
        bg.show();
        // 屏幕高度过小时隐藏部分元素
        if ($(window).height() < 520) {
            member.css("visibility", "hidden");
            hideBars.addClass("hide");
        } else {
            member.css("visibility", "visible");
            hideBars.removeClass("hide");
        }
    }
    function sidebarHide () {
        bg.hide();
        member.css("visibility", "hidden");
        hideBars.addClass("hide");
    }
    sidebars.hover(function () {
        if (!bigscreen) {
            sidebarShow();
        }
    }, function () {
        if (!bigscreen) {
            sidebarHide();
        }
    })
    // 小屏幕时自动隐藏
    if (!bigscreen) {
        sidebarHide();
    } else {
        sidebarShow();
    }
    $(window).resize(function () {
        if (!bigscreen) {
            sidebarHide();
        } else {
            sidebarShow();
        }
    });
};

// 右侧导航右拉效果
var sidebarHover = function () {
    var tabs = $(".sidebar-tab"),
        isCode = false;
    // tabs.each(function () {
    //     var thisTab = $(this);
    //     thisTab.hover(function () {
    //         $(this).find(".tab-tip").stop().animate({"left": "-47px"}, 600);
    //     }, function () {
    //         $(this).find(".tab-tip").stop().animate({"left": "47px"}, 400);
    //     });
    // });
    tabs.hover(function () {
        $(this).hasClass("sidebar-wider-tab") ? $(this).find(".tab-tip").stop().animate({
            left: "-73px"
        }, "normal") : $(this).find(".tab-tip").stop().animate({
            left: "-47px"
        }, "normal")
        if ($(this).hasClass("sidebar-code")) {
            isCode = true;
            $(".sidebar").find(".tab-tip-code-warp").stop().show().animate({left: "-160px"}, "normal");
        }
    }, function () {
        $(this).find(".tab-tip").stop().animate({left: "0"}, "normal");
        if (isCode) {
            isCode = false;
            $(".sidebar").find(".tab-tip-code-warp").stop().animate({left: "0px"}, "normal", function () {
                $(this).hide();
            })
        }
    })
};

$(document).ready(function () {
    floatBarEffect();
    floorGuide();
    sidebarEffect();
    sidebarHover();
});