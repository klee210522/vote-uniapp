import { useToast } from 'wot-design-uni'
const toast = useToast()

/**
 * 显示消息提示框
 * @param title
 */
export function WotToast(title : string) {
	toast.show(title)
}