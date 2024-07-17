import req from './url.js'
let { WdefBaseUrl } = req;
// 图片上传
function uploadFile(url, data, name) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: WdefBaseUrl + url,
			filePath: data, //图片路径
			name: name,
			header: {
				"token": uni.getStorageSync('token'),
			},
			timeout: 30000,
			// formData: data,
			success: (res) => {
				resolve(JSON.parse(res.data))
			},
			fail: (error) => {
				 //抛出异常
			},
			complete: () => {}
		})
	})

}

// 配置请求拦截器
uni.addInterceptor('request', {
	// 请求前
	invoke(res) {

	},
	// 请求后 
	success(res) {

	},
	// 回调后
	complete(res) {

	}
});

export default uploadFile