<template>
	<view class="box">
		<view class="conter">
			<view class="text-kh">
				<text style="color: red;margin-right: 10rpx;">*</text>
				<text>意见描述</text>

			</view>
			<view class="textarea">
				<u--textarea maxlength="200" v-model="userInfo.content" placeholder="请输入内容" count height="256rpx"
					border="none"></u--textarea>
			</view>
			<view class="text-kh uploads">


				<text>上传图片{{ userInfo.images.length }}/3</text>

			</view>
			<view class="upload">
				<upload :fileList="userInfo.images" @afterRead="afterRead" @deletePic="deletePic"></upload>
			</view>
			<view class="text-kh uploads">
				<text style="color: red;margin-right: 10rpx;">*</text>
				<text>手机号</text>

			</view>
			<view class="input">
				<u--input type="number" placeholder="请输入手机号" :maxlength="11" border="none"
					v-model="userInfo.mobile"></u--input>
			</view>
		</view>
		<view class="btn">
			<view class="text" @click="saveAddr">
				提交建议
			</view>
		</view>
	</view>
</template>

<script>
import {
	faqFeedback
} from "@/api/api.js"
export default {
	data() {
		return {
			userInfo: {
				content: '', //意见描述
				images: [],
				mobile: "", //手机号
			},
		};
	},
	methods: {
		//图片上传
		afterRead(e) {
			this.userInfo.images = [...this.userInfo.images, ...e]
			console.log(this.userInfo.images);
		},
		//文件从列表移除时触发
		deletePic({
			file
		}) {
			const index = this.userInfo.images.findIndex(item => item.url === file.url);
			if (index !== -1) {
				this.userInfo.images.splice(index, 1);
				console.log(this.userInfo.images);
			}
		},
		//提交建议
		async saveAddr() {
			if (!this.userInfo.content) {
				return uni.showToast({
					title: "意见描述不能为空！",
					icon: "none"
				})
			}
			if (!this.userInfo.mobile) {
				return uni.showToast({
					title: "手机号不能为空！",
					icon: "none"
				});
			}
			// 验证手机号格式
			const mobileRegex = /^1[3-9]\d{9}$/;
			if (!mobileRegex.test(this.userInfo.mobile)) {
				return uni.showToast({
					title: "手机号格式不正确！",
					icon: "none"
				});
			}
			const logs = this.userInfo.images.map(item => item.url).join(',');
			console.log(logs, "图片转完了");
			let data = {
				content: this.userInfo.content, //	意见描述
				logos: logs, //图片(多张逗号分隔)
				mobile: this.userInfo.mobile, //手机号
			}
			let res = await faqFeedback(data)
			if (res.code == 0) {
				uni.showToast({
					title: "提交成功",
					icon: "none"
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			}
		}
	}
}
</script>

<style lang="scss">
.box {
	height: 100%;
	background-color: #F0F3F5;
	overflow: hidden;
}

.conter {
	// height: 934rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 12rpx 28rpx -4rpx rgba(0, 0, 0, 0.1), 0rpx -12rpx 18rpx -14rpx rgba(0, 0, 0, 0.1);
	border-radius: 8rpx;
	margin: 48rpx 32rpx;
	padding: 32rpx;
	box-sizing: border-box;

	.text-kh {
		font-family: PingFang SC, PingFang SC;

		.text {
			font-weight: 500;
			font-size: 28rpx;
			color: #2E3133;
		}

		.kh {
			font-size: 24rpx;
			color: #616466;
		}
	}

	.textarea {
		margin-top: 26rpx;

		::v-deep .u-textarea {
			background-color: #F0F3F5 !important;
		}
	}

	.uploads {
		margin-top: 70rpx;
	}

	.upload {
		margin-top: 26rpx;
	}

	.input {
		margin-top: 26rpx;

		::v-deep .u-input {
			padding: 20rpx !important;
			box-sizing: border-box;
			background-color: #F0F3F5 !important;
		}
	}

}

.btn {
	width: 100%;
	background-color: #FFFFFF;
	position: fixed;
	bottom: 0%;
	left: 0%;
	padding: 32rpx;
	box-sizing: border-box;

	.text {
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-family: PingFang SC, PingFang SC;
		font-weight: 500;
		font-size: 32rpx;
		color: #FFFFFF;
		background: #1DABF2;
	}
}
</style>