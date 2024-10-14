<template>
	<view class="page">
		<view class="background-wrap">
			<image class="background" src="@/static/images/login/index/background.png" />
			<image class="vote-text" src="@/static/images/login/index/vote-text.png" />
		</view>
		<view class="container">
			<view class="title">欢迎来到蔚到投票</view>
			<button class="btn-login" @click="onClickLogin">立即登录</button>
			<view class="login-type">
				<text @click="popupLoginTypeVisible = true">其他方式</text>
			</view>
			<wd-checkbox v-model="check" checked-color="#f00">
				<view class="bottom-text">
					我已阅读、理解并接受以下<text @click.stop=";">《隐私协议》</text>
				</view>
			</wd-checkbox>
		</view>
	</view>
	<wd-popup v-model="popupLoginTypeVisible" position="bottom" custom-style="height: 200px;">
		<wd-cell title="短信登录" clickable @click="onClickSmsLogin" />
		<wd-cell title="取消" clickable @click="popupLoginTypeVisible = false;" />
	</wd-popup>
</template>

<script lang="ts" setup>
	// 协议勾选
	const check = ref('')

	// 登陆方式弹出框可见性
	const popupLoginTypeVisible = ref<boolean>(false)

	/**
	 * 点击登录
	 */
	const onClickLogin = () => {

	}

	/**
	 * 点击短信登录
	 */
	const onClickSmsLogin = () => {

	}
</script>

<style lang="scss" scoped>
	.page {
		.background-wrap {
			height: 48vh;
			width: 100%;
			position: relative;

			.background {
				height: 100%;
				width: 100%;
			}

			.vote-text {
				position: absolute;
				width: 196rpx;
				height: 148rpx;
				top: 50%;
				left: 50%;
				transform: translate(-50%, 0);
			}
		}

		.container {
			padding: 20rpx 50rpx;

			.title {
				text-align: center;
				font-size: 48rpx;
				font-weight: 700;
				margin-bottom: 40rpx;
			}

			.btn-login {
				color: #fff;
				font-size: 36rpx;
				font-weight: 700;
				background: linear-gradient(90deg, rgba(238, 127, 81, 1) 0%, rgba(237, 106, 92, 1) 100%);
				width: 100%;
				// transition: filter 0.3s;
			}

			.btn-login:active {
				filter: brightness(0.93);
			}


			.login-type {
				text-align: center;
				margin: 25rpx 0;
				font-size: 27rpx;
			}

			.check-image {
				width: 36rpx;
				height: 36rpx;
			}

			.bottom-text {
				font-size: 24rpx;

				text {
					color: #ed6a5c;
				}
			}
		}
	}

	.cell-center {
		text-align: center;
	}
</style>