<template>
	<view class="page-wrap">
		<view v-if="carDetailData">
			<view class="header">
				<view class="share-btn" @click="openWecars" v-if="isCertification">
					<u-icon
						name="zhuanfa"
						color="#fff"
						size="32"
					/>
				</view>
				<u-swiper
				  class="banner-swiper"
				  :list="carDetailData.imageUrlList" 
				  :title="false"
				  height="300"
				  mode="number"
				  indicator-pos="bottomRight"
				  :effect3d="false"
				  autoplay
				  interval="3000"
				  :circular="true"
				  duration="500" 
				  bg-color=""
				/>
				<view class="brand">
					{{ carDetailData.carBrand || '' }} {{ carDetailData.carType || '' }} {{ carDetailData.carTypeYear || '' }} {{ carDetailData.carTypeYearProduct || '' }}
				</view>
				<view class="price-info">
				  <view class="price-wrap">
				  	<text class="dealer-price">{{formatPrice(carDetailData.dealerReferencePrice)}}</text>
					</view>
					<view class="supplier-info">
						<u-image
						  v-if="carDetailData.logoImageUrl"
						  :src="carDetailData.logoImageUrl"
							shape="circle"
						  width="48rpx"
						  height="48rpx"
						>
							<u-loading slot="loading" />
						</u-image>
						<text class="supplier-name">{{carDetailData.merchantName}}</text>
					</view>
				</view>
			</view>
			
			<view class="section-title">
				<view class="text">
					车辆档案
				</view>
			</view>
			
			<view class="card car-detail">
				<view class="detail-header">
					<view class="header-item">
						<view class="item">
							<view class="content">
								{{carDetailData.regDateStr ? `${carDetailData.regDateStr}` : '-'}}
							</view>
							<view class="text">
								车龄
							</view>
						</view>
						<view class="split-line">|</view>
					</view>
					<view class="header-item">
						<view class="item">
							<view class="content">
								{{carDetailData.mileage ? formatTenThousandNumber(carDetailData.mileage, 'W', '公里') : '-'}}
							</view>
							<view class="text">
								里程
							</view>
						</view>
						<view class="split-line">|</view>
					</view>
					<view class="header-item">
						<view class="item">
							<view class="content">
								{{carDetailData.environmentalStandards || '-' }}
							</view>
							<view class="text">
								排放标准
							</view>
						</view>
						<view class="split-line">|</view>
					</view>
					<view class="header-item">
						<view class="item">
							<view class="content">
								{{getTranscationNum(carDetailData.transcationNum)}}
							</view>
							<view class="text">
								过户次数
							</view>
						</view>
					</view>
				</view>
				
				<view class="detail-content">
					<view class="left">
						<view class="item">
							<view class="text">
								首次上牌
							</view>
							<view class="content">
								{{carDetailData.regDate}}
							</view>
						</view>
						<view class="item">
							<view class="text">
								车 架 号
							</view>
							<view class="content">
								{{carDetailData.carVin || '-'}}
							</view>
						</view>
<!-- 						<view class="item">
							<view class="text">
								外观颜色
							</view>
							<view class="content">
								{{carDetailData.outColor || '-'}}
							</view>
						</view> -->
					</view>
					<view class="right">
						<view class="item">
							<view class="text">
								所在城市
							</view>
							<view class="content">
								{{carDetailData.regCity || '-'}}
							</view>
						</view>
						<view class="item">
							<view class="text">
								能源方式
							</view>
							<view class="content">
								{{carDetailData.powerMode ? getPowerModeName(carDetailData.powerMode) : '-'}}
							</view>
						</view>
					<!-- 	<view class="item">
							<view class="text">
								内饰颜色
							</view>
							<view class="content">
								{{carDetailData.inColor || '-'}}
							</view>
						</view> -->
					</view>
				</view>
				
				<view class="certification">
					<view class="certification-item">
						<view class="item">
							<view class="text">
								事故检测
							</view>
							<view class="content">
								<u-image
								  width="36rpx"
								  height="36rpx"
								  src="https://image.51cheyaoshi.com/xcx/app/static/adopt_icon.png"
								>
								  <u-loading slot="loading" />
								</u-image>
								<view class="pass">
									通过
								</view>
							</view>
						</view>
						<view class="split-line">|</view>
					</view>
					<view class="certification-item">
						<view class="item">
							<view class="text">
								非火烧车
							</view>
							<view class="content">
								<u-image
								  width="36rpx"
								  height="36rpx"
								  src="https://image.51cheyaoshi.com/xcx/app/static/adopt_icon.png"
								>
								  <u-loading slot="loading" />
								</u-image>
								<view class="pass">
									通过
								</view>
							</view>
						</view>
						<view class="split-line">|</view>
					</view>
					<view class="certification-item">
						<view class="item">
							<view class="text">
								非泡水车
							</view>
							<view class="content">
								<u-image
								  width="36rpx"
								  height="36rpx"
								  src="https://image.51cheyaoshi.com/xcx/app/static/adopt_icon.png"
								>
								  <u-loading slot="loading" />
								</u-image>
								<view class="pass">
									通过
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="plan-wrap" v-if="subscribeList.length || stagingList.length">
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
				
				<view class="list">
					<view v-if="tabIndex === 0">
						<view
							class="card subscribe-item"
							v-for="item in subscribeList"
							:key="item.id"
						>
							<view class="subscribe-title">
								<view class="merchant">
									{{item.monthTotal}}个月方案
								</view>
								<view class="subscribe-price-wrap">
									<view class="text">
										分销佣金
									</view>
									<view class="subscribe-price">
										{{item.distributionBrokerageFree ? `￥${formatThousandNumber(item.distributionBrokerageFree)}` : ''}}
									</view>
								</view>
							</view>
							
							<view class="service">
								<view 
									class="service-tag"
								>
									订阅费用{{getSubscriptionPrice(item)}}元
								</view>
								<view
									class="service-tag"
								>
									限{{formatThousandNumber(item.limitMileage)}}公里
								</view>
							</view>
							
							<view class="end-title">
								期末方案
							</view>
							<view class="end-wrap">
								<view class="purchase">
									<view class="purchase-img-wrap">
										<image class="purchase-img" src="https://image.51cheyaoshi.com/xcx/app/static/maiduan.png" mode=""></image>
									</view>
									留购价￥{{formatThousandNumber(item.buyoutsFee)}}
								</view>
								<view class="purchase return-car">
									<view class="purchase-img-wrap" id="return-car-wrap">
										<image class="return-car-img" src="https://image.51cheyaoshi.com/xcx/app/static/wusun.png" mode=""></image>
									</view>
									无损退车
								</view>
							</view>
						</view>
					</view>
					
					<view v-else-if="tabIndex === 1">
						<view class="card staging">
							<view class="title">
								<view class="text">
									首付金额：
								</view>
								<view class="price">
									{{stagingList[0].firstPayment ? formatThousandNumber(stagingList[0].firstPayment) : '-'}}
								</view>
							</view>
							<view 
								class="staging-item-wrap"
							>
								<view
									class="staging-item"
									v-for="item in stagingList"
									:key="item.stagingId"
								>
									<view class="period">
										{{item.period}}期
									</view>
									<view class="month-payment">
										月供{{formatThousandNumber(item.monthPayment)}}元
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
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
					<wxml-to-canvas width="300" height="570" class="widget"></wxml-to-canvas>
				</view>
				<view class="save-btn">
					<view class="btn-wrap" @click="savePoster">
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
		
		<IdentDialog
			:showIdentDialog.sync="showIdentDialog"
		/>
	</view>
</template>

<script>
	//import { formatTenThousandNumber, formatThousandNumber, formatPrice } from '@/utils/index.js'
	import dayjs from 'dayjs'
	import { powerModeAll } from "@/constants"
	import IdentDialog from './components/IdentDialog.vue'
	
	export default {
		components: {
			IdentDialog,
		},
		data() {
			return {
				// 页面接收传参
				carId: '', // 二手车ID
				supportSubscription: '', // 是否支持订阅 0支持，1不支持（默认支持）
				cityId: '', 
				userId: '',
				
				// 详情
				carDetailData: null, // 二手车详情
				tabList: [],
				tabIndex: 0,
				subscribeList: [], // 订阅方案
				stagingList: [], // 分期方案
				
				// 海报
				showPoster: false,
				posterSrc: '',
				posterWidth: '',
				posterHeight: '',
				widget: null,
				qrCodeUrl: '',
				isCompletePoster: false,
				postImg1: '',
				postImg2: '',
				postImg3: '',
				
				// 用户信息
				realName: '',
				phone: '',
				isCertification: false,
				showIdentDialog: false,
			}
		},
		onLoad(option) {
			this.carId = option.carId
			this.supportSubscription = option.supportSubscription
			this.cityId = option.cityId
			this.userId = option.userId
			if (option.userId) {
				this.getLoginUserInfo()
			}
		},
		onShow() {
			this.tabList = []
			this.getWecarsQrCode()
			this.getCarDetail()
			
			if(getApp().globalData.userInfo.status == 1) {
				this.isCertification = true
			  wx.showShareMenu({
			  	withShareTicket:true,
			  	//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
			  	menus: ["shareAppMessage","shareTimeline"]
			  })
			}
		},
		onHide(){
			this.tabList = []
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
				if(this.isCertification) {
				  this.showPoster = true
				  if(!this.isCompletePoster) {
				  	uni.showLoading({
				  		title: '生成中'
				  	})
				  }
				} else {
					console.log('this.isCertification', this.isCertification)
					this.showIdentDialog = true
				}
			},
			
			// 绘制海报结构
			getCanvasHtml(carDetailData) {
				this.widget = this.selectComponent('.widget')
				let wxml = `
					<view class="container">
						<view class="wrap">
							<view class="item1">
								<view class="item1left">
									<text class="brandtext">${carDetailData.carBrand} ${carDetailData.carType}</text>
								</view>
								<text class="item1price">${this.getLimitPrice(carDetailData)}</text>
							</view>
							<view class="item2">
								<text class="typetext">${carDetailData.carTypeYear} ${carDetailData.carTypeYearProduct}</text>
								<text class="item2righttext">${this.tabIndex === 0 ? '即可开走' : '月供仅需'}</text>
							</view>
							<text class="item3text">${this.formatThousandNumber(carDetailData.mileage)}公里 | ${carDetailData.regDateStr} | ${this.formatPrice(carDetailData.dealerReferencePrice)}</text>
							<view class="item4">
								<image class="item4img" src="${this.postImg1}"></image>
							</view>
							<view class="item11">
								<image class="item11img" src="${this.postImg2}"></image>
								<image class="item11img" src="${this.postImg3}"></image>
							</view>
				`
							
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
				  	height: 570,
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
						width: 160,
				  	flexDirection: 'row',
				  	justifyContent: 'flex-start',
				  	alignItems: 'center',
				  },
				  brandtext: {
						width: 160,
				  	fontSize: 17,
				  	fontWeight: 600,
				  	color: '#333333',
				  },
				  item1right: {
						width: 110,
						flexDirection: 'row',
						alignItems: 'flex-end',
					},
				  item1price: {
						width: 80,
				  	fontSize: 17,
				  	color: '#EE3833',
				  	textAlign: 'right',
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
				  item3text: {
						marginTop: 4,
						width: 150,
						height: 18,
						fontSize: 10,
						color: '#999999',
					},
				  item4: {
				  	marginTop: 12,
				  	width: '100%',
				  	height: 180,
				  },
				  item4img: {
				  	width: 240,
						height: 180,
						borderRadius: 4,
				  },
					item11: {
						marginTop: 10,
						width: '100%',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					},
					item11imgwrap: {
						width: 126,
						height: 76,
						borderRadius: 4,
					},
					item11img: {
						width: 116,
						height: 87,
						borderRadius: 4,
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
						marginTop: 12,
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
				}
				
				setTimeout(() => {
					this.renderToCanvas(wxml, style)
				}, 2000)
			},
			
			// 获取小程序码
			async getWecarsQrCode() {
				console.log('getWecarsQrCode', `${this.carId}&${this.cityId}&${this.supportSubscription}&${this.userId}`)
				const res = await this.$getRequest(this.$url.getWecarsQrCode, 'POST', {
				  envVersion: 1,
					page: 'pages/home/certcar/detail',
					scene: `${this.carId}&${this.cityId}&${this.supportSubscription}&${this.userId}`,
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
			
			async getCarDetail() {
				uni.showLoading({
					title: '加载中'
				})
				this.tabList = []
				const res = await this.$getRequest(this.$url.partnerSecondCarDetail, 'POST', {
				  carId: this.carId,
				  supportSubscription: this.supportSubscription,
				})
				if (res.code === 0 && res.data && res.data.code === 0) {
					this.carDetailData = res.data.data
					this.carDetailData.regDate = this.carDetailData.regDate ? dayjs(this.carDetailData.regDate).format('YYYY年MM月DD日') : '-'
					if (!this.carDetailData.imageUrlList || 
					(this.carDetailData.imageUrlList.length === 0 && this.carDetailData.imageUrl)) {
						this.carDetailData.imageUrlList = [this.carDetailData.imageUrl]
					}
					
					if (this.carDetailData.imageUrlList && this.carDetailData.imageUrlList.length) {
						this.postImg1 = this.carDetailData.imageUrlList[0] || ''
						this.postImg2 = this.carDetailData.imageUrlList[1] || ''
						this.postImg3 = this.carDetailData.imageUrlList[2] || ''
						
						if (this.postImg1) {
							this.postImg1 = await this.getImageInfo(this.postImg1) || ''
						}
						
						if (this.postImg2) {
							this.postImg2 = await this.getImageInfo(this.postImg2) || ''
						}
						
						if (this.postImg1) {
							this.postImg3 = await this.getImageInfo(this.postImg3) || ''
						}
					}
					
					setTimeout(() => {
						this.getCanvasHtml(res.data.data)
					}, 1000)
				}
				
				if (this.carDetailData.subscribeList && this.carDetailData.subscribeList.length) {
					this.subscribeList = this.carDetailData.subscribeList
					this.tabList.push({id: 0, name: '订阅方案'})
				}
				
				if (this.carDetailData.stagingList && this.carDetailData.stagingList.length) {
					this.stagingList = this.carDetailData.stagingList
					this.tabList.push({id: 1, name: '分期方案'})
					if (this.subscribeList.length === 0) {
						this.tabIndex = 1
					}
				}
				
				uni.hideLoading()
			},
			
			getImageInfo(src) {
				return new Promise((resolve) => {
					uni.getImageInfo({
						src,
						success: (image) => {
							console.log('getImageInfo', image)
							let res = src
							if (image.height > image.width) {
								const w = image.width
								const h = image.width * 0.75
								const x = 0
								const y = (image.height - h) / 2
								res = `${src}?x-oss-process=image/crop,x_${x},y_${y},w_${w},h_${h}`
							}
							console.log('getImageInfo', res)
							resolve(res)
						},
						fail: (err) => {
							console.log(err)
							resolve('')
						}
					})
				})
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
			
			// 过户次数
			getTranscationNum(transcationNum) {
				let res = ''
				if (!transcationNum && transcationNum !== 0) {
					res = '-'
				} else {
					if (transcationNum === 0) {
						res = '首次'
					} else {
						res = `${transcationNum}次`
					}
				}
				
				return res
			},
			
			// 能源方式
			getPowerModeName(index) {
				const mode = powerModeAll.find(item => item.value === index)
				if (mode) {
					return mode.name
				}
				
				return '-'
			},
			
			changeTab(tab) {
				this.tabIndex = tab.id
				this.getCanvasHtml(this.carDetailData)
			},
			
			// 计算海报展示最低价格
			getLimitPrice(carDetailData) {
				let price = '-'
				
				if (this.tabIndex === 0) {
					if (carDetailData.subscribeList && carDetailData.subscribeList.length) {
						price = `￥${this.formatThousandNumber(carDetailData.subscribeList[0].payOffPrice)}`
					}
				} else if (this.tabIndex === 1) {
					if (carDetailData.stagingList && carDetailData.stagingList.length) {
						price = `￥${this.formatThousandNumber(carDetailData.stagingList[carDetailData.stagingList.length-1].monthPayment)}`
					}
				}
				
				return price
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
			
			// 打开 wecars 小程序, 进入二手车详情页
			openWecars() {
				console.log('openWecars',`pages/home/certcar/detail?id=${this.carId}&cityId=${this.cityId}&supportSubscription=${this.supportSubscription}&id2=${this.userId}`)
				// cityId: "310100"
				// id: "31"
				// supportSubscription: "1"
				uni.navigateToMiniProgram({
				  appId: 'wx068554113d5335d3',
				  //path: `pages/home/certcar/detail?id=31&cityId=310100&supportSubscription=1`,
					path: `pages/home/certcar/detail?id=${this.carId}&cityId=${this.cityId}&supportSubscription=${this.supportSubscription}&id2=${this.userId}`,
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.page-wrap {
	padding-bottom: 180rpx;
	.header {
		position: relative;
		.share-btn {
			position: absolute;
			top: 5px;
			top: calc(5px + constant(safe-area-inset-top));
			top: calc(5px + env(safe-area-inset-top));
			right: 28rpx;
			z-index: 100;
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			background: rgba(0, 0, 0, 0.6);
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.brand {
			margin-top: 28rpx;
			font-size: 40rpx;
			font-weight: 500;
			line-height: 60rpx;
			color: #333333;
		}
		.price-info {
			padding-top: 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.price-wrap {
				display: flex;
				align-items: center;
				.dealer-price {
					font-size: 34rpx;
					font-weight: 600;
					color: #EE3833;
				}
				.guidance-price {
					font-size: 24rpx;
					color: 999;
					padding-left: 8rpx;
				}
			}
			.supplier-info {
				width: 300rpx;
				display: flex;
				align-items: center;
				.supplier-name {
					padding-left: 16rpx;
					font-size: 24rpx;
					color: 666;
					@include text-overflow;
				}
			}
		}
	}
	
	.section-title {
		margin-top: 40rpx;
		margin-bottom: 24rpx;
		.text {
			font-size: 34rpx;
			font-weight: 600;
			line-height: 48rpx;
			color: #333333;
		}
	}
	
	.car-detail {
		.detail-header {
			display: flex;
			.header-item {
				flex: 1;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.item {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					.content {
						font-size: 28rpx;
						font-weight: 500;
						height: 44rpx;
						line-height: 44rpx;
						color: #333333;
					}
					.text {
						padding-top: 4rpx;
						font-size: 24rpx;
						height: 40rpx;
						line-height: 40rpx;
						color: #999999;
					}
				}
				.split-line {
					color: rgba(10, 15, 45, 0.04);
				}
			}
		}
		.detail-content {
			margin-top: 32rpx;
			display: flex;
			justify-content: space-between;
			.item {
				margin-bottom: 16rpx;
				display: flex;
				align-items: center;
				.text {
					width: 130rpx;
					font-size: 24rpx;
					height: 40rpx;
					line-height: 40rpx;
					color: #666666;
					padding-right: 32rpx;
				}
				.content {
					font-size: 24rpx;
					height: 40rpx;
					line-height: 40rpx;
					color: #333333;
				}
			}
			.left {
				.content {
					width: 200rpx;
				}
			}
			.right {
				flex:1;
				padding-left: 40rpx;
			}
		}
		.certification {
			margin-top: 20px;
			display: flex;
			.certification-item {
				flex: 1;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.item {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					.text {
						font-size: 28rpx;
						font-weight: 500;
						height: 44rpx;
						line-height: 44rpx;
						color: #333333;
					}
					.content {
						padding-top: 8rpx;
						display: flex;
						align-items: center;
						.pass {
							padding-left: 8rpx;
							font-size: 24rpx;
							color: #08BD64;
						}
					}
				}
				.split-line {
					color: rgba(10, 15, 45, 0.04);
				}
			}
		}
	}
	
	.plan-wrap {
		margin-top: 32px;
		.tabs {
			display: flex;
			align-items: center;
			height: 50rpx;
			.tab {
				margin-left: 16px;
				margin-right: 16px;
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
		.list {
			margin-top: 24rpx;
			.subscribe-item {
				.subscribe-title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.merchant {
						display: flex;
						align-items: center;
						.merchant-name {
							font-size: 16px;
							line-height: 44rpx;
							color: #333333;
							padding-left: 16rpx;
						}
					}
					.subscribe-price-wrap {
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
						}
					}
				}
				.service {
					display: flex;
					padding-top: 8px;
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
					margin-top: 16px;
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
		
		.staging {
			.title {
				display: flex;
				align-items: center;
				margin-bottom: 8rpx;
				.text {
					padding-right: 8rpx;
					font-size: 28rpx;
					color: #666666;
				}
				.price {
					font-size: 28rpx;
					color: #333333;
				}
			}
			.staging-item-wrap {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.staging-item {
					width: 32%;
					margin-top: 24rpx;
					border-radius: 8rpx;
					background: #FFFFFF;
					border: 2rpx solid rgba(10, 15, 45, 0.3);
					padding: 16rpx 0;
					display: flex;
					flex-direction: column;
					align-items: center;
					.period {
						font-size: 28rpx;
						font-weight: 500;
						height: 44rpx;
						line-height: 44rpx;
						color: #333333;
					}
					.month-payment {
						font-size: 24rpx;
						height: 40rpx;
						line-height: 40rpx;
						color: #999999;
					}
				}
			}
		}
	}
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
		top: 25px;
		top: calc(15px + constant(safe-area-inset-top));
		top: calc(15px + env(safe-area-inset-top));
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
</style>
