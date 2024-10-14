<template>
	<view class="container">
		<view class="logo-wrap">
			<image class="logo" src="@/static/weidao-logo.png" />
		</view>
		<view class="form-wrap">
			<view class="form">
				<view class="form-item">
					<view class="form-label">
						<image style="width: 28rpx;height:39rpx;" src="@/static/images/login/sms/mobile.png" />
						<text>手机</text>
					</view>
					<wd-input v-model="form.mobile" clear-trigger="focus" clearable />
					<!-- 					<input v-model="form.mobile" type="number" placeholder="请输入手机号" />
						<image @click="form.mobile=''" class="close-icon" src="@/static/images/login/sms/close.png" /> -->
				</view>
				<view class="form-item">
					<view class="form-label">
						<image style="width: 28rpx;height:39rpx;" src="@/static/images/login/sms/code.png" />
						<text>验证码</text>
					</view>
					<view class="form-element">
						<input v-model="form.code" type="number" placeholder="验证码" />
						<wd-button type="text" @click="onClickSmsCode">
							{{ smsCodeLoading ? '发送中...' : countdown > 0 ? `${countdown}后可重发` : '发送验证码' }}
						</wd-button>
					</view>
				</view>
				<view class="login-btn" @click="onClickLogin">登录
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { useCaptcha } from 'alova/client'
	import { isEmpty, isInvalidMobile } from '@/utils/is'
	import { WotToast } from '@/utils/prompt'

	// 验证码发送接口
	const {
		loading: smsCodeLoading,
		send: sendSmsCode,
		countdown: countdown
	} = useCaptcha(() => apiSendCaptcha(form.mobile), {
		initialCountdown: 60
	})

	// 登录表单
	const form = reactive({
		mobile: '',
		code: '',
	})

	/**
	 * 发送短信验证码
	 */
	const onClickSmsCode = () => {
		if (isEmpty(form.mobile)) {
			WotToast('请填写手机号')
			return
		}
		if (isInvalidMobile(form.mobile)) {
			WotToast('请填写合法的手机号')
			return
		}
		sendSmsCode
	}

	/**
	 * 登录
	 */
	const onClickLogin = () => {

	}
</script>

<style lang="scss" scoped>
	.container {
		// margin: 0 auto;
		// padding: 0 80rpx;
		// height: 100%;
		// background-color: #fff;
		// overflow: hidden;

		.logo-wrap {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 150rpx 0 100rpx 0;
			border-radius: 15rpx;

			.logo {
				width: 230rpx;
				height: 230rpx;
			}
		}

		.form-wrap {
			padding: 20rpx 24rpx;
			box-shadow: 16rpx 16rpx 30rpx #e5e7eb;

			.form {
				.form-item {
					display: flex;
					flex-direction: column;
					border-bottom: 2rpx solid #dbeafe;
					margin-bottom: 80rpx;

					.form-label {
						// min-width: 96rpx;
						display: flex;
						margin-bottom: 30rpx;
						align-items: center;

						image {
							margin-right: 10rpx;
						}

						text {
							font-size: 36rpx;
						}

					}

					.form-element {
						// flex-grow: 1;
						display: flex;
						justify-content: space-between;

						.close-icon {
							width: 36rpx;
							height: 34rpx;
						}

						.code-text {
							font-size: 28rpx;
							color: rgb(252, 108, 98);
							white-space: nowrap;
						}
					}
				}

				.login-btn {
					height: 82rpx;
					border-radius: 41rpx;
					background: rgb(237, 106, 92);
					background: linear-gradient(90deg, rgba(237, 106, 92, 1) 0%, rgba(238, 127, 81, 1) 100%);
					box-shadow: -1px 6px 11px 0px rgba(238, 127, 81, 0.4);
					text-align: center;
					line-height: 82rpx;
					font-size: 36rpx;
					font-weight: 500;
					color: #fff;
					transition: background-color 0.3s;
				}

				.login-btn:active {
					background: linear-gradient(90deg, rgba(252, 108, 98, 1) 0%, rgba(253, 119, 87, 1) 100%);
				}
			}
		}
	}
</style>