<template>
	<view class="box">
		<view class="form">
			<u--form labelPosition="left" :model="userInfo" :rules="rules" ref="uForm" labelAlign="left" labelWidth="75"
				:labelStyle="{ fontSize: '28rpx', marginRight: '24rpx' }">
				<u-form-item label="发票抬头" prop="userInfo.radio" ref="item1">
					<u-radio-group v-model="userInfo.radio" placement="row" @change="groupChange">
						<u-radio :customStyle="{marginRight: '66rpx'}" v-for="(item, index) in radiolist1" :key="index"
							:label="item.name" :name="item.value">
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item prop="userInfo.name" label="企业名称">
					<view style="background: #F3F5F6;border-radius: 12rpx;">
						<u--input placeholder="请输入企业名称" border="surround" v-model="userInfo.name"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.name" label="识别号">
					<view style="background: #F3F5F6;border-radius: 12rpx;">
						<u--input placeholder="请输入识别号" border="surround" v-model="userInfo.name"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.name" label="手机号码">
					<view style="background: #F3F5F6;border-radius: 12rpx;">
						<u--input placeholder="请输入手机号码" border="surround" v-model="userInfo.name"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.name" label="邮箱地址">
					<view style="background: #F3F5F6;border-radius: 12rpx;">
						<u--input placeholder="请输入邮箱地址" border="surround" v-model="userInfo.name"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.name" label="开户银行">
					<view style="background: #F3F5F6;border-radius: 12rpx;">
						<u--input placeholder="请输入开户银行" border="surround" v-model="userInfo.name"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.name" label="银行卡号">
					<view style="background: #F3F5F6;border-radius: 12rpx;">
						<u--input placeholder="请输入银行卡号" border="surround" v-model="userInfo.name"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.name" label="企业电话">
					<view style="background: #F3F5F6;border-radius: 12rpx;">
						<u--input placeholder="请输入企业电话" border="surround" v-model="userInfo.name"></u--input>
					</view>
				</u-form-item>
				<u-form-item prop="userInfo.name" label="企业地址">
					<view style="background: #F3F5F6;border-radius: 12rpx;">
						<u--input placeholder="请输入企业地址" border="surround" v-model="userInfo.name"></u--input>
					</view>
				</u-form-item>
			</u--form>
		</view>
		<view class="bnt">
			<view class="text" @click="proceed">
				申请
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					radio: "1"
				},
				radiolist1: [{
						name: '个人',
						value: "1",
					},
					{
						name: '企业',
						value: "2",
					},
				],
				rules: {
					'userInfo.sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
				},
			};
		},
		methods: {
			groupChange(n) {
				console.log('groupChange', n);
			},
		}
	}
</script>

<style lang="scss">
	.box {
		height: 100%;
		background-color: #EFF2F4;
		overflow: hidden;
	}

	.form {
		background: #FFFFFF;
		box-shadow: 0rpx 12rpx 28rpx -4rpx rgba(0, 0, 0, 0.1), 0rpx -12rpx 18rpx -14rpx rgba(0, 0, 0, 0.1);
		border-radius: 8rpx;
		margin: 48rpx 32rpx;
		padding: 32rpx;
		box-sizing: border-box;
	}

	.bnt {
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0rpx -4rpx 20rpx -4rpx rgba(100, 101, 102, 0.1);
		position: fixed;
		left: 0%;
		bottom: 0%;
		padding: 24rpx 32rpx;
		box-sizing: border-box;

		.text {
			width: 686rpx;
			height: 88rpx;
			border-radius: 8rpx;
			background-color: #1DABF2;
			text-align: center;
			line-height: 88rpx;
			font-size: 32rpx;
			color: #FFF;
		}
	}
</style>