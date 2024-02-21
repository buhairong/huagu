<script>
  import { url, getRequest } from './utils/util.js'
	export default {
    onLaunch: function() {
      console.log('App Launch')
      //#ifdef MP-WEIXIN
      wx.getSystemInfo({
        success: (e) => {
          const custom = wx.getMenuButtonBoundingClientRect();
          this.globalData.custom = custom;
          console.log(custom);
        },
      });
      // #endif
      let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
      this.globalData.menuButtonInfo = menuButtonInfo;
    },
    onShow: function() {
      console.log('App Show')
    },
		onHide: function() {
			console.log('App Hide')
		},
    globalData: {
      openId: '', // TODO oYJLe5XSzw1Ek8ioW-RD6UrzBJm4
      userInfo: null,
      route: '',
      getMemberInfo( mobile, imageUrl, name, cb) {
        console.log('getMemberInfo',this.openId, mobile, imageUrl, name)
        uni.showLoading({
          title: '加载中'
        });
        let data = {
          openid: this.openId,
          // appUserEntity: {},
          user: {}
        }
        
        if(mobile) {
          data.user.phone = mobile;
          data.user.xcxOpenId = this.openId
        }
        if(imageUrl) {
          data.user.imageUrl = imageUrl;
          data.user.logoImage = imageUrl;
        }
        if(name) {
          data.user.nickName = name;
        }
        getRequest(url.wechatLoginByOpenId, 'POST', data).then((result) => {
          if(result.code == '3403') {
            cb && cb(null); 
          } else {
            uni.setStorageSync('token', result.token);
            //uni.setStorageSync('cityId', result.data.cityId);
            this.userInfo = result.data;
            cb && cb(result.data);
          }
          uni.hideLoading()
        }).catch(()=> {})
        
        
      },
      getUserInfo(cb) {
        const self = this;
        if(getApp().globalData.userInfo) {  
          typeof cb == 'function' && cb(getApp().globalData.userInfo)
        } else {
          if(self.openId) {
            self.getMemberInfo('','','', cb);
          } else {
            uni.login({
              provider: 'weixin',
              success(loginRes) {
                getRequest(url.getOpenId, 'POST', {
                  code: loginRes.code,
                }).then((res) => {
                  self.openId = res.data.openid;
                  self.getMemberInfo('','','',cb);
                }).catch(()=> {})
              }
            })
          }
        }
      }
    },
	}
</script>

<style lang="scss">
  @import "uview-ui/index.scss";
	@import "./styles/common.scss";
  body {
    font-family: PingFangSC-Medium, PingFang SC;
  }
  .commonPage {
    min-height: calc(100vh);
    background: #FFFFFF;
  }
  
  /*每个页面公共css */
  .m-card {
    background: #FFFFFF;
		box-shadow: 0px -2px 32px rgba(10, 15, 45, 0.02), 0px 4px 24px rgba(10, 15, 45, 0.04);
		border-radius: 24rpx;
    margin-top: 30rpx;
  }
  .m-content {
    padding: 30rpx;
  }
  .m-input-right-btn {
    max-height: 60rpx;
    padding: 10rpx;
    background: #31C37B;
    border-radius: 8rpx;
    font-size: 24rpx;
    font-weight: 500;
    color: #FFFFFF;
  }
  
  .foot-sticky {
    position: fixed;
    bottom: 90rpx;
    left: 0;
    right: 0;
    z-index: 999;
  }
  .foot-btn {
    background: #31C37B;
    border-radius: 16rpx;
    margin: 0 50rpx;
    padding: 28rpx 30rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #FFFFFF;
  }
  .foot-btn-common {
    width: 100%;
    background: #31C37B;
    border-radius: 16rpx;
    padding: 28rpx 30rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #FFFFFF;
  }
  .m-btn {
    border-radius: 16rpx;
    font-size: 32rpx;
    font-weight: 500;
    padding: 28rpx 98rpx;
    max-width: 260rpx;
    max-height: 100rpx;
    margin: 28rpx;
  }
  .foot-btn-cancel {
    background: #F7F7FB;
    color: #333333;
  }
  .foot-btn-confirm {
    background: #31C37B;
    color: #FFFFFF;
  }
  .foot-btn-gray {
    background: #F7F7F7;
    border-radius: 16rpx;
    width: 100%;
    padding: 28rpx 30rpx;
    font-size: 32rpx;
    font-weight: bold;
    color: #333333;
  }
  .identity-t {
    font-size: 44rpx;
    font-weight: 500;
    color: #333333;
  }
  .identity-c {
    padding-top: 16rpx;
    padding-bottom: 60rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #999999;
  }
  .aPro {
    color: #2589FD;
  }
  
</style>
