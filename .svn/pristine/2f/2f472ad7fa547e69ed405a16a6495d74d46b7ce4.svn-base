<template>
	<view>
		<view class="header"
			:style="{height: menuTop.top + menuTop.height + 'px', paddingBottom:menuTop.height + 'rpx'}">
			<view class="bg">
				<image src="@/static/image/titoBj.png" />
			</view>
			<view class="navbar" v-if="!slotLeft">
				<u-navbar :title="title" :leftIconShow="leftIconShow" @leftClick="goBack()" bgColor="transparent"
					:fixed="false">
				</u-navbar>
			</view>
			<view class="navbar" v-else>
				<u-navbar :title="title" :leftIconShow="leftIconShow" :autoBack="false" bgColor="transparent"
					:fixed="false" :placeholder="true">
					<template #left>
						<slot name="left"></slot>
					</template>
					<template #center>
						<slot name="center"></slot>
					</template>
					<template #right>
						<slot name="right"></slot>
					</template>
				</u-navbar>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tito",
		props: {
			title: {
				type: String,
				default: "标题"
			},
			//是否隐藏 左侧返回键
			leftIconShow: {
				type: Boolean,
				default: true
			},
			//是否开启插槽
			slotLeft: {
				type: Boolean,
				default: false
			},
		},
		mounted() {
			console.log(uni.getMenuButtonBoundingClientRect());
		},
		data() {
			return {
				menuTop: uni.getMenuButtonBoundingClientRect(),
			};
		},
		methods:{
			goBack(){
				const pages = getCurrentPages();
				  if (pages.length > 1) {
				    // 有上一页，返回上一页
				    uni.navigateBack({
				      delta: 1
				    });

				  } else {

				    // 没有上一页，返回首页
				    uni.switchTab({
				      url: '/pages/home/home' // 首页的路径，根据你的页面路径来填写
				    });
				  }
			}
		}
	}
</script>

<style lang="scss">
	.header {
		position: relative;
		height: 176rpx;

		.bg {
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.navbar {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}
	}
</style>