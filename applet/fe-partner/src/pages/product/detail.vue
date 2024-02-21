<template>
  <view>
		<view class="header">
			<view class="back-btn" @click="back">
				<u-icon name="arrow-left" color="#000000" size="48"></u-icon>
			</view>
			<view class="header-title">
				<view class="brand">
					{{ carDetailData.carBrand || '' }} {{ carDetailData.carType || '' }}
				</view>
				<view
					v-if="isCertification"
					class="share-btn"
					@click="openWecars"
				>
					<u-icon
						name="zhuanfa"
						color="#0a0f2d"
						size="40"
					/>
				</view>
			</view>
			<view class="car-type">
				{{carDetailData.carTypeYear}} | {{carDetailData.carTypeYearProduct}}
			</view>
			<view class="brand-price">
			    <text class="name">
			        指导价
			    </text>
			    <text class="price">
			        {{ formatPrice(carDetailData.guidancePrice) }}
			    </text>
			</view>
			<view class="banner">
				<u-swiper
					class="banner-swiper"
					:list="carTypeYearProductImageList" 
					:title="false"
					height="300"
					mode="round"
					indicator-pos="bottomCenter"
					:effect3d="false"
					autoplay
					interval="3000"
					:circular="true"
					duration="500" 
					bg-color=""
				/>
			</view>
		</view>
		
		<view class="list-wrap">
			<view>
				<view class="sub-title">订阅方案</view>
				<view class="card-wrap">
					<view 
						class="card template-card"
						v-if="item"
					>
					
						<view class="plan-title">选择方案</view>
						<view class="plan-list">
								<view 
									v-for="plan in selCity.respVOS"
									:key="plan.id"
									class="plan"
									:class="{'checked-plan': plan.id === selCity.id}"
									@click.stop="changePlan(plan.id)"
								>
										<view class="plan-item1">
											<view v-if="plan.monthTotal === 6 && plan.paymentType === 4">
												订阅12期
											</view>
											<view v-else>
												{{monthStrObj[plan.monthTotal]}}
											</view>
										</view>
										<view class="plan-item2">
											￥{{plan.monthPay | $numFormat}}/月
										</view>
										<view class="plan-item3">
											{{paymentType[plan.paymentType]}}
										</view>
										
										<view class="checked-icon-wrap">
											<u-icon name="checkmark" color="#ffffff" size="16"></u-icon>
										</view>
								</view>
						</view>
					
						<view class="item">
							<view class="item-title">分销佣金：</view>
							<view class="item-content">
								<view v-if="userId">
									<view class="subscribe-price">
										{{formatThousandNumber(item.monthPay || 0)}}
										<view class="unit">元</view>
									</view>
								</view>
								<view class="should-login" @click.stop="go2Sign" v-else>
									登录查看分销佣金
								</view>
							</view>
						</view>
						
						<!-- <view class="item">
							<view class="item-title">订阅费用：</view>
							<view class="item-content">
								{{`${formatThousandNumber(item.monthPay)}元/月`}}
							</view>
						</view>
						
						<view class="item">
							<view class="item-title">订阅周期：</view>
							<view class="item-content">
								{{item.monthTotal}}期
							</view>
						</view> -->
						
						<view class="item">
							<view class="item-title">用车城市：</view>
							<view class="item-content">
								<view class="city" @click.stop="openCityList">
									{{selCityName}}
									<view class="change-city-link">切换城市</view>
								</view>
							</view>
						</view>
						
						<view class="item">
							<view class="item-title">期末可选：</view>
							<view class="item-content">
								<view class="item-sub" v-if="item.finalSelect.includes(-1)" @click.stop="openApportionPopup(index)">
									<view class="left">
										继续订阅 <text style="padding-left:24rpx;color: #999999;">{{item.nextMouthPayment | $numFormat}}<text style="font-size: 12px;">元/月</text></text>
									</view>
									<view class="right">
										<image
											style="width:44rpx;height:44rpx;"
											src="https://image.51cheyaoshi.com/xcx/app/static/ordered/arrow-right.png"
										/>
									</view>
								</view>
								
								<view class="item-sub" v-if="item.finalSelect.includes(0)" @click.stop="openBuyoutsFeePopup(index)">
									<view class="left">
										买断车辆 <text style="padding-left:24rpx;color: #999999;">{{item.buyoutsFee | $numFormat}}元</text>
									</view>
									<view class="right">
										<image
											style="width:44rpx;height:44rpx;"
											src="https://image.51cheyaoshi.com/xcx/app/static/ordered/arrow-right.png"
										/>
									</view>
								</view>
								
								<view class="item-sub" v-if="item.finalSelect.includes(1)">
									<view class="left">
										退回车辆 <text style="padding-left:24rpx;color: #999999;">(押金原路退还)</text>
									</view>
								</view>
							</view>
						</view>
						
						<view class="item" v-if="item.deposit">
							<view class="item-title">车辆押金：</view>
							<view class="item-content">
								<view style="display:flex;align-items: center;">
									{{formatThousandNumber(item.deposit)}}元
									<view class="icon-wrap" @click.stop="openPopup">
										<u-icon name="info-circle" color="rgba(10, 15, 45, 0.5)" size="26"></u-icon>
									</view>
								</view>
							</view>
						</view>
						
						<view class="item" v-if="item.serviceStr">
							<view class="item-title">精选服务：</view>
							<view class="item-content">
								{{item.serviceStr}}
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- <image :src="qrCodeUrl" width="90px" height="90px"></image> -->
			<view class="fixed-bottom-btn" @click="showPosterEl">
				<view class="btn">
					生成海报
				</view>
			</view>
			
			<view 
				class="poster-mask" 
				:style="{left: showPoster ? '0' : '-1000px'}"
				@click="closePoster"
			>
				<view class="poster">
					<wxml-to-canvas width="300" height="530" class="widget"></wxml-to-canvas>
				</view>
				<view class="save-btn">
					<view class="btn-wrap" @click.stop="savePoster">
						<view class="btn">
							<u-icon name="download" color="#fff" size="48"></u-icon>
						</view>
						<view class="text">
							保存海报
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<u-popup class='popupClass'  border-radius="14" closeable=true mode="bottom" v-model="showPopup">
			<view class="popupClassTop"> 
				<text>车辆押金</text>
			</view>
			<view class="popupClassBom">
				<view>
					车辆押金可在期末选择买断车辆时抵扣尾款，也可在期末确认无损退车后原路退还到您的账户。
				</view>
			</view>
		</u-popup>
		
		<IdentDialog 
			:showIdentDialog.sync="showIdentDialog"
		/>
		
		<u-popup class="popup" border-radius="14" mode="center" v-model="showApportionPopup">
			<view class="wrap">
				<view class="table">
					<view class="row table-header">
						<view class="col">订阅周期</view>
						<view class="col">订阅费用</view>
						<view class="col">买断价格</view>
					</view>
					
					<view class="row" v-for="(item, index) in curItem.apportionRateCalculateResultList" :key="index">
						<view class="col">{{`${item.period-curItem.monthTotal+1}-${item.period}个月`}}</view>
						<template v-if="!userId && (index+1) > curItem.mid">
							<view class="col">...</view>
							<view class="col">...</view>
						</template>
						<template v-else>
							<view class="col">¥{{item.mouthPayment | $numFormat}}/月</view>
							<view class="col">¥{{item.buyoutsFee | $numFormat}}</view>
						</template>
					</view>
				</view>
				
				<view class="tip">
					期末续订车辆更划算<text v-if="!userId">,登录查看全部订阅周期</text>
				</view>
				
				<view class="bottom" v-if="!userId">
					<u-button
							class="wx-btn"
					    :ripple="true"
					    @click="go2Sign"
					>
						<image
							style="width:48rpx;height:40rpx;margin-right:16rpx;"
							src="https://image.51cheyaoshi.com/xcx/app/static/ordered/wx-icon.png"
						/>
						一键授权登录
					</u-button>
				</view>
			</view>
		</u-popup>
		
		<u-popup class="popup" border-radius="14" mode="center" v-model="showBuyoutsFeePopup">
			<view class="wrap">
				<view class="popup-title">买断车辆</view>
				<view class="container">
					<view class="item">
						<view class="item-title">
							买断金额：
						</view>
						<view class="item-content">
							¥{{curItem.buyoutsFee | $numFormat}}
						</view>
					</view>
					
					<view class="item">
						<view class="item-title">
							支付方式：
						</view>
						<view class="item-content">
							全款买断、金融分期
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="btn" @click="colseBuyoutsFeePopup">我知道了</view>
				</view>
			</view>
		</u-popup>
		
		<u-select
			v-model="showCityList" 
			:list="cityList"
			@confirm="confirmCity"
		></u-select>
		
		<u-popup border-radius="14" mode="center" v-model="showMorePayPopup">
			<view class="popup-wrap">
				<view class="title">订阅12期</view>
				<view class="sub-title">（分两次付）</view>
				<view class="pay-table">
					<view 
							v-for="(item1, index1) in morePayList"
							:key="index1"
							class="pay-row"
					>
						<view class="pay-col">{{item1.periodName}}</view>
						<view class="pay-col">{{item1.monthPayment | $numFormat}}元/月</view>
						<view class="pay-col">{{item1.totalPayment | $numFormat}}元</view>
					</view>
				</view>
				<view class="btn" @click.stop="closeMorePayPopup">我知道了</view>
			</view>
		</u-popup>
  </view>
</template>

<script>
	//import { formatTenThousandNumber, formatThousandNumber, formatPrice } from "@/utils/index.js"
	import IdentDialog from './components/IdentDialog.vue'
	
	export default {
    // onShareAppMessage(res) {
    //   return {
    //     title: '车要试 让有车生活 · 更简单',
    //     desc: '',
    //     path: '/pages/product/detail',
    //     imageUrl: '', // ./../../static/logo.png
    //   }
    // },
		components: {
			IdentDialog,
		},
		
    data() {
      return {
				// 页面接收传参
        queryType: 1,
				cityId: '',
				userId: '',
				carTypeYearProductId: '', //车型日产品ID
				templateId: '', // 模板ID
				monthTotal: '',
				
				// 新车详情
				carDetailData: {},
				carTypeYearProductImageList: [], // 轮播图
				planList: [] ,// 新车方案列表
				limitPrice: '',
				selCityId: null,
				selCityName: '',
				item: null,
				selCity: {},
				commonItem: {},
				cityList: [],
				showCityList: false,
				
				// 海报
				showPoster: false,
				posterSrc: '',
				posterWidth: '',
				posterHeight: '',
				widget: null,
				qrCodeUrl: '',
				isCompletePoster: false,
				
				// 用户信息
				realName: '',
				phone: '',
				isCertification: false,
				showIdentDialog: false,
				templateList: [],
				showPopup: false,
				curItem: {},
				showApportionPopup: false,
				showBuyoutsFeePopup: false,
				monthStrObj: {
					6: '订阅6期',
					12: '订阅12期',
				},
				paymentType: {
					0: '一次性付',
					4: '分两次付',
				},
				showMorePayPopup: false,
				morePayList: [],
      }
    },
    onLoad(option) {
			this.queryType = option.queryType
			this.cityId = option.cityId
			this.selCityId = option.cityId
			this.userId = option.userId
			this.carTypeYearProductId = option.carTypeYearProductId
			this.templateId = option.templateId
			this.monthTotal = option.monthTotal
			if (option.userId) {
				this.getLoginUserInfo()
			}
		},
    onShow() {
			this.getNewCarDetail()
			//this.getPlanList()
			this.selectPartnerTemplateList()
			
			this.username=uni.getStorageSync('username')
			if(uni.getStorageSync('username')!=null&&uni.getStorageSync('username')!=''	){
				getApp().globalData.getUserInfo((data) => {
					this.userInfo = data
					if(data) {
						this.userId = data.id
						//this.getWecarsQrCode()
					}
				})
			}
			
			if(getApp().globalData.userInfo && getApp().globalData.userInfo.status == 1) {
				this.isCertification = true
			  wx.showShareMenu({
			  	withShareTicket:true,
			  	//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
			  	menus: ["shareAppMessage","shareTimeline"]
			  })
			}
    },
		onReady() {
			
		},
    methods: {
			// 绘制海报
			renderToCanvas(wxml, style) {
				if (this.widget) {
					const p1 = this.widget.renderToCanvas({ wxml, style })
					p1.then((res) => {
						this.posterWidth = res.layoutBox.width
						this.posterHeight = res.layoutBox.height
						const p2 = this.widget.canvasToTempFilePath()
							p2.then(file => {
								this.isCompletePoster = true
								uni.hideLoading()
								this.posterSrc = file.tempFilePath
							})
					})
				}
			},
			
			closePoster() {
				this.showPoster = false
			},
			
			// 保存海报
			savePoster() {
				uni.saveImageToPhotosAlbum({
					filePath: this.posterSrc,
					success: () => {
						this.showPoster = false
						uni.showToast({
							title: '图片保存成功',
							duration: 2000,
							icon: 'none'
						})
					}
				})
			},
			
			showPosterEl() {
				if (this.userId) {
					if(this.isCertification) {
					  this.showPoster = true
					  if(!this.isCompletePoster) {
					  	uni.showLoading({
					  		title: '生成中'
					  	})
					  }
					} else {
						this.showIdentDialog = true
					}
				} else {
					this.go2Sign()
				}
			},
			
			// 绘制海报结构
			getCanvasHtml(carDetailData) {
				//https://image.51cheyaoshi.com/xcx/partner/static/order/Rectangle_995.png?x-oss-process=image/resize,l_220,m_lfit
				let month = this.item.monthTotal
				if(this.item.monthTotal === 6 && this.item.paymentType === 4) {
					month = 12
				}
				this.widget = this.selectComponent('.widget')
				let wxml = `
					<view class="container">
						<view class="wrap">
							<view class="item1">
								<view class="item1left">
									<view class="item1tag">
										<text class="item1tagtext">全新车</text>
									</view>
									<text class="brandtext">${carDetailData.carBrand} ${carDetailData.carType}</text>
								</view>
								<view class="item1pricewrap">
									<text class="item1price">${this.formatThousandNumber(this.item.monthPay)}</text>
									<text class="item1unit">元/月</text>
								</view>
							</view>
							<view class="item2">
								<text class="typetext">${carDetailData.carTypeYear} | ${carDetailData.carTypeYearProduct}</text>
								<text class="item2righttext">订阅仅需</text>
							</view>
							<view class="item3">
								<image class="item3imgbg" src="https://image.51cheyaoshi.com/xcx/partner/static/product/Group_571.png"></image>
								<view class="item3text">
									<text class="item3text1">指导价</text>
									<text class="item3text2">${this.formatPrice(carDetailData.guidancePrice)}</text>
								</view>
							</view>
							<view class="item11">
								<view class="item11text">
									<text class="item11text1">订阅周期：</text>
									<text class="item11text2">${month}个月</text>
								</view>
								<view class="item11text">
									<text class="item11text1">期末选择：</text>
									<text class="item11text22">${this.templateList[0].finalStr}</text>
								</view>
							</view>
							<view class="item4">
								<image class="item4imgbg" src="https://image.51cheyaoshi.com/xcx/partner/static/order/Rectangle_995.png"></image>
								<image class="item4img" src="${carDetailData.imageUrl}?x-oss-process=image/resize,l_320,m_lfit"></image>
							</view>`
							
				// if(this.realName || this.phone) {
				// 	wxml += `
				// 		<view class="item5">
				// 			<view class="item5content">
				// 				<view class="item5imgwrap">
				// 					<image class="item5img" src="https://image.51cheyaoshi.com/xcx/partner/static/product/group_5.png"></image>
				// 				</view>
				// 				<text class="item5text">${this.realName} ${this.phone}</text>
				// 			</view>
				// 		</view>
				// 	`
				// }
							
				wxml +=	`
							<view class="item7wrap">
								<image class="item7img" src="${this.qrCodeUrl}"></image>
								<text class="item8text">长按识别查看方案详情</text>
							</view>
						</view>
						<view class="item9wrap">
							<image class="item9img" src="https://image.51cheyaoshi.com/xcx/partner/static/WECARS_logo.png"></image>
							<text class="item10text">让有车生活 · 更简单</text>
						</view>
					</view>
				`
				const style = {
				  container: {
				  	width: 300,
				  	height: 530,
				  	paddingTop: 20,
				  	paddingBottom: 12,
				  	paddingLeft: 10,
				  	paddingRight: 10,
				  	backgroundColor: '#31C37B',
				  },
				  wrap: {
				  	width: '100%',
						paddingTop: 0,
				  	paddingBottom: 8,
				  	paddingLeft: 20,
				  	paddingRight: 20,
				  	backgroundColor: '#fff',
						borderRadius: 6,
				  },
				  item1: {
				  	width: '100%',
						height: 26,
				  	flexDirection: 'row',
				  	justifyContent: 'space-between',
				  	alignItems: 'center',
				  },
				  item1left: {
						width: 133,
				  	flexDirection: 'row',
				  	justifyContent: 'flex-start',
				  	alignItems: 'center',
				  },
				  brandtext: {
						width: 153,
						fontSize: 15,
				  	fontWeight: 600,
				  	color: '#333333',
				  },
				  item1tag: {
						marginTop: 22,
						marginRight: 2,
				  	width: 40,
				  	height: 17,
				  	borderRadius: 4,
				  	backgroundColor: '#31C37B',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
				  },
				  item1tagtext: {
						width: 40,
						fontSize: 10,
				  	color: '#FFFFFF',
						textAlign: 'center',
						marginBottom: 14,
				  },
					item1pricewrap: {
						display: 'flex',
						flexDirection: 'row',
					},
				  item1price: {
						width: 75,
				  	fontSize: 17,
				  	color: '#EE3833',
				  	textAlign: 'right',
						position: 'relative',
						top: -3,
						right: 0,
				  },
					item1unit: {
						width: 33,
						fontSize: 12,
						color: '#EE3833',
						textAlign: 'right',
						position: 'relative',
						top: 1,
						right: 0,
					},
				  item2: {
				  	marginTop: 12,
				  	width: '100%',
						height: 19,
				  	display: 'flex',
				  	justifyContent: 'space-between',
						flexDirection: 'row',
				  	alignItems: 'flex-start',
				  },
				  typetext: {
				  	width: 150,
				  	fontSize: 11,
				  	color: '#666666',
				  },
				  item2righttext: {
						width: 80,
				  	fontSize: 11,
				  	color: '#333333',
				  	textAlign: 'right',
				  },
					item3: {
						marginTop: 4,
						width: '100%',
						flexDirection: 'row',
						position: 'relative',
					},
					item3imgbg: {
						width: 84,
						height: 17,
					},
					item3text: {
						flexDirection: 'row',
						alignItems: 'center',
						position: 'absolute',
						left: 5,
						top: 2,
					},
				  item3text1: {
						width: 37,
						fontSize: 9,
						color: '#fff',
				  },
					item3text2: {
						width: 60,
						fontSize: 9,
						color: '#333333',
					},
				  item4: {
				  	marginTop: 20,
				  	width: '100%',
				  	height: 195,
				  	borderRadius: 4,
				  	display: 'flex',
						flexDirection: 'row',
				  	justifyContent: 'center',
				  	alignItems: 'center',
						position: 'relative',
				  },
				  item4imgbg: {
				  	width: 240,
						height: 195,
						borderRadius: 4,
				  },
					item4img: {
						position: 'absolute',
						left: -15,
						bottom: -20,
						width: 280,
						height: 210,
					},
				  item5: {
				  	marginTop: 8,
				  	width: '100%',
						flexDirection: 'row',
						justifyContent: 'flex-start',
						alignItems: 'center',
				  },
				  item5content: {
				  	width: 160,
				  	height: 24,
				  	borderRadius: 2,
				  	backgroundColor: '#F3F4F9',
				  	flexDirection: 'row',
				  	justifyContent: 'flex-start',
				  	alignItems: 'center',
				  },
				  item5imgwrap: {
				  	marginLeft: 8,
				  	marginRight: 5,
				  	width: 14,
				  	height: 14,
				  	border: '1px dashed #D8D8D8',
				  	flexDirection: 'row',
				  	justifyContent: 'center',
				  	alignItems: 'center',
				  },
				  item5img: {
				  	width: 14,
						height: 12,
				  },
				  item5text: {
						width: 120,
						height: 20,
				  	fontSize: 12,
				  	color: '#333333',
				  },
				  item6: {
				  	marginTop: 16,
				  	width: '100%',
				  	height: 1,
				  	backgroundColor: '#F0F0F0',
				  },
					item7wrap: {
						width: '100%',
						flexDirection: 'column',
						alignItems: 'center',
					},
				  item7img: {
				  	marginTop: 16,
				  	width: 65,
						height: 65,
				  },
				  item8text: {
						marginTop: 8,
						width: 200,
						height: 22,
						textAlign: 'center',
				  	fontSize: 10,
				  	color: '#999999',
				  },
					item9wrap: {
						width: '100%',
						flexDirection: 'column',
						alignItems: 'center',
					},
				  item9img: {
				  	marginTop: 10,
				  	width: 75,
				  	height: 16,
				  },
				  item10text: {
				  	marginTop: 4,
						width: 200,
						height: 18,
				  	fontSize: 10,
				  	fontWeight: 500,
				  	color: '#FFFFFF',
						textAlign: 'center',
				  },
					item11: {
						marginTop: 22,
						width: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'row',
						alignItems: 'center',
					},
					item11text: {
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'row',
						alignItems: 'center',
					},
					item11text1: {
						width: 45,
						height: 20,
						fontSize: 9,
						color: '#999999',
					},
					item11text2: {
						width: 45,
						height: 20,
						fontSize: 11,
						color: '#333333',
						position: 'relative',
						top: -3,
						left: 0,
					},
					item11text22: {
						width: 90,
						height: 20,
						fontSize: 11,
						color: '#333333',
						position: 'relative',
						top: -3,
						left: 0,
					},
				}
				
				setTimeout(() => {
					this.renderToCanvas(wxml, style)
				}, 2000)
			},
			
			// 获取小程序码
			async getWecarsQrCode() {
				//310100&13405&33
				const res = await this.$getRequest(this.$url.getWecarsQrCode, 'POST', {
				  envVersion: 1,
					page: 'pages/home/profile/index',
					scene: `${this.selCityId}&${this.carTypeYearProductId}&${this.userId}&${this.carDetailData.carBrandId}&&${this.item.id}`,
					//scene: `${this.cityId}&${this.carTypeYearProductId}&${this.userId}`,
				})
				if (res.code == 0) {
					this.qrCodeUrl = res.data
				}
			},
			
			// 获取登录用户信息
			async getLoginUserInfo() {
				const res = await this.$getRequest(this.$url.getLoginUserInfo, 'POST', {
				  userId: this.userId,
				})
				if (res.code == 0) {
					this.phone = res.data.phone
					this.realName = res.data.realName
				}
			},
			
			// 查询新车详情
      async getNewCarDetail() {
				uni.showLoading({
					title: '加载中'
				})
				const res = await this.$getRequest(this.$url.partnerProductDetail, 'POST', {
				  cityId: this.cityId,
				  queryType: this.queryType,
					carTypeYearProductId: this.carTypeYearProductId,
					userId: this.userId,
				})
				if (res.code === 0 && res.data && res.data.code === 0) {
					res.data.data.carSubscribeList.forEach(city => {
						city.respVOS.forEach(item => {
							const tempArr = []
							item.serviceStr = ''
							let carSubscribeFreeServiceToWeb = []
							if (item.carSubscribeFreeService) {
								carSubscribeFreeServiceToWeb = JSON.parse(item.carSubscribeFreeService)
							}
							if (carSubscribeFreeServiceToWeb && carSubscribeFreeServiceToWeb.length) {
								carSubscribeFreeServiceToWeb.forEach(service => {
									tempArr.push(`${service.serviceName}`)
								})
								item.serviceStr = tempArr.join('、')
							}
						})
					})
					this.carDetailData = res.data.data
					if (this.carDetailData.carTypeYearProductImageList && this.carDetailData.carTypeYearProductImageList.length) {
						this.carTypeYearProductImageList = this.carDetailData.carTypeYearProductImageList.map(item => {
							return item.imageUrl
						})
					} else if (this.carDetailData.imageUrl){
						this.carTypeYearProductImageList = [this.carDetailData.imageUrl]
					}
					
					await this.getAllCity()
					this.init()
					
					// setTimeout(() => {
					// 	this.getCanvasHtml(res.data.data)
					// }, 1000)
				}
				
				uni.hideLoading()
			},
			
			init() {
				const item = this.carDetailData.carSubscribeList.find(city => city.cityId === 0)
				if (item) {
					this.commonItem = item
				}
				
				this.getCurItem()
			},
			
			getAllCity() {
				this.$getRequest(this.$url.cityList, 'POST', {})
					.then((res) => {
						if(res.code == 0) {
							this.cityList = res.data
							this.cityList.forEach(item => {
								item.value = item.id
								item.label = item.city
							})
							const city = res.data.find(city1 => city1.id == this.selCityId)
							if (city) {
								this.selCityName = city.city
							} else {
								uni.showModal({
									title: '提示',
									content: '很抱歉，您所在的城市暂未开放订阅方案，请选择可用订阅方案城市。',
									confirmText: '选择城市',
									success: (res) => {
										if (res.confirm) {
											this.showCityList = true
										} else if (res.cancel) {
											this.selCityId = '310100'
											this.selCityName = '上海'
											this.getCurItem()
										}
									},
									fail: (err) => {
										console.log('fail', err)
									}
								})
							}
						}
					})
			},
			
			openCityList() {
				this.showCityList = true
			},
			
			confirmCity(e) {
				this.selCityId = e[0].value
				this.selCityName = e[0].label
				this.getCurItem()
			},
			
			async getCurItem() {
				const city = this.carDetailData.carSubscribeList.find(city => city.cityId == this.selCityId)
				if (city) {
					this.selCity = city
				} else {
					this.selCity = this.commonItem
				}
				
				this.selCity.id = this.selCity.respVOS[0].id
				this.item = this.selCity.respVOS[0]
				await this.getWecarsQrCode()
				setTimeout(() => {
					this.getCanvasHtml(this.carDetailData)
				}, 1000)
			},
			
			async changePlan(id) {
				this.selCity.id = id
				this.item = this.selCity.respVOS.find(plan => plan.id === this.selCity.id)
				await this.getWecarsQrCode()
				setTimeout(() => {
					this.getCanvasHtml(this.carDetailData)
				}, 1000)
			},
			
			// 查询方案列表
			async getPlanList() {
				uni.showLoading({
					title: '加载中'
				})
				const res = await this.$getRequest(this.$url.getSubscribeList, 'POST', {
				  cityId: this.cityId,
				  queryType: this.queryType,
					carTypeYearProductId: this.carTypeYearProductId,
					userId: this.userId,
					templateId: this.templateId,
				})
				if (res.code === 0 && res.data && res.data.code === 0) {
					this.planList = res.data.data
				}
				
				uni.hideLoading()
			},
			
			// 查询模板列表
			async selectPartnerTemplateList() {
				uni.showLoading({
					title: '加载中'
				})
				const res = await this.$getRequest(this.$url.selectPartnerTemplateList, 'POST', {
				  cityId: this.cityId,
				  queryType: this.queryType,
					carTypeYearProductId: this.carTypeYearProductId,
					userId: this.userId,
				})
				if (res.code === 0 && res.data && res.data.code === 0) {
					this.templateList = res.data.data.templateRespVO
					this.templateList.forEach(item => {
						let temp = []
						let str = ''
						
						if (item.finalSelect) {
							item.finalSelect = JSON.parse(item.finalSelect) 
							
							if (item.finalSelect.includes(-1)) {
								temp.push('续订')
							}
							if (item.finalSelect.includes(0)) {
								temp.push('买断')
							}
							if (item.finalSelect.includes(1)) {
								temp.push('退回')
							}
						}
						
						str = temp.join('、')
						item.finalStr = str
						
						temp = []
						str = ''
						if (item.carSubscribeFreeService) {
							item.carSubscribeFreeService = JSON.parse(item.carSubscribeFreeService)
							item.carSubscribeFreeService.forEach(service => {
								temp.push(service.serviceName)
							})
						}
						str = temp.join('、')
						item.serviceStr = str
						
						item.mid = 1
						if (item.apportionRateCalculateResultList && item.apportionRateCalculateResultList.length) {
							item.mid = Math.floor(item.apportionRateCalculateResultList.length/2)
						}
					})
				}
				
				uni.hideLoading()
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
			
			// 计算订阅费用
			getSubscriptionPrice(item) {
				let price = 0
				
				if (item.paymentType == 0) {
					price = this.formatThousandNumber(item.payOffPrice)
				} else if (item.paymentType == 1) {
					price = this.formatThousandNumber(item.monthPayment)
				}
				
				return price
			},
			
			// 打开 wecars 小程序, 进入新车详情页
			openWecars() {
				uni.navigateToMiniProgram({
				  appId: 'wx068554113d5335d3',
				  path: `pages/home/profile/index?cityId=${this.cityId}&id=${this.carTypeYearProductId}&partnerId=${this.userId}&qt=1&id2=${this.userId}`,
				})
			},
			
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			
			openPopup() {
				this.showPopup = true
			},
			
			go2Sign() {
				const routes = getCurrentPages() // 获取当前打开过的页面路由数组
				const curRoute = routes[routes.length - 1] // 获取当前页面路由，也就是最后一个打开的页面路由
				let path = curRoute.route
				const option = curRoute.options
				const keys = Object.keys(option)
				keys.forEach((key, index) => {
					if (index === 0) {
						path += `?${key}=${option[key]}`
					} else {
						path += `&${key}=${option[key]}`
					}
				})
				
				this.$getUserProfile(path, () => {
					this.$u.route("/pages/login/sign")
				})
			},
			
			openApportionPopup(index) {
				this.curItem = this.templateList[index]
				this.showApportionPopup = true
			},
			
			openBuyoutsFeePopup(index) {
				this.curItem = this.templateList[index]
				this.showBuyoutsFeePopup = true
			},
			
			colseBuyoutsFeePopup() {
				this.showBuyoutsFeePopup = false
			},
			
			openMorePayPopup(plan) {
				this.morePayList = plan
				this.showMorePayPopup = true
			},
			
			closeMorePayPopup() {
				this.showMorePayPopup = false
			},
    }
  }
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.header {
	background: linear-gradient(180deg, rgba(10, 15, 45, 0.16) 36.24%, rgba(255, 255, 255, 0.16) 100%);
	padding: 16rpx 40rpx;
	.header-title {
		padding-top: 60px;
		padding-top: calc(60px + constant(safe-area-inset-top));
		padding-top: calc(60px + env(safe-area-inset-top));
		display: flex;
		justify-content: space-between;
		align-items: center;
		.brand {
			font-size: 36rpx;
			font-weight: 600;
			line-height: 54rpx;
			color: #333333;
		}
		.share-btn {
			width: 54rpx;
			height: 54rpx;
			text-align: right;
		}
	}
	.car-type {
		font-size: 24rpx;
		line-height: 36rpx;
		color: #333333;
	}
	.brand-price {
		margin-top: 16rpx;
		background: url("https://image.51cheyaoshi.com/xcx/app/static/icon3.png") no-repeat;
		background-size: contain;
		display: inline-block;
		padding: 0 8rpx;
		width: 210rpx;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		.name {
			color: #FFFFFF;
		}
		.price {
			color: #333333;
			margin-left: 22rpx;
		}
	}
}

.list-wrap {
	padding-bottom: 180rpx;
	.title {
		width: 100vw;
		height: 108rpx;
		background-image:url('https://image.51cheyaoshi.com/xcx/app/static/text_back.png');
		background-repeat:no-repeat;
		background-size: 100% auto;
		display: flex;
		align-items: center;
		font-size: 14px;
		font-weight: 500;
		color: #75452D;
		padding: 0 64rpx;
		.num {
			font-size: 18px;
			color: #EE3833;
			padding: 0 8rpx;
		}
	}
	.card-wrap {
		padding: 0 32rpx;
	}
	.subscribe-item {
		.subscribe-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.merchant {
				flex: 1;
				width:200rpx;
				display: flex;
				align-items: center;
				.merchant-name {
					flex: 1;
					font-size: 24rpx;
					line-height: 44rpx;
					color: #333333;
					padding-left: 16rpx;
					@include text-overflow;
				}
			}
			.subscribe-price-wrap {
				padding-left:20rpx;
				display: flex;
				align-items: center;
				.text {
					font-size: 24rpx;
					color: #666;
					padding-right: 8rpx;
				}
				.subscribe-price {
					display: flex;
					font-size: 32rpx;
					font-weight: 500;
					color: #EE3833;
				}
			}
		}
		.service {
			display: flex;
			padding-top: 26rpx;
			flex-wrap: wrap;
			.service-tag {
				padding: 2rpx 4rpx;
				border-radius: 4rpx;
				background: #F5F6F7;
				font-size: 20rpx;
				color: 333;
				margin-right: 8rpx;
				margin-bottom: 12rpx;
			}
		}
		
		.end-title {
			font-size: 28rpx;
			font-weight: 500;
			color: #0A0F2D;
			margin-top: 34rpx;
		}
		
		.end-wrap {
			padding-top: 16rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: 333;
			.purchase, .return-car {
				display: flex;
				align-items: center;
				.purchase-img-wrap {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					background-color: #FDF7DF;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-right: 10rpx;
					.purchase-img {
						width: 22rpx;
						height: 22rpx;
					}
				}
			}
			.return-car {
				padding-left: 40rpx;
			}
			#return-car-wrap {
				background: rgba(25, 126, 245, 0.1);
				.return-car-img {
					width: 36rpx;
					height: 36rpx;
					transform: translateX(2rpx);
				}
			}
		}
	}
}

.back-btn {
	width: 48rpx;
	height: 48rpx;
	position: fixed;
	top: 90rpx;
	left: 30rpx;
	z-index: 1000;
}

.poster-mask {
	width: 100vw;
	height: 100vh;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	bottom: constant(safe-area-inset-bottom);
	bottom: env(safe-area-inset-bottom);
	z-index: 100;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	.poster {
		position: absolute;
		top: 90px;
		top: calc(90px + constant(safe-area-inset-top));
		top: calc(90px + env(safe-area-inset-top));
		left: 50%;
		transform: translateX(-50%);
	}
	.save-btn {
		width: 100vw;
		height: 192rpx;
		background: #010101;
		display: flex;
		justify-content: center;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		.btn-wrap {
			margin-top: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.btn {
				width: 100rpx;
				height: 100rpx;
				background: #333333;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.text {
				font-size: 24rpx;
				height: 34rpx;
				line-height: 34rpx;
				color: rgba(255, 255, 255, 0.8);
				padding-top: 8rpx;
			}
		}
	}
}

.sub-title {
	margin-top: 8px;
	margin-bottom: 16px;
	padding-left: 32rpx;
	height: 48rpx;
	font-size: 17px;
	line-height: 48rpx;
	color: #333333;
}

.template-card {
	.subscribe-title {
		margin-bottom: 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.merchant {
			height: 48rpx;
			font-size: 16px;
			line-height: 48rpx;
			color: #0A0F2D;
		}
		.subscribe-price-wrap {
			padding-left:20rpx;
			display: flex;
			align-items: center;
			.text {
				font-size: 24rpx;
				color: #666;
				padding-right: 8rpx;
			}
			.subscribe-price {
				font-size: 32rpx;
				font-weight: 500;
				color: #EE3833;
				display: flex;
				align-items: flex-end;
				.unit {
					padding-left:4rpx;
					font-size: 12px;
					transform: translateY(-4rpx);
				}
			}
		}
		.should-login {
			color: #31C37B;
		}
	}
	.item {
		margin-top: 8px;
		display: flex;
		.item-title {
			margin-right: 12px;
			height: 42rpx;
			font-size: 14px;
			line-height: 42rpx;
			color: #666666;
		}
		.item-content {
			width: 0;
			flex: 1;
			font-size: 14px;
			line-height: 42rpx;
			color: #0A0F2D;
			.should-login {
				color: #31C37B;
			}
			.subscribe-price {
				font-size: 16px;
				color: #EE3833;
				display: flex;
				.unit {
					padding-left:4rpx;
					font-size: 12px;
					transform: translateY(2rpx);
				}
			}
			.icon-wrap {
				margin-left: 12rpx;
			}
			.final {
				margin-right: 16px;
				display: flex;
				align-items: center;
				.purchase-img-wrap {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					background-color: #FDF7DF;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-right: 10rpx;
					.purchase-img {
						width: 22rpx;
						height: 22rpx;
					}
				}
				#return-car-wrap {
					background: rgba(25, 126, 245, 0.1);
					.return-car-img {
						width: 36rpx;
						height: 36rpx;
						transform: translateX(2rpx);
					}
				}
			}
			
			.item-sub {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 12px;
				&:first-child {
					margin-top: 0;
				}
				.left {
					flex: 1;
					font-size: 14px;
					height: 42rpx;
					line-height: 42rpx;
					color: #0A0F2D;
					display: flex;
					align-items: center;
				}
				.right {
					margin-left: 20rpx;
					width: 42rpx;
					height: 42rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
}

.popupClass{
	.popupClassTop{
		width: 100%;
		text-align: center;
		margin: 24px 0;
		height: 21px;
		font-family: PingFangSC-Medium;
		font-size: 15px;
		font-weight: 500;
		line-height: 21px;
		letter-spacing: 0px;
		color: rgba(0, 0, 0, 0.9);
		
	}
	.popupClassBom{
		margin:  28px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		font-weight: normal;
		line-height: 22px;
		letter-spacing: 0px;
		color: rgba(10, 15, 45, 0.8);
		margin-bottom: 90px;
	}
}

.popup {
	::v-deep .u-drawer-content{
		padding: 0 80rpx;
		.u-mode-center-box {
			width: 100% !important;
		}
		.wrap {
			width: 100%;
			padding: 32px 32rpx;
			.popup-title {
				margin-bottom: 23px;
				height: 60rpx;
				font-size: 20px;
				line-height: 60rpx;
				color: #141414;
				text-align: center;
			}
			.container {
				.item {
					margin-bottom: 12px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 44rpx;
					font-size: 14px;
					line-height: 44rpx;
					color: #64696F;
				}
			}
			.table {
				.row {
					margin-bottom: 16px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 44rpx;
					font-size: 14px;
					line-height: 44rpx;
					color: rgba(10, 15, 45, 0.8);
				}
				.col {
					flex: 1;
					text-align: center;
				}
				.table-header {
					color: rgba(10, 15, 45, 0.5);
				}
			}
			.bottom {
				width: 100%;
				display: flex;
				justify-content: center;
				.btn {
					margin-top: 36px;
					width: 346rpx;
					height: 76rpx;
					border-radius: 8rpx;
					background: #0A0F2D;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 17px;
					color: #FFFFFF;
				}
			}
			
			.tip {
				margin-top: 18px;
				text-align: center;
				height: 36rpx;
				font-size: 12px;
				line-height: 36rpx;
				color: rgba(10, 15, 45, 0.5);
			}
		}
	}
}

.wx-btn {
	margin-top: 24px;
	width: 346rpx;
	::v-deep button {
		width: 100%;
		height: 40px;
		border-radius: 4px;
		background: #0A0F2D;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 17px;
		font-weight: 500;
		color: #FFFFFF;
	}
}

.plan-title {
	height: 44rpx;
	font-size: 32rpx;
	line-height: 44rpx;
	color: #333333;
}

.plan-list {
	margin-top: 12px;
	display: flex;
	flex-wrap: wrap;
	.plan {
		margin-right: 24rpx;
		padding: 16rpx 0;
		width: 190rpx;
		height: 156rpx;
		border-radius: 8rpx;
		border: 2rpx solid rgba(10, 15, 45, 0.3);
		display: flex;
		flex-direction: column;
		align-items: center;
		.plan-item1 {
			height: 44rpx;
			font-size: 28rpx;
			line-height: 44rpx;
			color: #0A0F2D;
		}
		.plan-item2 {
			height: 40rpx;
			font-size: 12px;
			line-height: 40rpx;
			color: #0A0F2D;
		}
		.plan-item3 {
			height: 40rpx;
			font-size: 12px;
			line-height: 40rpx;
			color: rgba(10, 15, 45, 0.5);
			display: flex;
			align-items: center;
		}
	}
	.plan:last-child {
		margin-right: 0;
	}
	.checked-plan {
		position: relative;
		border-color: rgba(10, 235, 125, 0.6);
		.checked-icon-wrap {
			width: 24rpx;
			height: 24rpx;
			background: rgba(10, 235, 125, 0.6);
			border-radius: 0px 6rpx 0px 4rpx;
			position: absolute;
			top: 0;
			right: 0;
			z-index: 100;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}

.city {
	display: flex;
	align-items: center;
	.change-city-link {
		padding-left: 24rpx;
		font-size: 12px;
		text-decoration: underline;
		color: #3446AA;
	}
}

.popup-wrap {
	width: 640rpx;
	padding: 50rpx 32rpx 32rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	.title{
		height: 48rpx;
		font-size: 34rpx;
		line-height: 48rpx;
		color: rgba(0, 0, 0, 0.9);
	}
	.sub-title {
		margin-top: 12rpx;
		margin-bottom: 32rpx;
		height: 48rpx;
		font-size: 24rpx;
		line-height: 48rpx;
		color: #767676;
	}
	.pay-table {
		width: 100%;
		border-radius: 8px;
		border: 2rpx solid rgba(10, 15, 45, 0.2);
		.pay-row {
			height: 90rpx;
			display: flex;
			border-bottom: 2rpx solid rgba(10, 15, 45, 0.2);
			font-size: 24rpx;
			color: rgba(10, 15, 45, 0.6);
			.pay-col {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				border-right: 2rpx solid rgba(10, 15, 45, 0.2);
			}
			.pay-col:last-child {
				border-right: none;
			}
		}
		.pay-row:last-child {
			border-bottom: none;
			color: rgba(10, 15, 45, 0.7);
		}
	}
	.btn {
		margin-top: 70rpx;
		width: 100%;
		height: 88rpx;
		border-radius: 16rpx;
		background: rgba(10, 15, 45, 0.9);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #FFFFFF;
	}
}
</style>
