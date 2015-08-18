//  ========== 
//  = 表单验证 = 
//  ========== 
var validate = {	
//	檢測是否爲空
	empty: function(elem, errmsg) {
		elem = $(elem);
		var value = $.trim(elem[0].value);
		if (value == '') {
			$.alert(errmsg);
		} else {
			return true;
		}
	},
//	手機號碼檢測
	phone: function(elem, errmsg) {
		elem = $(elem);
		var value = $.trim(elem[0].value).replace(/[ ]/g,"");
		if (!/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/.test(value)) {
			$.alert(errmsg);
		} else {
			return true;
		}
	},
//	郵箱檢測
	email: function(elem, errmsg) {
		elem = $(elem);
		var value = $.trim(elem.value);
		alert(value)
		if (!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)) {
			$.alert(errmsg);
		} else {
			return true;
		}
	},
//	相同性檢測
	compare: function(elem1, elem2, errmsg) {
		elem1 = $(elem1);
		elem2 = $(elem2);
		var value1 = $.trim(elem1[0].value);
		var value2 = $.trim(this.value);
		if (value1 !== value2) {
			$.alert(errmsg);
		} else {
			return true;
		}
	},
//	位數范圍檢測
	digit: function(elem, num1, num2, errmsg) {
		elem = $(elem);
		var value = $.trim(elem[0].value);
		if (value.length < 6 || value.length > 20) {
			$.alert(errmsg);
		} else {
			return true;
		}
	}
};