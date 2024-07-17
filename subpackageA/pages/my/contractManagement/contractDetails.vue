<template>
	<view class="box">
		<view class="dcontract">
			<!-- //指定区域 -->
			<view v-if="status && pdf && contractRecordId && pdfXcx">
				<web-view style="height: 100%;"
					:src="`${pdfXcx}?myParam=${status}&url=${pdf}&contractRecordId=${contractRecordId}`"></web-view>
			</view>
		</view>
	</view>
</template>

<script>
	import url from "../../../../api/url.js";
	let {
		pdfXcx
	} = url
	import {
		contractPreview,
	} from "@/api/api.js"
	export default {
		data() {
			return {
				pdf: null,
				contractRecordId: null,
				status: null,
				pdfDoc: null,
				pdfXcx,
			};
		},
		mounted(ope) {},
		onLoad(ope) {
			console.log(this.pdfXcx, 'pdfXcx');
			if (ope.status) {
				this.status = ope.status
			}
			if (ope.contractRecordId) {
				this.contractRecordId = ope.contractRecordId
				this.contractPreview(ope.contractRecordId)
			}
		},
		methods: {
			// 获取合同预览
			async contractPreview(contractRecordId) {
				let res = await contractPreview({
					contractRecordId
				})
				if (res.data) {
					this.pdf = res.data
				}
			}
		}
	}
</script>

<style lang="scss">
	.box {
		background-color: #FFF;
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: auto;
	}

	.dcontract {
		background-color: #FFF;
		flex: 1;
		overflow-y: auto;
		margin: 48rpx 32rpx;
		border-radius: 8rpx;
	}

	.bnt {
		background: #FFFFFF;
		box-shadow: 0rpx -4rpx 20rpx -4rpx rgba(100, 101, 102, 0.1);

		.text {
			height: 88rpx;
			background: #1DABF2;
			border-radius: 8rpx;
			margin: 32rpx;
			line-height: 88rpx;
			text-align: center;
			color: #FFF;
		}
	}
</style>