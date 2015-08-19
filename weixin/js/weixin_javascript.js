//  ========== 
//  = 控制密码显示隐藏 = 
//  ========== 
$('i.icon.icon-form-password.see').tap(function() {
	$(this).toggleClass(function(a, b) {
		if (b == 'icon icon-form-password see') {
			$('#password').attr('type', 'text');

		} else {
			$('#password').attr('type', 'password');
		}
		return 'hide';
	});
});
