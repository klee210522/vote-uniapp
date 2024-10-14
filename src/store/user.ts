import { defineStore } from 'pinia'
import { ref } from 'vue'

const initUserState = { nickname: '', avatar: '' }
const initTokenState = { key: '' }

export const useUserStore = defineStore(
	'user',
	() => {
		const userInfo = ref<IUserInfo>({ ...initUserState })
		const token = ref<IToken>({ ...initTokenState })

		const setUserInfo = (val : IUserInfo) => {
			userInfo.value = val
		}

		const setToken = (val : IToken) => {
			token.value = val
		}

		const setAll = (userInfo : IUserInfo, token : IToken) => {
			setUserInfo(userInfo)
			setToken(token)
		}

		const clearUserInfo = () => {
			userInfo.value = { ...initUserState }
		}

		const clearToken = () => {
			token.value = { ...initTokenState }
		}

		const reset = () => {
			clearUserInfo()
			clearToken()
		}
		const isLogined = computed(() => !!token.value.key)

		return {
			userInfo,
			setUserInfo,
			setToken,
			setAll,
			clearUserInfo,
			isLogined,
			reset,
		}
	},
	{
		persist: true,
	},
)