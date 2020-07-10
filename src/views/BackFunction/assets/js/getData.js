import {myAxios} from '@/assets/js/axios.js';

//获取逼逼叨列表
export function GetBibi(params) {
  return myAxios('get', '/bibi/getBibi', params)
}  

//新增逼逼叨
export function AddBibi(params) {
  return myAxios('post', '/bibi/AddBibi', params)
}  

//修改逼逼叨
export function UpdateBibi(params) {
  return myAxios('put', '/bibi/updateBibi', params)
}  

//删除逼逼叨
export function DeleteBibi(params) {
  return myAxios('post', '/bibi/deleteBibi', params)
}  

//是否显示逼逼叨
export function isShowBibi(params) {
  return myAxios('post', '/bibi/isShowBibi', params)
}  