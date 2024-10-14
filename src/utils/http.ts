import { CustomRequestOptions } from '@/interceptors/request'
import { createAlova } from 'alova'
import { mockAdapter } from '@/mock'
import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum'
import { getEvnBaseUrl } from '@/utils'
import AdapterUniapp from '@alova/adapter-uniapp'

const HEADER = {
	'Content-Type': ContentTypeEnum.JSON,
	Accept: '*/*',
	'Authorization': 'Basic bmh4eTpuaHh5X3NlY3JldA==',
	'timestamp': new Date().getTime(),
	'xyuiName': 'vote-h5',
	'xyuiClient': 'vote-h5',
}

// 请求基准地址
const baseUrl = getEvnBaseUrl()

export const http = () => {
	// 1. 返回 Promise 对象
	return createAlova({
		baseURL: baseUrl,
		timeout: 15000,
		...AdapterUniapp(),
		beforeRequest: (method) => {
			method.config.headers = Object.assign(HEADER, method.config.headers)
		},
		responded: {
			/**
			 * 请求成功的拦截器
			 * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
			 * @param response
			 * @param method
			 */
			onSuccess: async (response, method) => {
				// @ts-ignore
				const { statusCode, data: rawData } = response
				const { code, message, data } = rawData as API
				if (statusCode === 200) {
					if (code === ResultEnum.SUCCESS) {
						return data as any
					}
					uni.showToast({
						icon: 'none',
						title: message,
					})
					return Promise.reject(rawData)
				}
				// checkStatus(statusCode, message || '');
				return Promise.reject(rawData);
			},

			/**
			 * 请求失败的拦截器，请求错误时将会进入该拦截器。
			 * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
			 * @param err
			 * @param method
			 */
			onError: (err, method) => {
				uni.showToast({
					icon: 'none',
					title: '请求超时，请稍后再试',
				})
				return Promise.reject({ err, method });
			},
		},
	})

	// uni.request({
	// 	...options,
	// 	dataType: 'json',
	// 	// #ifndef MP-WEIXIN
	// 	responseType: 'json',
	// 	// #endif
	// 	// 响应成功
	// 	success(res) {
	// 		// 状态码 2xx，参考 axios 的设计
	// 		if (res.statusCode >= 200 && res.statusCode < 300) {
	// 			// 2.1 提取核心数据 res.data
	// 			resolve(res.data as IResData<T>)
	// 		} else if (res.statusCode === 401) {
	// 			// 401错误  -> 清理用户信息，跳转到登录页
	// 			// userStore.clearUserInfo()
	// 			// uni.navigateTo({ url: '/pages/login/login' })
	// 			reject(res)
	// 		} else {
	// 			// 其他错误 -> 根据后端错误信息轻提示
	// 			!options.hideErrorToast &&
	// 				uni.showToast({
	// 					icon: 'none',
	// 					title: (res.data as IResData<T>).msg || '请求错误',
	// 				})
	// 			reject(res)
	// 		}
	// 	},
	// 	// 响应失败
	// 	fail(err) {
	// 		uni.showToast({
	// 			icon: 'none',
	// 			title: '网络错误，换个网络试试',
	// 		})
	// 		reject(err)
	// 	},
	// })
}

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @returns
 */
export const httpGet = <T>(url : string, query ?: Record<string, any>) => {
	return http<T>({
		url,
		query,
		method: 'GET',
	})
}

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @returns
 */
export const httpPost = <T>(
	url : string,
	data ?: Record<string, any>,
	query ?: Record<string, any>,
) => {
	return http<T>({
		url,
		query,
		data,
		method: 'POST',
	})
}

http.get = httpGet
http.post = httpPost