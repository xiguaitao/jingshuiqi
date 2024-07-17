// const WdefBaseUrl = "https://water.cnjly.net" //http://192.168.2.138:8088/kyhl-weixin/
// const WdefBaseUrl = "http://192.168.2.138:8088/kyhl-weixin/" 
const WdefBaseUrl = "http://192.168.2.188:8081/" 
// import req from './app.js'
// let { WdefBaseUrl } = req;
// 封装请求方法
function request(url, method, data, header) {
	let urls=""
	if (!url.includes("/water-platform-app-api")) {
		urls = "/water-platform-app-api" + url;
	} else {
		urls = url;
	}
	let finalHeader = {
		'Content-Type': 'application/x-www-form-urlencoded',
		"token": uni.getStorageSync('token'),
	};
	if (header) {
		finalHeader['Content-Type'] = header || 'application/x-www-form-urlencoded';
		finalHeader.Authorization = header.Authorization || uni.getStorageSync('token');
	}
	return new Promise((resolve, reject) => {
		uni.request({
			header: finalHeader,
			url: WdefBaseUrl + urls,
			method: method,
			data: data || {}, // 根据请求类型决定如何处理请求数据
			withCredentials: true,
			success: (res) => {
				if (res.data && res.data.code == "0") {
					resolve(res.data);
				} else {
					if (res.data.code == "401" || res.data.msg == "token失效" ||  res.data.msg == "token不能为空") {
						uni.showToast({
							title: "登录超时",
							icon: "none",
						});
						uni.removeStorageSync("token")
						setTimeout(() => {
							uni.reLaunch({
								url: "/pages/login/login"
							})
						}, 1000);
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none",
						});
						resolve(res.data);
					}
				}
			},
			fail: (err) => {
				console.log(err, '请求错误');
				uni.showToast({
					title: err.data.msg,
					icon: "none"
				});
				reject(err);
			},
		});
	});
}

// 新增 request.get 方法
request.get = function(url, data, header) {
	return request(url, 'GET', data, header);
};

// 新增 request.put 方法
request.put = function(url, data, header) {
	return request(url, 'PUT', data, header);
};

// 新增 request.post 方法
request.post = function(url, data, header) {
	return request(url, 'POST', data, header);
};

// 新增 request.delete 方法
request.delete = function(url, data, header) {
	return request(url, 'DELETE', data, header);
};
// 配置请求拦截器
uni.addInterceptor('request', {
	// 请求前
	invoke(res) {
		// let position = res.url.indexOf("baby-guardian-app-api/user/login")
		// if(position !== -1){
		// 	res.header["Content-Type"] = "application/json"
		// }
	},
	// 请求后
	success(res) {},
	// 回调后
	complete(res) {}
});

export default request