import {myAxios} from '@/assets/js/axios.js';

//获取用户信息
export function GetUserinfo() {
  return myAxios('get', '/user/getUserinfo', {})
}

//提交用户信息
export function SubmitUserinfo(data) {
  return myAxios('post', '/user/submitUserinfo', data)
}

//提交用户信息
export function SubmitBaseImg(data) {
  return myAxios('post', '/upload/baseImg', data)
}