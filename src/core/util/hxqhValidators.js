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



// 英文、数字
export function isLetterNumber(str) {
	const letterNumber = /^[A-Za-z0-9]+$/;
	return letterNumber.test(str);
}

// 特殊字符
export function isSpecificWord(str) {
	var specialKey = "[`~!#^&*()=|{}':;',\\[\\].<>/?~！#……&*{}‘；']‘'"; 
		for (var i = 0; i < str.length; i++) {
			if (specialKey.indexOf(str.substr(i, 1)) != -1) {
				return false;
			}
		}
	return true;
}

/* 小写字母*/
export function isLowerCase(str) {
	const reg = /^[a-z]+$/;
	return reg.test(str);
}

/* 合法URL*/
export function isURL(textval) {
	const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
	return urlregex.test(textval);
}

//不允许特殊字符
export function isSpecificKey(rule, value, callback) { 
	if(!value) {
		callback();
	} else {
		if(!isSpecificWord(value)) {
			callback(new Error('不支持特殊符号'));
		} else {
			callback();
		}
	}
}

//验证用户名
export function isUserName(rule, value, callback) { 
	if(!value) {
		callback(new Error('不能为空'));
	} else {
		if(!isSpecificWord(value)) {
			callback(new Error('不支持特殊符号'));
		} else {
			var targ = /^[a-zA-Z][a-zA-Z0-9_]*$/;
			if( !isLetterNumber(value)){
				callback(new Error('用户名只能由字母数字下划线组成'));
			}
			callback();
		}
	}
}

//验证手机号
export function isPhone(rule, value, callback) {
	if (!value) {
		callback(new Error('不能为空'));
	}
	var pattern = /^1[3456789]\d{9}$/
	if(pattern.test(value)){
		return callback()
	}
	callback(new Error('请输入有效的手机号码'))
}

/* 电子邮箱*/
export function isEmail (rule, value, callback) { //验证电子邮箱
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
}

	
export function isNickname (rule, value, callback) {//验证人员姓名
   if(!value) {
		callback(new Error('不能为空'));
	} else {
		if(!isSpecificWord(value)) {
			callback(new Error('不支持特殊符号'));
		} else {
			callback();
		}
	}
}


export function isWorknumber (rule, value, callback) {//验证工号
    if(!value) {
		callback(new Error('不能为空'));
	} else {
		if(!isSpecificWord(value)) {
			callback(new Error('不支持特殊符号'));
		} else {
			var targ = /^[A-Za-z0-9]+$/;
			if( !targ.test(value)){
				callback(new Error('工号只支持英文、数字'));
			}
			callback();
		}
	}
}

export function isIdnumber (rule, value, callback) { //验证身份证号
	if(value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
		callback(new Error('身份证号码不符合规范'))
	} else {
		callback()
	}
}


export function isIpaddress (rule, value, callback) { //验证IP地址
	if(value && (!(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/).test(value))) {
		callback(new Error('IP地址不符合规范，xxx.xxx.xxx.xxx'))
	} else {
		callback()
	}
}

export function isMacaddress (rule, value, callback) { //验证MAC地址
	if(value && (!(/^[A-F0-9]{2}(-[A-F0-9]{2}){5}$|^[A-F0-9]{2}(:[A-F0-9]{2}){5}$/).test(value))) {
		callback(new Error('MAC地址不符合规范，xx-xx-xx-xx-xx-xx'))
	} else {
		callback()
	}
}

export function isFillTips (rule, value, callback) {//验证备注
	if(!value) {
		callback(new Error('不能为空'));
	} else {
		if(!isSpecificWord(value)) {
			callback(new Error('不支持特殊符号'));
		}
		callback();
		
	}
}

export function isZipcode (rule, value, callback) {//验证邮政编码
	if (value && (!(/^[0-9]{6}$/).test(value))) {
		callback(new Error('邮政编码不符合规范'))
	} else {
		callback()
	}
}

export function isTelephone (rule, value, callback) {//验证电话号码
	var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
	if (!reg.test(value)) {
		callback(new Error('请输入有效的电话号码，格式为：0000-0000000'));
	} else {
		callback();
	}
}


// 验证是否整数
export function isInteger(rule, value, callback) {
	if (!value) {
		return callback(new Error('输入不可以为空'));
	}
	setTimeout(() => {
		if (!Number(value)) {
			callback(new Error('请输入正整数'));
		} else {
			const re = /^[0-9]*[1-9][0-9]*$/;
			const rsCheck = re.test(value);
			if (!rsCheck) {
				callback(new Error('请输入正整数'));
			} else {
				callback();
			}
		}
	}, 1000);
}
 
 
// 验证是否是[0-1]的小数
export function isDecimal(rule, value, callback) {
	if (!value) {
		return callback(new Error('输入不可以为空'));
	}
	setTimeout(() => {
		if (!Number(value)) {
			callback(new Error('请输入数字'));
		} else {
			if (value < 0 || value > 1) {
				callback(new Error('请输入[0,1]之间的数字'));
			} else {
				callback();
			}
		}
	}, 1000);
}


// 验证端口是否在[0,65535]之间
export function isPort(rule, value, callback) {
	if (!value) {
		return callback(new Error('输入不可以为空'));
	}
	setTimeout(() => {
		if (value == '' || typeof(value) == undefined) {
			callback(new Error('请输入端口值'));
		} else {
			const re = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
			const rsCheck = re.test(value);
			if (!rsCheck) {
				callback(new Error('请输入在[0-65535]之间的端口值'));
			} else {
				callback();
			}
		}
	}, 1000);
}


