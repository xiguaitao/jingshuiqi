import url from "./url.js";
let {
	WdefBaseUrl
} = url;

// 请求超出时间
const timeout = 60000;

// 需要修改token，和根据实际修改请求头
export default (params) => {
	let url = params.url;
	let method = params.method || "get";
	let data = params.data || {};
	let responseType = params.responseType || "text";
	let header = {
		token: uni.getStorageSync("token") || "",
		"Content-Type": params.header || "application/json;charset=UTF-8",
		Authorization: `Basic  + ${uni.getStorageSync("token")}`,
	};
	return new Promise((resolve, reject) => {
		uni.request({
			url: WdefBaseUrl + url,
			method: method,
			header: header,
			data: data,
			timeout,
			responseType,
			success: (res) => {
				if (res.data && res.data.code == "0") {
					resolve(res.data);
				} else {
					console.log(res.data,'18574812093');
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
			fail(err) {
				if (err && err.errMsg === "request:fail timeout") {
					// 请求超时
					uni.showToast({
						title: "请求超时,请重试!",
						icon: "none",
					});
					// 这里可以添加其他超时处理逻辑
				} else {
					// 其他请求失败情况
					uni.showToast({
						title: res.data.msg,
						icon: "none",
					});
				}
				reject(err); // 将错误信息传递给调用者
			},
			complete() {
				// 不管成功还是失败都会执行
			},
		});
	}).catch(() => {});
};