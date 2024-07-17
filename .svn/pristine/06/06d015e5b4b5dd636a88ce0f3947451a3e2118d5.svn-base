<template>
	<view>
		<tito title=" " :leftIconShow="true"></tito>
		<view class="image">
			<image src="../../static/zhifucg.png" mode=""></image>
		</view>
		<view class="text">
			恭喜您，支付成功
		</view>
		<view class="btn" @click="getQs">
			返回取水页
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods:{
			getQs(){
				uni.reLaunch({
					url:"/pages/waterIntaking/waterIntaking"
				})
			}
		}
	}
</script>

<style lang="scss">
	.image {
		text-align: center;
		margin-top: 96rpx;
		image {
			width: 316rpx;
			height: 316rpx;
		}
	}
	.text{
		font-weight: 700;
		font-size: 36rpx;
		color: #14181A;
		text-align: center;
	}
	.btn{
		width: 296rpx;
		height: 88rpx;
		background: #1DABF2;
		border-radius: 8rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 88rpx;
		margin: 100rpx auto;
	}
</style>