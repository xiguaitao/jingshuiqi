<template>
	<view>
		<u-subsection bgColor="#EBEEF0" activeColor="#1EABF2" inactiveColor="#424547" :list="list" :current="current"
			mode="button" @change="change" fontSize="14"></u-subsection>
	</view>
</template>

<script>
	export default {
		name: "subsection",
		props: {
			list: {
				type: Array,
				default: []
			},
			current: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {

			};
		},
		methods: {
			change(index) {
				this.$emit("change", index)
			}
		}
	}
</script>

<style lang="scss">

</style>