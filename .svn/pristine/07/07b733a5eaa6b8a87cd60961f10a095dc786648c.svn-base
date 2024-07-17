<template>
	<view>
		<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="3" multiple :maxCount="maxCount"
			:previewFullImage="previewFullImage" :width="width + 'rpx'" :height="height + 'rpx'">
			<slot>
				<image src="@/static/image/Frame.png" mode="widthFix" style="width: 152rpx;height: 152rpx;"></image>
			</slot>
		</u-upload>
	</view>
</template>

<script>
	import url from "../../api/url.js"
	let {
		WdefBaseUrl
	} = url;
	export default {
		name: "upload",
		props: {
			fileList: {
				type: Array,
				default: () => []
			},
			maxCount: {
				type: [Number, String],
				default: 3
			},
			width: {
				type: [Number, String],
				default: 152,
			},
			height: {
				type: [Number, String],
				default: 152,
			},
			previewFullImage: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {

			};
		},
		methods: {
			//图片上传  选择文件后上传
			async afterRead(e) {
				let uploadImage = await this.uploadFile(e.file)
				this.$emit('afterRead', uploadImage)
			},
			//文件从列表移除时触发
			deletePic(e) {
				this.$emit('deletePic', e)
			},
			//图片转 格式
			async uploadFile(file) {
				if (file.length > 0) {
					const uploadPromises = file.map(item =>
						new Promise((resolve, reject) => {
							uni.uploadFile({
								url: WdefBaseUrl + '/fileUpload/save',
								filePath: item.url, // 图片路径
								name: 'uploadImg', // 确保这个名字与后端接受的字段名一致
								header: {
									"token": uni.getStorageSync('token'),
								},
								timeout: 30000,
								success: (res) => {
									resolve(JSON.parse(res.data));
								},
								fail: (error) => {
									reject(error); // 应该抛出错误，而不是仅仅注释掉
								},
								complete: () => {}
							});
						})
					);

					try {
						const responses = await Promise.all(uploadPromises);
						console.log(responses);
						const uploadedUrls = responses.map(res => {
							if (res.state === "SUCCESS") {
								return {url:res.url};
							}
						})
						return uploadedUrls;
					} catch (error) {
						console.error('文件上传失败:', error);
					}
				}
			}
		},
	}
</script>

<style lang="scss">

</style>