// 全局要用的类型放到这里

type IResData<T> = {
	code : number
	msg : string
	data : T
}

// uni.uploadFile文件上传参数
type IUniUploadFileOptions = {
	file ?: File
	files ?: UniApp.UploadFileOptionFiles[]
	filePath ?: string
	name ?: string
	formData ?: any
}

type IUserInfo = {
	id ?: string
	account ?: string
	nickname ?: string
	realName ?: string
	sex ?: string
	sexText ?: string
	mobile ?: string
	email ?: string
	avatar ?: string
	userType ?: string
	status ?: string
	remark ?: string
}

type IToken = {
	key ?: string
	accessToken ?: string
	timestamp ?: string
	expiredTime ?: string
}

enum TestEnum {
	A = 'a',
	B = 'b',
}

interface API<T = any> {
	code : string;
	data ?: T;
	message : string;
}