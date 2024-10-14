/**
 * @description: 请求结果设置
 */
export enum ResultEnum {
	SUCCESS = '200',
	FAIL = 400,
}

/**
 * @description: contentType
 */
export enum ContentTypeEnum {
	// json
	JSON = 'application/json;charset=UTF-8',
	// form-data qs
	FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
	// form-data  upload
	FORM_DATA = 'multipart/form-data',
}