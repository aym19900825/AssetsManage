/** 这个文件只允许放表单验证方法 
只能输入数字："^[0-9]*$"。 
只能输入n位的数字："^\d{n}$"。 
只能输入至少n位的数字："^\d{n,}$"。 
只能输入m~n位的数字：。"^\d{m,n}$" 
只能输入零和非零开头的数字："^(0|[1-9][0-9]*)$"。 
只能输入有两位小数的正实数："^[0-9]+(.[0-9]{2})?$"。 
只能输入有1~3位小数的正实数："^[0-9]+(.[0-9]{1,3})?$"。 
只能输入非零的正整数："^\+?[1-9][0-9]*$"。 
只能输入非零的负整数："^\-[1-9][]0-9"*$。 
只能输入长度为3的字符："^.{3}$"。 
只能输入由26个英文字母组成的字符串："^[A-Za-z]+$"。 
只能输入由26个大写英文字母组成的字符串："^[A-Z]+$"。 
只能输入由26个小写英文字母组成的字符串："^[a-z]+$"。 
只能输入由数字和26个英文字母组成的字符串："^[A-Za-z0-9]+$"。 
只能输入由数字、26个英文字母或者下划线组成的字符串："^\w+$"。 
验证用户密码："^[a-zA-Z]\w{5,17}$"正确格式为：以字母开头，长度在6~18之间，只能包含字符、数字和下划线。 
验证是否含有^%&',;=?$\"等字符："[^%&',;=?$\x22]+"。 
只能输入汉字："^[\u4e00-\u9fa5]{0,}$"
以英文字母开头，只能包含英文字母、数字、下划线："^[a-zA-Z][a-zA-Z0-9_]*$"。

**/
const validators = {
	isLetterNumber:function (str) {// 英文、数字
		const letterNumber = /^[A-Za-z0-9]+$/;
		return letterNumber.test(str);
	},

	isSpecificWord:function (str) {// 特殊字符
		var specialKey = "[`~!#^&*()=|{}':;',\\[\\].<>/?~！#……&*{}‘；']‘'"; 
			for (var i = 0; i < str.length; i++) {
				if (specialKey.indexOf(str.substr(i, 1)) != -1) {
					return false;
				}
			}
		return true;
	},

	isLowerCase:function (str) {/* 小写字母*/
		const reg = /^[a-z]+$/;
		return reg.test(str);
	},

	isURL:function (textval) {/* 合法URL*/
		const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
		return urlregex.test(textval);
	},

	isSpecificKey:function (rule, value, callback) { //不允许特殊字符
		if(!value) {
			callback();
		} else {
			if(!validators.isSpecificWord(value)) {
				callback(new Error('不支持特殊符号'));
			} else {
				callback();
			}
		}
	},

	isUserName:function (rule, value, callback) { //验证用户名
		if(!value) {
			callback(new Error('不能为空'));
		} else {
			if(!validators.isSpecificWord(value)) {
				callback(new Error('不支持特殊符号'));
			} else {
				var targ = /^[a-zA-Z][a-zA-Z0-9_]*$/;
				if( !isLetterNumber(value)){
					callback(new Error('用户名只能由字母数字下划线组成'));
				}
				callback();
			}
		}
	},

	isPhone:function (rule, value, callback) {//验证手机号
		if (!value) {
			callback(new Error('不能为空'));
		}
		var pattern = /^1[3456789]\d{9}$/
		if(pattern.test(value)){
			return callback()
		}
		callback(new Error('请输入有效的手机号码'))
	},

	isEmail:function (rule, value, callback) { //验证电子邮箱
		if(!value) {
			callback(new Error('不能为空'));
		} else {
			var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if(!reg.test(value)) {
				callback(new Error('请输入有效的邮箱'));
			} else {
				callback();
			}
		}
	},

	isNickname:function (rule, value, callback) {//验证人员姓名
	   if(!value) {
			callback(new Error('不能为空'));
		} else {
			if(!validators.isSpecificWord(value)) {
				callback(new Error('不支持特殊符号'));
			} else {
				callback();
			}
		}
	},

	isWorknumber:function (rule, value, callback) {//验证工号
	    if(!value) {
			callback(new Error('不能为空'));
		} else {
			if(!validators.isSpecificWord(value)) {
				callback(new Error('不支持特殊符号'));
			} else {
				var targ = /^[A-Za-z0-9]+$/;
				if( !targ.test(value)){
					callback(new Error('工号只支持英文、数字'));
				}
				callback();
			}
		}
	},

	isIdnumber:function (rule, value, callback) { //验证身份证号
		if(value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
			callback(new Error('身份证号码不符合规范'))
		} else {
			callback()
		}
	},

	isIpaddress:function (rule, value, callback) { //验证IP地址
		if(value && (!(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/).test(value))) {
			callback(new Error('IP地址不符合规范，xxx.xxx.xxx.xxx'))
		} else {
			callback()
		}
	},

	isMacaddress:function (rule, value, callback) { //验证MAC地址
		if(value && (!(/^[A-F0-9]{2}(-[A-F0-9]{2}){5}$|^[A-F0-9]{2}(:[A-F0-9]{2}){5}$/).test(value))) {
			callback(new Error('MAC地址不符合规范，xx-xx-xx-xx-xx-xx'))
		} else {
			callback()
		}
	},

	isFillTips:function (rule, value, callback) {//验证备注
		if(!value) {
			callback(new Error('不能为空'));
		} else {
			if(!validators.isSpecificWord(value)) {
				callback(new Error('不支持特殊符号'));
			}
			callback();
			
		}
	},

	iszipcode:function (rule, value, callback) {//验证邮政编码
		if (value && (!(/^[0-9]{6}$/).test(value))) {
			callback(new Error('邮政编码不符合规范'))
		} else {
			callback()
		}
	},

	istelephone:function (rule, value, callback) {//验证电话号码
		var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
		if (!reg.test(value)) {
			callback(new Error('请输入有效的电话号码，格式为：0000-0000000'));
		} else {
			callback();
		}
	}

};


export default validators