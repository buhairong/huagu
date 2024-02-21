<template>
  <view class="faqPage commonPage">
	  <web-view :src="url" @message="handleGetMessage" @onPostMessage="handlePostMessage"></web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
				url:'',
				from: '',
				redirectUrl: '',
      }
    },
		
		onLoad(options) {
			this.from = options.from
			let url = uni.getStorageSync('url') 
			if (url) {
				this.url = url
			}
		},
		
		methods:{
			async handleGetMessage(e){
				console.log('handleGetMessage',e)
				if(this.from === 'sign' && e.detail.data[0].result=='success'){
					let params = uni.getStorageSync('changeCompanyParams') 
					if (params) {
						uni.showLoading({
							title: '加载中'
						})
						
						const res = await this.$getRequest(this.$url.updateUserLoginCompanyInfo, "POST", params)
						
						uni.hideLoading()
						
						if (res.code == 0) {
							uni.reLaunch({
								url:'/pages/workspace/workspace'
							})
						}
					}
					
				}
			},
			
			
			reloadPage(redirectUrl) {
				console.log('---webview reloadPage', redirectUrl)
				this.redirectUrl = redirectUrl
				//this.url = redirectUrl
			}
		},
		

  }
</script>

<style lang="scss" scoped>
</style>
