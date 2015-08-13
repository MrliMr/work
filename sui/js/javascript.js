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
$.open(function(){
	alert();
});
});