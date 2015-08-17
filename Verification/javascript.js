var validate = {
	empty: function(elem, errmsg) {
		console.log(elem,errmsg);
		elem = $(elem);
		elem.on('blur', function() {
			var value = $.trim(this.value);
			if (value == '') {
				
				return false;
			} else {
				return true;
			}
		})
	},
	phone: function(elem, errmsg) {
		elem = $(elem);
		elem.on("blur", function() {
			var value = $.trim(this.value);
			if (!/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/.test(value)) {
				$.alert(errmsg);
			} else {

			}
		});
	},
	email: function(elem, errmsg) {
		elem = $(elem);
		elem.on("blur", function() {
			var value = $.trim(this.value);
			if (!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)) {
				$.alert(errmsg);
			} else {

			}
		});
	},
	compare: function(elem1, elem2, errmsg) {
		elem1 = $(elem1);
		elem2 = $(elem2);
		elem2.on("blur", function() {
			var value1 = $.trim(elem1[0].value);
			var value2 = $.trim(this.value);
			if (value1 !== value2) {
				$.alert(errmsg);
			} else {

			}
		});
	},
	digit:function(elem,num1,num2,errmsg){
		
	}
};
