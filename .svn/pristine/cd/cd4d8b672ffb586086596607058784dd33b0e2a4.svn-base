<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";


	/* 未选中的背景样式 */
	checkbox .wx-checkbox-input {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
	}

	/* 选中后的背景样式 */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #2590FA;
	}

	/* 选中后的勾子样式 */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 50%;
		text-align: center;
		font-size: 32rpx;
		color: #FFF;
		background: transparent;
		transform: translate(-50%, -50%) scale(1);
		-webkit-transform: translate(-50%, -50%) scale(1);
	}
</style>