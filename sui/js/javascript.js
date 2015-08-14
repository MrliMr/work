$(function() {
	//	启动swiper
	$(".swiper-container").swiper();
	//	icon高宽适应
	$(".info-box.round .col-25").height($(".info-box.round .col-25").width() + 'px');
	window.onresize = function() {
			$(".info-box.round .col-25").height($(".info-box.round .col-25").width() + 'px');
		}
		//	汉堡菜单栏
	$('.hamburger-icon,.panel-overlay').click(function() {
		$('.hamburger-icon').toggleClass('active');
	});
	//	$.alert('均为测试数据不要当真')




	/*=== Popup ===*/
	var myPhotoBrowserPopup = $.photoBrowser({
		photos: [
			'//img.alicdn.com/tps/i3/TB1kt4wHVXXXXb_XVXX0HY8HXXX-1024-1024.jpeg',
			'//img.alicdn.com/tps/i1/TB1SKhUHVXXXXb7XXXX0HY8HXXX-1024-1024.jpeg',
			'//img.alicdn.com/tps/i4/TB1AdxNHVXXXXasXpXX0HY8HXXX-1024-1024.jpeg',
			'http://e.hiphotos.baidu.com/image/pic/item/3ac79f3df8dcd100363bf83f708b4710b9122f0c.jpg?qq-pf-to=pcqq.c2c',
			'http://i10.topitme.com/l056/1005647864feea7535.jpg',
			'http://h.hiphotos.baidu.com/image/pic/item/b2de9c82d158ccbfebfca0ab1bd8bc3eb03541da.jpg'
		],
		type: 'popup'
	});
	$(document).on('click', '.pb-popup', function() {
		myPhotoBrowserPopup.open();
	});


});