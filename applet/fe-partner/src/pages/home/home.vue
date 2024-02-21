<template>
<view>
  <!-- <view class="launchPage" v-if="showLaunch">
    <image class="lauImg" fit="cover" src="/static/home/launch.png" style="position: fixed;"/>
    <image class="botGoIcon" width="35" height="35" src="/static/home/ic_arrup.png" style="position: fixed;bottom:100px;right: 41%;width: 54px;height: 54px;border-radius: 100%;align-items: center;justify-content: center;font-size: 0;" @click="goHome"/>
  </view> -->
  <view class="homePage">
    <u-sticky>
      <view class="m-head">
        <u-gap height="160"></u-gap>
        <view class="u-padding-left-50 u-padding-right-50">
          <u-row>
            <u-col span="7">
              <view class="u-flex">
                <u-image
                  width="116"
                  height="116"
                  shape="circle"
                  :src="userInfo.logoImage || 'https://image.51cheyaoshi.com/xcx/partner/static/home/image.png'"
                  @click="showMinePopClick"
                />
                <view class="u-padding-top-10 u-padding-left-24 m-user-name">
                  <view class="u-font-32" @click="userLogin()">{{ userInfo.realName || userInfo.nickName||'未登录' }}</view>
                  <view class="u-padding-top-8" @click="go2TypePage" v-if="userInfo">
                    <u-image
                      width="90"
                      height="30"
                      :src="userInfo.status == 1 ? 'https://image.51cheyaoshi.com/xcx/partner/static/identify/audit_ok.png' : 'https://image.51cheyaoshi.com/xcx/partner/static/identify/audit_not.png'"
                    />
                  </view>
                </view>
              </view>
            </u-col>
            <!-- <u-col span="5">
              <view class="u-text-right u-padding-top-30">
                <u-icon name="grid" size="50" @click="go2CardPage"></u-icon>
              </view>
            </u-col> -->
          </u-row>
          <view class="u-text-center u-padding-top-40 m-row-bot">
            <u-row align="center" justify="center">
              <u-col span="4" @click="go2CustListPage">
                <view class="m-row-bot-num u-font-36">{{ partUserInfo.customerCount || 0 }}</view>
                <view class="m-row-bot-tl u-font-12">客户数</view>
              </u-col>
              <u-col span="4" @click="go2OrderListPage">
                <view class="m-row-bot-num u-font-36">{{ partUserInfo.orderCount || 0 }}</view>
                <view class="m-row-bot-tl u-font-12">订单数</view>
              </u-col>
              <u-col span="4" @click="go2Ologin">
                <view class="m-row-bot-num u-font-36">{{ partUserInfo.commission || 0 }}</view>
                <view class="m-row-bot-tl u-font-12">佣金（元）</view>
              </u-col>
            </u-row>
          </view>
        </view>
      </view>
    </u-sticky>
    
    <view class="m-content">
      <PageDateCond
        :date-cond-parent="dateCond"
        @setParentDateCond="setParentDateCond"
      />
      <view class="m-card">
        <view class="m-cond u-text-center u-padding-top-32">
          {{ dateCond }}新增客户
        </view>
        <view class="charts-box m-chart-1">
          <qiun-data-charts canvasId="custChart" type="tline" :chartData="chartData" :opts="lineOpts" :canvas2d="canvas2d" ></qiun-data-charts>
        </view>
      </view>
      <view class="m-card">
        <view class="m-cond u-text-center u-padding-top-32">
          {{ dateCond }}新增订单
        </view>
        <view class="charts-box m-chart-2">
          <qiun-data-charts canvasId="orderChart" type="tline" :chartData="orderChartData" :opts="lineOpts" :canvas2d="canvas2d"></qiun-data-charts>
        </view>
      </view>
    </view>
    
    <!-- 车辆选择框 -->
    <view class="m-minepop">
    <u-popup v-model="showMinePop" mode="left" width="81%">
      <view class="m-pop-view">
        <u-gap height="160"></u-gap>
        <view class="">
          <view class="u-padding-left-50 u-padding-right-50">
            <u-row>
              <u-col span="7">
                <view class="u-flex">
                  <u-image
                    width="116"
                    height="116"
                    shape="circle"
                    :src="userInfo.logoImage || 'https://image.51cheyaoshi.com/xcx/partner/static/home/image.png'"
                    @click="go2SetPage"
                  />
                  <view class="u-padding-top-10 u-padding-left-24">
                    <view class="u-font-32" style="color: #333333;" @click="go2TypePage">{{ userInfo.realName || userInfo.nickName || '未登录'}}</view>
                    <view class="u-padding-top-8" v-if="userInfo" @click="go2TypePage">
                      <u-image
                        width="90"
                        height="30"
                        :src="userInfo.status == 1 ? 'https://image.51cheyaoshi.com/xcx/partner/static/identify/audit_ok.png' : 'https://image.51cheyaoshi.com/xcx/partner/static/identify/audit_not.png'"
                      />
                    </view>
                  </view>
                </view>
              </u-col>
              <u-col span="5">
                <view class="u-text-right u-padding-top-30">
                  <!-- <u-icon name="grid" size="50" @click="go2CardPage"></u-icon> -->
                </view>
              </u-col>
            </u-row>
          </view>
          
          <view class="u-margin-top-80 u-padding-left-36 u-padding-right-36">
            <u-cell-group :border="false">
              <u-cell-item 
                v-for="(item) in cellList.group1"
                :key="item.index"
                :icon="item.icon"
                :title="item.title"
                :border-top="false"
                :border-bottom="false"
                @click="handleCell(item)"
              />
            </u-cell-group>
            <u-gap />
            <u-cell-group class="u-padding-top-32" :border="false">
              <u-cell-item
                v-for="(item) in cellList.group2"
                :key="item.index"
                :icon="item.icon"
                :title="item.title"
                :border-top="false"
                :border-bottom="false"
                @click="handleCell(item)"
              />
            </u-cell-group>
          </view>
        </view>
      </view>
    </u-popup>
    </view>
  </view>
</view>
</template>

<script>
  import { auditStatusAll } from '@/constants'
  import PageDateCond from '@/components/PageDateCond'
  import dayjs from "dayjs"
  
  const appFun = getApp()
  
  export default {
    name: 'Home',
    components: {
      PageDateCond
    },
    data() {
      return {
        // showLaunch: true,
        // sW: '100%',
        // sH: 'auto',
        username:'',
        canvasId: new Date().getTime(),
        canvas2d: true,
        userInfo: null,
        partUserInfo: null,
        
        dateCond: '今天', // 今天、昨天、近7天、近30天、自定义
        startDate: '' || dayjs(new Date()).format('YYYY-MM-DD'),
        endDate: dayjs(new Date()).format('YYYY-MM-DD'),
        
        lineOpts: {
          color: ['#31C37B'],
          padding: [20,20,10,5]
        },
        chartData: {
          categories: ["0"],
          series: [{
            name: "用户数",
            data: [0]
          }]
        },
        orderChartData: {
          categories: ["0"],
          series: [{
            name: "订单数",
            data: [0]
          }]
        },
        
        showMinePop: false,
        cellList: {
          group1: [
            { icon:'rmb-circle', title: '我的钱包', default: 1, index: 0 },
            { icon:'order', title: '订单中心', default: '', index: 1 },
            // { icon:'file-text', title: '任务中心', default: '', index: 2 },
          ],
          group2: [
            // { icon:'file-text', title: '在线教程', default: 1, index: 3 },
            { icon:'question-circle', title: '常见问题', default: '', index: 4 },
            { icon:'file-text', title: '用户协议', default: '', index: 5 },
						{ icon:'info-circle', title: '关于全民合伙人', default: '', index: 7 },
          ]
        }
      }
    },
    onShow() {
		this.username=uni.getStorageSync('username')
		 if(uni.getStorageSync('username')!=null&&uni.getStorageSync('username')!=''){
			getApp().globalData.userInfo = null;
			getApp().globalData.getUserInfo((data) => {
				console.log(data,11111);
			this.userInfo = data;	  
			  if(this.userInfo && this.userInfo.id) {
				this.init()
			  }
			})
		 }
    },
   onShareAppMessage(res) {
       if (res.from === 'button') {// 来自页面内分享按钮
           console.log(res.target)
       }
       return {
           title: '合伙人小程序', //分享的名称
           path: '/pages/home/home',
           mpId:'wxd561b5dc0088ee14' //此处配置微信小程序的AppId
       }
   },
   //分享到朋友圈
   onShareTimeline(res) {
       return {
           title: '合伙人小程序',
           type: 0,
           summary: "",
       }
   },
	onLoad() {
		wx.showShareMenu({
			withShareTicket:true,
			//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
			menus:["shareAppMessage","shareTimeline"]
		})

		if(uni.getStorageSync('username')!=null&&uni.getStorageSync('username')!=''	){
			getApp().globalData.userInfo = null;
			getApp().globalData.getUserInfo((data) => {
			this.userInfo = data;	  
			  if(this.userInfo && this.userInfo.id) {
			    this.init()
			  }
			})
		}

      // partnerId扫码进入逻辑
    },
    methods: {
      // authLogin() {
      //   if(!getApp().globalData.userInfo) {
      //     this.$getUserProfile("/pages/home/home", () => {
      //       this.$u.route("/pages/login/sign");
      //     });
      //     return false;
      //   }
      // },
      showMinePopClick() {
        // if(!getApp().globalData.userInfo) {
        //   this.$getUserProfile("/pages/home/home", () => {
        //     this.$u.route("/pages/login/sign");
        //   });
        //   return false;
        // }
        this.showMinePop = true
      },
      async init() {
        const result = await this.$getRequest(this.$url.partnerUserInfo, 'POST', {
          "userId": this.userInfo.id,
          startDate: dayjs(new Date()).format('YYYY-MM-DD') + ' 00:00:00',
          endDate: dayjs(new Date()).format('YYYY-MM-DD') + ' 00:00:00'
        }).catch(()=> {})
        if(result.code != '0') {
          uni.showToast({
              title: result.msg,
              duration: 2000,
              icon: 'none'
          });
          return false;
        }
        this.userInfo.auditName = auditStatusAll[this.userInfo.status]
        this.partUserInfo = result.data
        
        this.getCustStatistics()
        this.getOrderStatistics()
      },
      async getOrderStatistics () {
        if(this.userInfo == null || this.userInfo.id == null) {
          return false
        }
        const result = await this.$getRequest(this.$url.partnerOrderStatistics, 'POST', {
          "userId": this.userInfo.id,
          startDate: this.startDate + ' 00:00:00',
          endDate: this.endDate + ' 00:00:00'
        }).catch(()=> {})
        const origin = [0]
        if(result.data) {
          this.orderChartData.categories = origin.concat(result.data.x)
          this.orderChartData.series[0].data = origin.concat(result.data.data)
        } else {
          this.orderChartData.categories = origin
          this.orderChartData.series[0].data = origin
        }
      },
      async getCustStatistics () {
        if(this.userInfo == null || this.userInfo.id == null) {
          return false
        }
        const result = await this.$getRequest(this.$url.partnerUserStatistics, 'POST', {
          "userId": this.userInfo.id,
          startDate: this.startDate + ' 00:00:00',
          endDate: this.endDate + ' 00:00:00'
        }).catch(()=> {})
        const origin = [0]
        if(result.data) {
          this.chartData.categories = origin.concat(result.data.x)
          this.chartData.series[0].data = origin.concat(result.data.data)
        } else {
          this.chartData.categories = origin
          this.chartData.series[0].data = origin
        }
      },
      // pageDateCond
      setParentDateCond(dateStr, startDate, endDate) {
        this.dateCond = dateStr
        this.startDate = startDate
        this.endDate = endDate != '' ? endDate : dayjs(new Date()).format('YYYY-MM-DD')
        
        // 重新检索数据
        this.getCustStatistics()
        this.getOrderStatistics()
      },
      goHome () {
        this.showLaunch = false
        // uni.switchTab({
        //   url: '/pages/home/home',
        // })
      },
	  userLogin() {
	    // TODO 校验登录状态
	    if(this.username==''||this.username==null) {
	      this.$getUserProfile("/pages/home/home", () => {
	        this.$u.route("/pages/login/sign");
	      });
	      return false;
	    }
	  },
      go2CustListPage() {
        // TODO 校验登录状态
			console.log(this.username,'1111this.username');
        if(this.username==''||this.username==null) {
          this.$getUserProfile("/pages/home/home", () => {
            this.$u.route("/pages/login/sign");
          });
          return false;
        }
        this.$u.route(`/pages/mine/customer?`);
      },
	  go2Ologin(){
		  if(this.username==''||this.username==null) {
		  	this.$getUserProfile("/pages/home/home", () => {
		      this.$u.route("/pages/login/sign");
		    });
			console.log('登录');
		    return false;
		  }
	  },
      go2OrderListPage() {
        if(this.username==''||this.username==null) {
			console.log(getApp().globalData.userInfo,111);
			this.$getUserProfile("/pages/home/home", () => {
				this.$u.route("/pages/login/sign");
			  });
			return false;
        }
        // this.$u.route(`/pages/order/list`);
		this.$u.route(`/pages/order/orderPageList`);
      },
      go2CardPage() {
        if(this.username==''||this.username==null) {
          this.$getUserProfile("/pages/home/home", () => {
            this.$u.route("/pages/login/sign");
          });
          return false;
        }
        this.$u.route('/pages/mine/card');
      },
      go2SetPage() {
        if(this.username==''||this.username==null) {
          this.$getUserProfile("/pages/home/home", () => {
            this.$u.route("/pages/login/sign");
          });
          return false;
        }
        this.$u.route('/pages/mine/setting');
      },
      go2TypePage() {
        if(this.username==''||this.username==null) {
          this.$getUserProfile("/pages/home/home", () => {
            this.$u.route("/pages/login/sign");
          });
          return false;
        }
        // 根据认证状态跳转 未认证-选择身份 认证-身份证
        // if(this.userInfo.status == 1) { //TODOdel
        if(this.userInfo.status != 1) {
          this.$u.route('/pages/mine/type');
        } else {
          // 认证后无需预览信息
          // this.$u.route('/pages/mine/userIdentify');
          // this.$u.route('/pages/mine/corpIdentify');
        }
      },
      handleCell(item) {
        if(item.index == 0 && item.title == '我的钱包') {
          if(this.userInfo == null) {
            this.$u.route('/pages/login/sign');
          } else if(this.userInfo && this.userInfo.partnerId) { //this.userInfo.riskAuditStatus == 5
            this.$u.route('/pages/mine/wallet');
          } else {
            this.$getUserProfile("/pages/home/home", () => {
              this.$u.route("/pages/mine/userIdentify");
            });
          }
        }
		
				if(item.index == 1 && item.title == '订单中心') {
					if(this.username == '') {
						this.$u.route('/pages/login/sign');
					}else{
						this.$u.route('/pages/order/orderPageList');
					}
				}
				
				if(item.index == 5 && item.title == '用户协议') {
					if(this.username == '') {
						this.$u.route('/pages/login/sign');
					}else{
						this.$u.route('pages/doc/agreement?url=https://h5.51cheyaoshi.com/partner-user-agreement/index.html');
					}
				}
				
        if(item.index == 2 && item.title == '任务中心') {
          if(this.userInfo == null) {
            this.$u.route('/pages/login/sign');
          } else if(this.userInfo && this.userInfo.partnerId) { //this.userInfo.riskAuditStatus == 5
            this.$u.route('/pages/mine/taskCenter');
          } else {
            this.$getUserProfile("/pages/home/home", () => {
              this.$u.route("/pages/mine/userIdentify");
            });
          }
        }
				
        if(item.index == 4 && item.title == '常见问题') {
          this.$u.route('/pages/doc/FAQ?url=https://h5.51cheyaoshi.com/partner-FAQ/index.html');
        }
				
				if(item.index == 7) {
				  this.$u.route('/pages/doc/about');
				}
				
        if([0,2,3,5,6].includes(item.index)) {
          uni.showToast({
              title: '建设中...',
              duration: 2000,
              icon: 'none'
          });
          return false;
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .launchPage {
    .lauImg {
      height: 100%;
      width: 100%;
    }
    .botGoIcon {
      animation: td 3s infinite;
    }
    @keyframes td {
      0% {
        transform: translate(0px, 0px);
      }
      50% {
        transform: translate(0px, -10px);
      }
      100% {
        transform: translate(0px, 0px);
      }
    }
  }
  .homePage {
    background: transparent;
    .m-head {
      // background: linear-gradient(180deg, #31C37B 0%, rgba(49, 195, 123, 0) 100%);
      background: #31C37B;
      height: 470rpx;
	  z-index: 999;
    }
    .m-user-name {
      color: #FFFFFF;
    }
    .m-pop-view {
      background: #F9F9FC;
      height: 100%;
    }
    .m-card {
		z-index:0;
      .m-cond {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
		z-index:0;
      }
    }
  }
</style>
<style lang="scss">
  .m-row-bot .u-row .u-col{
    text-align: center;
    color: white;
    .m-row-bot-num, .m-row-bot-tl {
      text-align: center;
    }
    .m-row-bot-num {
      font-weight: 500;
    }
    .m-row-bot-tl {
      padding-top: 8rpx;
      font-weight: 400;
    }
  }
</style>
