<template>
	<view>
		<rich-text :nodes="richText"></rich-text>
	</view>
</template>

<script>
	import {loginAgreement} from "@/api/api.js"
	export default {
		data() {
			return {
				richText:null,
			};
		},
		onLoad() {
			this.loginAgreement()
		},
		methods:{
			async loginAgreement(){
				let res = await loginAgreement()
				if(res.code == 0){
					this.richText = res.data
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
