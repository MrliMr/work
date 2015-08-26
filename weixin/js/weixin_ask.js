//  ================================ 
//  = 动态控制文本框高度
//  ================================ 	
$('textarea').keyup(function() {
	newsBoxSet($(this));
	$(this).height(this.scrollHeight);
	//	$('.bar.bar-tab').height($('.news-box').height());
});
$('textarea').focus(function() {
	newsBoxSet($(this));
	setTimeout(function() {
		$('body').scrollTop(10000)
	}, 50);
});

function newsBoxSet(dom) {
	if (MonitorContent(dom)) {
		dom.next('button').addClass('allow');
	} else {
		dom.next('button').removeClass('allow');
	}
};

function MonitorContent(dom) {
	return Boolean(dom.val());
}

//  ====================== 
//  = 异步发送信息 = 
//  ====================== 

function SendSMS() {
		if (Boolean($(".SMS-INFO").val())) {
			$.ajax({
				type: "get",
				url: "json/more.json",
				data: {
					content: $('.SMS-INFO').val()
				},
				beforeSend: function() {
					InsertInfo($('.SMS-INFO').val(), 'lawyer');

					SetScroll();
				},
				success: function() {
					InsertInfo('谢谢律师！', 'guest');
					$('.SMS-INFO').val('');
					$('.news-box button').removeClass('allow');
					SetScroll();
				}
			});
		}
	}
	//  ================================================================ 
	//  = 调整chatbox滚动条位置让滚动条位置始终保持在底部 = 
	//  ================================================================

function SetScroll() {
	
		var domLength = $(".chat-box>div").length;

		var chatBoxH = 0;
		for (var i = 0; i < domLength; i++) {
			chatBoxH += parseInt($(".chat-box>div").eq(i).height()) + parseInt($(".chat-box>div").eq(i).css('margin-bottom'));
		
		}
		$('.content').scrollTop(chatBoxH);
	}
	//  ========== 
	//  = 向chatbox中填入内容 =
	//	=type：guest为访客，type：lawyer为律师=
	//  ========== 

function InsertInfo(info, type) {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	if (type == 'guest') {
		var SmsMod = "<div class='chat-info-box'><h4 class='time'>" + year + "年" + month + "月" + day + "日" + "<span class='time-detail'>" + hour + ":" + minute + "</span></h4><div class='sms-box'><div class='head-img'>答</div><div class='info guest'><p>" + info + "</p></div></div></div>";
		$(".chat-box").append(SmsMod);
	} else {
		var SmsMod = "<div class='chat-info-box lawyer'><h4 class='time'>" + year + "年" + month + "月" + day + "日" + "<span class='time-detail'>" + hour + ":" + minute + "</span></h4><div class='sms-box'><div class='info lawyer'><p>" + info + "</p></div><div class='head-img'>答</div></div></div>";
		$(".chat-box").append(SmsMod);
	}
}
window.onload = function(){
	SetScroll();
}
