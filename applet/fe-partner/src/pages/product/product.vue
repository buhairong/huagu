<template>
  <view>
<!--    <u-mask 
			:show="showIdentDialog"
			:custom-style="{
				width:'100vw',
				height:'100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}"
		>
			<view class="mask-warp-div"  @click="go2login">
				<view class="mask-warp">
					<view class="title">未认证</view>
					<view class="text">请先完成认证</view>
					<view class="btn" @click="go2Sign">去认证</view>
				</view>
			</view>
		</u-mask> -->
		<u-mask
			:show="showIdentDialog"
			:custom-style="{
				width:'100vw',
				height:'100vh',
				display: 'flex',
				justifyContent: 'center',
			}"
		>
			<view class="about-mask-wrap" :style="{'margin-top': custom.top + 32 +'px'}">
				<view class="close-box" @click="closeAboutMask">
					<u-icon name="close" color="rgba(10, 15, 45, 0.8)" size="28"></u-icon>
				</view>
				<image
					style="width:120rpx;height:120rpx;"
					src="https://image.51cheyaoshi.com/xcx/partner/static/logo.png"
				/>
				<view class="title">关于全民合伙人</view>
				<view class="section">
					1.全民合伙人是WECARS旗下的众包模式分销平台，合伙人将WECARS上的产品推荐给身边有需要的人，成交后即可获得丰厚的佣金奖励。
				</view>
				<view class="section">
					2.当您身边朋友有购车需求时，您只需要把对应车型的订阅方案推荐给TA，注册成功后，您的客户列表就会看到新增一个客户。您还可以挑选您感兴趣的车型订阅方案，直接生成海报发在朋友圈当中，只要有朋友感兴趣，您就会获得新客户。
				</view>
				<view class="section">
					3.客户成交后，您将会在账户明细中看到一笔待入账的佣金记录，待客户提车后，商户会向平台支付您的分销佣金，收到佣金后平台会100%入账至您的账户余额中。
				</view>
				<view class="section">
					4.更多关于全民合伙人，请您在「战绩」- 点击左上角头像 -「常见问题」处查看。
				</view>
				<view class="btn" @click="closeAboutMask">进入全民合伙人</view>
			</view>
		</u-mask> 
		<view class="header-wrap">
			<view
			    class="status-bar"
			    :style="{ height: custom.top + 'px' }"
			/>
			<view class="header">
				产品
				<view class="filter" @click="changeCity">
					<view class="text">
						{{city}}
					</view>
					<u-icon name="arrow-down" color="#393D3F" size="28"></u-icon>
				</view>
			</view>
			
			<view class="sub-header">
				<view class="tabs">
					<view 
						v-for="tab in tabList"
						:key="tab.id"
						class="tab"
						:class="{'tab-active': tab.id === tabIndex}"
						@click="changeTab(tab)"
					>
						{{tab.name}}
					</view>
				</view>
				<!-- <view class="filter">
					<view class="text">
						条件筛选
					</view>
					<image
						style="width:20rpx;"
					  class="detail-arrow"
					  src="https://image.51cheyaoshi.com/xcx/partner/static/home/shaixuan.png"
					  mode="widthFix"
					/>
				</view> -->
			</view>
			
		</view>
		
		<u-picker
			v-model="showCityPicker"
			mode="selector"
			:default-selector="[cityIndex]"
			range-key="city"
			:range="openCityList"
			@confirm="confirmCity"
		/>
		
		<view class="page-wrap" :style="{'padding-top': custom.top + 80 +'px'}">
			<view class="list-wrap">
				<view v-if="tabIndex === 0">
					<view 
						class="newCarItem card"
						v-for="item in newCarslist"
						:key="item.id"
						@click="goNewCarDetailPage(item)"
					>
						<view class="left">
							<view class="brand">
								{{ item.carBrand }} {{ item.carType }}
							</view>
							<view class="type">
								{{item.carTypeYear}} | {{item.carTypeYearProduct}}
							</view>
							<view class="price" :style="{'padding-top': item.deposit ? '16rpx' : '46rpx'}">
								厂商指导价：{{formatPrice(item.guidancePrice)}}
							</view>
							<view class="price" style="padding-top: 4px;">
								订&nbsp;阅&nbsp;费&nbsp;用：{{`${formatThousandNumber(item.monthPayment)}元/月`}}
							</view>
						</view>
						<view class="right">
							<view class="commission" v-if="userId">
								分销佣金 
								<view class="price">
									{{formatThousandNumber(item.distributionBrokerageFree)}}
								</view>
								<view class="unit">
									元
								</view>
							</view>
							<view class="should-login" @click.stop="go2Sign" v-else>
								登录查看分销佣金
							</view>
							<view class="new-car-img">
								<image
									style="width:100%"
									:src="item.imageUrl"
									mode="widthFix"
								/>
							</view>
						</view>
					</view>
				</view>
				
				<view v-else-if="tabIndex === 1">
					<view
						v-for="item in certCarList"
						:key="item.id"
						class="CertCarItem card"
						@click="goCertCarDetailPage(item)"
					>
						<view class="car-img">
							<image
								style="width:220rpx;height:180rpx;border-radius:16rpx;"
							  mode="aspectFill"
							  :src="item.imageUrl"
							/>
						</view>
						
						<view class="car-info">
							<view class="brand">
								{{ item.carBrand }} {{ item.carType }} {{ item.carTypeYear }} | {{ item.carTypeYearProduct }}
							</view>
							<view class="detail">
								{{formatThousandNumber(item.mileage)}}公里 / {{item.regDateStr}} / {{formatPrice(item.dealerReferencePrice)}}
							</view>
							<view class="sub-plans" v-if="item.isStaging === 0 || item.isSubscribe === 0">
								<view class="sub-plans-item" v-if="item.isSubscribe === 0">
									可订阅
								</view>
								<view class="sub-plans-item" v-if="item.isStaging === 0">
									可分期
								</view>
							</view>
							<view class="commission" v-if="userId">
								分销佣金
								<view class="price">
									{{formatThousandNumber(item.distributionBrokerageFree)}}
								</view>
								<view class="unit">
									元
								</view>
							</view>
							<view class="should-login" @click.stop="go2Sign" v-else>
								登录查看分销佣金
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<u-loadmore
				v-show="page > 1"
				:status="status"
				:load-text="loadText"
			/>
			
			<u-empty v-if="errMsg" :text="errMsg" mode="list" margin-top="40"></u-empty>
		</view>
  </view>
</template>

<script>
	//import { formatTenThousandNumber, formatThousandNumber, formatPrice } from '@/utils/index.js'
	
	const app = getApp()
  export default {
    data() {
      return {
				custom: app.globalData.custom,
				show: true,
        userInfo: null,
        partnerId: null,
        // riskAuditStatus: 5,
        riskAuditStatus: null,
				showIdentDialog: false,
				userId: '',
				
				// 产品列表
        newCarslist: [], // 新车列表
				certCarList: [], // 二手车列表
        status: 'loadmore', // 加载更多 状态
        page: 1, // 第N页
        totalPages: 0, // 总页数
        loadText: {
          loadmore: '轻轻上拉',
          loading: '努力加载中',
          nomore: '实在没有了'
        },
				errMsg: '',
		
				// tab切换
				tabList: [
					{id: 0, name: '全新车'},
					{id: 1, name: '二手车'},
				],
				tabIndex: 0,
		
				// 城市筛选
				showCityPicker: false,
				openCityList: [],
				locCity: { city: '上海', id: 310100 },
				city: uni.getStorageSync('city') || '上海',
				cityIndex: 0,
				cityId: uni.getStorageSync('cityId') || 310100,
				username:"",//登录token
      }
    },
    onShow() {
			this.username=uni.getStorageSync('username')
			if(uni.getStorageSync('username')!=null&&uni.getStorageSync('username')!=''	){
				getApp().globalData.getUserInfo((data) => {
					this.userInfo = data
					if(data) {
						this.partnerId = data.partnerId
						this.userId = data.id
					}
				})
			}
    },
    onLoad() {
			this.getProductList()
			if(uni.getStorageSync('username')!=null&&uni.getStorageSync('username')!=''	){
				//
			}else {
				this.showIdentDialog = true
			}
		},
    methods: {
			closeAboutMask() {
				this.showIdentDialog = false
			},
			
			handlerClickAboutMaskBtn() {
				this.closeAboutMask()
				this.go2Sign()
			},
			
      go2Sign() {
				this.$getUserProfile("/pages/product/product", () => {
					this.$u.route("/pages/login/sign")
				})
				
				
        // if(!this.userInfo) {
        //   this.$getUserProfile("/pages/product/product", () => {
        //     this.$u.route("/pages/login/sign");
        //   });
        //   return false;
        // }
        // if(this.userInfo.status != 1) {
        //   this.$u.route('/pages/mine/type');
        // }
      },
			
			// 获取新车列表
      async getProductList() {
				if (this.page === 1) {
					this.newCarslist = []
				}
        const res = await this.$getRequest(this.$url.getCarSubscribeList, 'POST', {
          cityId: this.cityId,
          page: this.page,
        })
				this.newCarslist = this.newCarslist.concat(res.data.data.records)
				this.totalPages = res.data.data.pages
				this.page = res.data.data.current
				if (this.newCarslist && this.newCarslist.length) {
					this.errMsg = ''
				} else {
					this.errMsg = '暂无数据'
				}
				if(this.page === this.totalPages) {
					this.status = 'nomore'
				} else {
					this.status = 'loadmore'
				}
      },
			
	// 获取二手车列表
	async getCertCarList() {
		if (this.page === 1) {
			this.certCarList = []
		}
	  const res = await this.$getRequest(this.$url.getCertCarList, 'POST', {
		cityId: this.cityId,
		page: this.page,
	  })
		this.certCarList = this.certCarList.concat(res.data.data.records)
	  this.totalPages = res.data.data.pages
	  this.page = res.data.data.current
		if (this.certCarList && this.certCarList.length) {
			this.errMsg = ''
		} else {
			this.errMsg = '暂无数据'
		}
		if(this.page === this.totalPages) {
			this.status = 'nomore'
		} else {
			this.status = 'loadmore'
		}
	},
			
      // 点击切换城市
	async changeCity() {
		const res = await this.$getRequest(this.$url.cityList, "POST",{});
		this.openCityList = res.data
		// 查找cityIndex
		this.openCityList.forEach((item, index) => {
			if(this.city.indexOf(item.city) >= 0) {
				this.cityIndex = index
				this.cityId = item.id
			}
		})
		this.showCityPicker = true
	},
	go2login(){
		this.showIdentDialog = false
	},
	// 确认切换城市
	confirmCity(index) {
		this.locCity = { city: this.openCityList[index].city, id: this.openCityList[index].id }
		this.cityIndex = index
		this.cityId = this.openCityList[index].id
		this.city = this.openCityList[index].city
		uni.setStorageSync("city",this.openCityList[index].city)
		uni.setStorageSync("cityId",this.openCityList[index].id)
		
		// 初始化数据
		this.page = 1
		this.totalPages = 0
		this.tabIndex = 0
		this.getProductList()
	},
			
	changeTab(tab) {
		this.tabIndex = tab.id
		if (tab.id === 0) {
			this.page = 1
			this.totalPages = 0
			this.getProductList()
		} else if (tab.id === 1) {
			this.page = 1
			this.totalPages = 0
			this.getCertCarList()
		}
	},
			
			// formatTenThousandNumber(number, unit1, unit2) {
			// 	return formatTenThousandNumber(number, unit1, unit2)
			// },
			// formatThousandNumber(price) {
			// 	return formatThousandNumber(price)
			// },
			// formatPrice(price) {
			// 	return formatPrice(price)
			// },
			
			formatTenThousandNumber (num, unit1='万', unit2='') {
				let res = ''
				
				if (num || num == 0) {
					if (num < 10000) {
						res = num + unit2
					} else {
						if (num % 10000 === 0) {
							res = num / 10000 + unit1
						} else {
							if (num % 1000 === 0) {
								res = (num/10000).toFixed(1) + unit1
							} else {
								res = (num/10000).toFixed(2) + unit1
							}
						}
					}
				}
				
				return res
			},
			
			/**
			 * 千分位格式化
			 * @param n number
			 */
			formatThousandNumber(n) {
			    n = Math.floor(n) // 只考虑整数
			 
			    const s = n.toString()
			    const arr = s.split('').reverse()
			    return arr.reduce((prev, val, index) => {
			        if (index % 3 === 0) {
			            if (prev) {
			                return val + ',' + prev
			            } else {
			                return val
			            }
			        } else {
			            return val + prev
			        }
			    }, '')
			},
			
			// 金额小于1万时，显示千分位+元
			formatPrice(price) {
				let res = ''
				if(price || price == 0) {
					if (price > 10000) {
						res = this.formatTenThousandNumber(price)
					} else {
						res = `${this.formatThousandNumber(price)}元`
					}
				}
				
				return res
			},
			
			// 跳转新车详情页
			goNewCarDetailPage(item) {
				this.$u.route(`/pages/product/detail?queryType=1&cityId=${this.cityId}&userId=${this.userId}&carTypeYearProductId=${item.carTypeYearProductId}&templateId=${item.templateId}`)
				// if (this.userInfo) {
				// 	this.$u.route(`/pages/product/detail?queryType=1&cityId=${this.cityId}&userId=${this.userId}&carTypeYearProductId=${item.carTypeYearProductId}&templateId=${item.templateId}`)
				// } else {
				// 	// this.showIdentDialog = true
				// 	if(this.username!=''&&this.username!=null) {
				// 	  // this.$u.route('/pages/message/sysMsgList')
				// 	} else {
				// 	  this.$getUserProfile("/pages/message/message", () => {
				// 	    this.$u.route("/pages/login/sign");
				// 	  });
				// 	}
					
				// }
			},
			
			// 跳转二手车详情页
			goCertCarDetailPage(item) {
				this.$u.route(`/pages/product/cert-detail?cityId=${this.cityId}&carId=${item.id}&supportSubscription=${item.isSubscribe}&monthTotal=${item.monthTotal}&userId=${this.userId}`)
				// if (this.userInfo) {
				// 	this.$u.route(`/pages/product/cert-detail?cityId=${this.cityId}&carId=${item.id}&supportSubscription=${item.isSubscribe}&monthTotal=${item.monthTotal}&userId=${this.userId}`)
				// } else {
				// 	this.showIdentDialog = true
				// }
			},
    },
    onReachBottom() {
      if(this.page >= this.totalPages) {
        this.status = 'nomore';
        return;
      }
      this.status = 'loading';
      this.page++
      if (this.tabIndex === 0) {
				this.getProductList()
			} else if (this.tabIndex === 1) {
				this.getCertCarList()
			}
    },
  }
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
	
.mask-warp-div{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.mask-warp {
	background: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 168rpx 66rpx 86rpx 66rpx;
	width: 280px;
	height: 338px;
	border-radius: 8px;
	background: #FFFFFF;
	.title {
		font-size: 40rpx;
		color: #333333;
		line-height: 56rpx;
	}
	.text {
		padding-top: 16rpx;
		font-size: 24rpx;
		line-height: 34rpx;
		color: #999999;
	}
	.btn {
		height: 100rpx;
		border-radius: 16rpx;
		background: #31C37B;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		margin-top: 160rpx;
		width: 100%;
	}
}

.header-wrap {
	width: 100vw;
	position: fixed;
	left: 0;
	top: 0;
	background-color: #fff;
	z-index: 100;
}

.header {
	box-sizing: content-box;
	width: 100vw;
	height: 32px;
	background: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 17px;
	font-weight: 500;
	color: #000000;
	position: relative;
	.filter {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 200;
		height: 32px;
		display: flex;
		align-items: center;
		.text {
			font-size: 14px;
			color: #393D3F;
			padding-left: 32rpx;
			padding-right: 8rpx;
		}
	}
}

.sub-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 32rpx 0;
	.tabs {
		display: flex;
		align-items: center;
		height: 50rpx;
		.tab {
			margin-right: 16px;
			margin-left: 32rpx;
			font-size: 28rpx;
			color: #666666;
			&.tab-active {
				font-size: 34rpx;
				font-weight: 600;
				color: #333333;
				position: relative;
				&::before {
					content: '';
					position: absolute;
					top: 22rpx;
					left: -26rpx;
					transform: rotate(112deg) skew(20deg);
					background: #31C37B;
					width: 32rpx;
					height: 8rpx;
				}
			}
		}
	}
	.filter {
		height: 50rpx;
		display: flex;
		align-items: center;
		.text {
			font-size: 28rpx;
			color: #393D3F;
			padding-right: 16rpx;
		}
	}
}

.page-wrap {
	.list-wrap {
		padding-top: 24rpx;
		padding-bottom: 30rpx;
		.newCarItem {
			display: flex;
			justify-content: space-between;
			.left {
				flex: 1;
				padding-right: 20rpx;
				.brand {
					font-size: 28rpx;
					font-weight: 500;
					color: #333333;
					line-height: 44rpx;
				}
				.type {
					font-size: 24rpx;
					line-height: 44rpx;
					color: #999999;
				}
				.price {
					font-size: 24rpx;
					color: #666666;
					padding-top: 46rpx;
				}
			}
			.right {
				text-align: right;
				position: relative;
				.new-car-img {
					position: absolute;
					right: -56rpx;
					bottom: 20rpx;
					width: 350rpx;
					height: 160rpx;
				}
				.commission {
					line-height: 44rpx;
					font-size: 24rpx;
					color: #666666;
					display: flex;
					justify-content: flex-end;
					align-items: flex-end;
					margin-bottom: 26rpx;
					.price {
						font-size: 34rpx;
						font-weight: 500;
						color: #EE3833;
						padding: 0 8rpx;
						transform: translateY(-2rpx);
					}
					.unit {
						font-size: 24rpx;
						color: #EE3833;
					}
				}
				.should-login {
					text-align: right;
					line-height: 44rpx;
					font-size: 24rpx;
					line-height: 36rpx;
					color: #31C37B;
					margin-bottom: 28rpx;
					position: relative;
					z-index: 90;
				}
			}
		}
		.CertCarItem {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.car-info {
				flex:1;
				width:200rpx;
				padding-left: 20rpx;
				.brand {
					font-size: 28rpx;
					font-weight: 500;
					line-height: 44rpx;
					color: #333333;
					@include text-overflow;
				}
				.detail {
					font-size: 24rpx;
					line-height: 36rpx;
					color: #666666;
				}
				.sub-plans {
					margin: 10rpx 0 14rpx 0;
					display: flex;
					.sub-plans-item {
						padding: 4rpx;
						border-radius: 4rpx;
						background: #F5F6F7;
						margin-right: 12rpx;
						color: rgba(10, 15, 45, 0.8);
						font-size: 20rpx;
					}
				}
				.commission {
					line-height: 44rpx;
					font-size: 24rpx;
					color: #666666;
					display: flex;
					align-items: flex-end;
					.price {
						font-size: 34rpx;
						font-weight: 500;
						color: #EE3833;
						padding: 0 8rpx;
						transform: translateY(-2rpx);
					}
					.unit {
						font-size: 24rpx;
						color: #EE3833;
					}
				}
				.should-login {
					line-height: 44rpx;
					font-size: 24rpx;
					line-height: 36rpx;
					color: #31C37B;
				}
			}
		}
	}
}

.about-mask-wrap {
	width: 639rpx;
	height: 1152rpx;
	background: #fff;
	padding: 36px 36rpx 60rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	.close-box {
		width: 96rpx;
		height: 96rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		right: 0;
	}
	.title {
		margin-top: 12px;
		margin-bottom: 24px;
		height: 42rpx;
		font-size: 15px;
		line-height: 42rpx;
		color: #333333;
	}
	.section {
		margin-bottom: 20px;
		font-size: 12px;
		line-height: 36rpx;
		color: #666666;
	}
	.btn {
		margin-top: 30px;
		width: 510rpx;
		height: 100rpx;
		border-radius: 16rpx;
		background: #31C37B;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		color: #FFFFFF;
	}
}
</style>
