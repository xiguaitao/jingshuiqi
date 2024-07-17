<template>
	<view class="box">
		<tito title="发票详情" :leftIconShow="true"></tito>
		<view class="lists">
			<view class="list">
				<view class="list-name">开票状态</view>
				<view class="list-content">SH1716430316</view>
			</view>
			<view class="list">
				<view class="list-name">发票金额</view>
				<view class="list-content">水机回收</view>
			</view>
			<view class="list">
				<view class="list-name">发票内容</view>
				<view class="list-content">张三</view>
			</view>
			<view class="dashedline">
				<view class="conter"></view>
			</view>
			<view class="list">
				<view class="list-name">抬头类型</view>
				<view class="list-content">15762547458</view>
			</view>
			<view class="list">
				<view class="list-name">个人名称</view>
				<view class="list-content">百河泉</view>
			</view>
			<view class="list">
				<view class="list-name">手机号码</view>
				<view class="list-content">13020230801</view>
			</view>
			<view class="list">
				<view class="list-name">邮箱地址</view>
				<view class="list-content">1251452365@qq.com</view>
			</view>
			<view class="list">
				<view class="list-name">申请时间</view>
				<view class="list-content">2024-04-2513:01:01</view>
			</view>
			<view class="list">
				<view class="list-name">开票时间</view>
				<view class="list-content">2024-04-2513:01:01</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.box {
		height: 100%;
		background-color: #F0F3F5;
	}

	.lists {
		padding: 52rpx 32rpx 32rpx;
		box-sizing: border-box;
		background:
			radial-gradient(circle at left top, transparent 20rpx, #fff 0) left top,
			radial-gradient(circle at right top, transparent 20rpx, #fff 0) right top;
		background-repeat: no-repeat;
		background-size: 60% 100%;
		border-radius: 8rpx;
		margin: 0 32rpx;
		.dashedline {
			padding: 52rpx 0;
			box-sizing: border-box;
			position: relative;

			.conter {
				border: 2rpx dashed #C8CBCC;
			}

			&::after,
			&::before {
				content: "";
				width: 56rpx;
				height: 56rpx;
				position: absolute;
				background-color: #F0F3F5;
				border-radius: 50%;
				top: 0;
			}

			&::after {
				left: 0;
				transform: translate(-100%, 50%);
			}

			&::before {
				right: 0;
				transform: translate(100%, 50%);
			}
		}

		.list {
			display: flex;
			margin-bottom: 24rpx;

			.list-name {
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #616466;
				line-height: 33rpx;
				margin-right: 24rpx;
			}

			.list-content {
				flex: 1;
				font-family: PingFang SC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: #14181A;
				line-height: 33rpx;
			}

		}
	}
</style>